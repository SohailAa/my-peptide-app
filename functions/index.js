const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const admin = require('firebase-admin');

// Initialize Admin SDK to safely bypass client rules on the server
admin.initializeApp();
const db = admin.firestore();
const app = express();

// Allow frontend to communicate with this API
app.use(cors({ origin: true }));

// --- 1. Strict IP-Based Rate Limiting ---
// Sensible Default: 5 checkouts per 15 minutes per IP address
const checkoutIpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { error: "Security Alert: Too many order attempts from this network. Please wait 15 minutes." },
  standardHeaders: true, 
  legacyHeaders: false,
});

// --- 2. User-Based Global Rate Limiting ---
// Sensible Default: Max 3 orders per 5 minutes per user account (defeats VPN IP rotation)
const checkUserLimits = async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) return next(); // Guest checkout relies strictly on the IP limit above

  try {
    const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentOrders = await db.collection('users').doc(userId).collection('orders')
      .where('timestamp', '>', admin.firestore.Timestamp.fromDate(fiveMinsAgo))
      .get();

    if (recentOrders.size >= 3) {
      return res.status(429).json({ 
        error: "Account Alert: You are placing orders too quickly. For your security, please wait 5 minutes." 
      });
    }
    next();
  } catch (error) {
    console.error("User validation error:", error);
    return res.status(500).json({ error: "Internal security validation failed." });
  }
};

// --- 3. The Public Checkout Endpoint ---
// This handles the secure database writing, replacing the direct frontend write.
app.post('/api/checkout', checkoutIpLimiter, checkUserLimits, async (req, res) => {
  try {
    const { userId, customerInfo, cartItems, total, paymentMethod } = req.body;
    
    // NOTE: In the future, this is where you will add your Stripe or NMI Secret Key logic!
    // e.g., const charge = await stripe.charges.create({ amount: total, ... })
    
    const newOrderNumber = 'RX-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderNumber: newOrderNumber,
      customerInfo,
      cartItems,
      total,
      paymentMethod,
      status: "Processing",
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    };

    // Securely write to database from the protected backend
    if (userId) {
      await db.collection("users").doc(userId).collection("orders").add(orderData);
    } else {
      await db.collection("orders").add(orderData);
    }

    res.status(200).json({ success: true, orderNumber: newOrderNumber });
  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ error: "An error occurred processing your order." });
  }
});

// Expose the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);