'use client';

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyBjm6hvcqZ1ep-IDe5ssV7kIWJWZwSvCaE",
  authDomain: "peptides-d2e57.firebaseapp.com",
  projectId: "peptides-d2e57",
  storageBucket: "peptides-d2e57.firebasestorage.app",
  messagingSenderId: "528632482409",
  appId: "1:528632482409:web:8274819d815c5be7d970f8",
  measurementId: "G-GCF6Z7SFLJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- Inline SVG Icons ---
const IconBase = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const Beaker = (p) => <IconBase {...p}><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></IconBase>;
const ShieldCheck = (p) => <IconBase {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></IconBase>;
const ShoppingCart = (p) => <IconBase {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></IconBase>;
const AlertTriangle = (p) => <IconBase {...p}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></IconBase>;
const Info = (p) => <IconBase {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></IconBase>;
const Check = (p) => <IconBase {...p}><polyline points="20 6 9 17 4 12"/></IconBase>;
const X = (p) => <IconBase {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconBase>;
const FlaskConical = (p) => <IconBase {...p}><path d="M10 2v7.31L2.07 19.24A2 2 0 0 0 3.75 22h16.5a2 2 0 0 0 1.68-2.76L14 9.31V2"/><path d="M8.5 2h7"/><path d="M14 9.31V6"/><path d="M10 9.31V6"/><path d="M4 16h16"/></IconBase>;
const FileText = (p) => <IconBase {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></IconBase>;
const Microscope = (p) => <IconBase {...p}><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></IconBase>;
const ChevronRight = (p) => <IconBase {...p}><polyline points="9 18 15 12 9 6"/></IconBase>;
const MapPin = (p) => <IconBase {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconBase>;
const CreditCard = (p) => <IconBase {...p}><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></IconBase>;
const Lock = (p) => <IconBase {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></IconBase>;
const Mail = (p) => <IconBase {...p}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></IconBase>;
const User = (p) => <IconBase {...p}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></IconBase>;
const Download = (p) => <IconBase {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></IconBase>;
const Send = (p) => <IconBase {...p}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></IconBase>;
const Phone = (p) => <IconBase {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></IconBase>;
const Eye = (p) => <IconBase {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></IconBase>;
const UserCircle = (p) => <IconBase {...p}><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></IconBase>;
const LogOut = (p) => <IconBase {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></IconBase>;

// --- Mock Data: Research Peptides ---
const products = [
  { 
    id: 1, 
    name: "BPC-157", 
    stripePriceId: "price_1TZghBBjpkwm17uLiME9wDR2", 
    sequence: "L-Val-L-Pro-L-Pro-L-Asp-L-Pro-L-Ala-L-Asp-L-Pro-L-Ala-L-Asp-L-Glu-L-Leu-L-Gln-L-Cys-L-Cys-L-Ser", 
    cas: "137525-51-0", 
    mw: "1419.5 g/mol",
    price: 45.00, 
    size: "5mg", 
    purity: "99.2%",
    image: "https://placehold.co/400x400/f8fafc/475569?text=BPC-157%0A5mg",
    description: "A 15-amino acid peptide synthesized for in-vitro research and cellular assays. Supplied as a sterile lyophilized white powder.",
    storage: "Desiccated at -20°C"
  },
  { 
    id: 2, 
    name: "Semaglutide", 
    stripePriceId: "price_mock_sema", 
    sequence: "His-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys(AEEAc-AEEAc-γ-Glu-17-carboxyheptadecanoyl)-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly", 
    cas: "910463-68-2", 
    mw: "4113.6 g/mol",
    price: 120.00, 
    size: "5mg", 
    purity: "99.5%",
    image: "https://placehold.co/400x400/f8fafc/475569?text=Semaglutide%0A5mg",
    description: "GLP-1 receptor agonist reference material for laboratory testing and metabolic pathway research. Not for therapeutic use.",
    storage: "Desiccated at -20°C"
  },
  { 
    id: 3, 
    name: "GHK-Cu", 
    stripePriceId: "price_mock_ghk", 
    sequence: "Gly-His-Lys(Cu2+)", 
    cas: "49557-75-7", 
    mw: "404.9 g/mol",
    price: 35.00, 
    size: "50mg", 
    purity: "99.8%",
    image: "https://placehold.co/400x400/f8fafc/475569?text=GHK-Cu%0A50mg",
    description: "Copper-binding tripeptide widely used in molecular biology and cellular matrix research. Characteristic blue lyophilized powder.",
    storage: "Store at 4°C, protected from light"
  }
];

// --- Components ---

function DisclaimerBanner() {
  return (
    <div className="bg-red-600 text-white text-xs font-bold text-center py-2 px-4 uppercase tracking-wider flex items-center justify-center gap-2">
      <AlertTriangle size={14} />
      Strictly for laboratory research use only. Not for human or veterinary use.
    </div>
  );
}

function Navbar({ currentPage, setCurrentPage, cartCount, setIsCartOpen, user, setIsAuthModalOpen }) {
  return (
    <nav className="bg-slate-900 text-white p-4 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto max-w-7xl px-4 flex justify-between items-center">
        <button onClick={() => setCurrentPage('catalog')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <FlaskConical className="text-blue-400" size={28} />
          <span className="text-xl font-bold tracking-tight">Helix<span className="text-blue-400">Peptides</span></span>
        </button>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-300">
          <button onClick={() => setCurrentPage('catalog')} className={`hover:text-white transition-colors ${currentPage === 'catalog' ? 'text-white border-b-2 border-blue-400' : ''}`}>Catalog</button>
          <button onClick={() => setCurrentPage('quality')} className={`hover:text-white transition-colors ${currentPage === 'quality' ? 'text-white border-b-2 border-blue-400' : ''}`}>Quality Control</button>
          <button onClick={() => setCurrentPage('safety')} className={`hover:text-white transition-colors ${currentPage === 'safety' ? 'text-white border-b-2 border-blue-400' : ''}`}>Safety Data Sheets</button>
          <button onClick={() => setCurrentPage('contact')} className={`hover:text-white transition-colors ${currentPage === 'contact' ? 'text-white border-b-2 border-blue-400' : ''}`}>Contact</button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => user ? setCurrentPage('account') : setIsAuthModalOpen(true)}
            className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <UserCircle size={20} />
            <span className="hidden sm:inline">{user ? "Portal" : "Login"}</span>
          </button>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

function CatalogPage({ products, setSelectedProduct, addToCart, setCurrentPage }) {
  return (
    <>
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
              High-Purity Synthesized Peptides for <span className="text-blue-600">Scientific Discovery</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              USA-manufactured reference standards and research peptides. Rigorous HPLC and Mass Spectrometry testing on every batch to ensure &gt;99% purity.
            </p>
            <div className="flex gap-4">
              <button onClick={() => document.getElementById('catalog-grid').scrollIntoView({ behavior: 'smooth' })} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors flex items-center gap-2">
                Browse Catalog <ChevronRight size={18} />
              </button>
              <button onClick={() => setCurrentPage('quality')} className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold py-3 px-6 rounded-lg shadow-sm transition-colors">
                View QC Protocols
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-end relative w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20"></div>
            <div className="bg-white p-8 rounded-2xl shadow-xl border-4 border-blue-500 relative w-full max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <Microscope className="text-blue-600" size={32} />
                <h3 className="text-xl font-bold text-slate-800">Quality Assurance</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={18} />
                  <span>Independently verified by ISO-accredited third-party analytical laboratories.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={18} />
                  <span>Every vial includes a detailed Certificate of Analysis (COA) containing Mass Spec and HPLC data.</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-600">
                  <ShieldCheck className="text-green-500 shrink-0 mt-0.5" size={18} />
                  <span>Strictly formulated and packaged in ISO 5 cleanroom environments.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <main id="catalog-grid" className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group flex flex-col">
              <div 
                className="bg-slate-50 aspect-square flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedProduct(product)}
              >
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{product.name}</h3>
                  <span className="font-bold text-blue-700">${product.price.toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-slate-500 mb-4 font-medium">{product.size} / Lyophilized</p>
                
                <div className="mt-auto space-y-3">
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm flex justify-center items-center gap-2"
                  >
                     Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function QualityControlPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-full">
          <Microscope className="text-blue-600" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Quality Control</h1>
          <p className="text-slate-600 mt-2">Rigorous analytical testing protocols for every batch.</p>
        </div>
      </div>

      <div className="space-y-12">
        <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Our Commitment to Purity</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            At HelixPeptides, we understand that reliable research begins with reliable reference materials. We employ strict quality control measures throughout the synthesis and lyophilization processes. Every peptide undergoes independent, third-party laboratory testing before it is cleared for our catalog.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="text-blue-600" size={20} /> HPLC Analysis
              </h3>
              <p className="text-sm text-slate-600">
                High-Performance Liquid Chromatography is utilized to determine the exact purity of the synthesized peptide. We require a minimum purity of 99% for all standard research compounds.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Beaker className="text-blue-600" size={20} /> Mass Spectrometry
              </h3>
              <p className="text-sm text-slate-600">
                LC-MS (Liquid Chromatography-Mass Spectrometry) is performed to verify the precise molecular weight and sequence integrity, ensuring the compound matches its chemical identifier.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-4">Certificates of Analysis (COA)</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            A comprehensive COA is provided with every order upon request. This document outlines the batch-specific data, verifying the structural integrity and purity of the peptide you receive.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-4">
            <Info className="text-blue-600 shrink-0 mt-1" size={20} />
            <p className="text-sm text-blue-900">
              To request a COA for a specific batch number, please contact our support team with your order number and the lot number found on the vial.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function SafetyDataPage({ products, setPreviewSDSProduct, handleDownloadSDS }) {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-slate-100 p-4 rounded-full">
          <ShieldCheck className="text-slate-600" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Safety Data Sheets (SDS)</h1>
          <p className="text-slate-600 mt-2">Hazard communication and safe handling guidelines for laboratory settings.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">CAS Number</th>
                <th className="p-4 font-semibold">Revision Date</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{product.name}</td>
                  <td className="p-4 text-slate-500 font-mono text-sm">{product.cas}</td>
                  <td className="p-4 text-slate-500 text-sm">Jan 12, 2024</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => setPreviewSDSProduct(product)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        <Eye size={16} /> Preview
                      </button>
                      <button 
                        onClick={() => handleDownloadSDS(product)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Download size={16} /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-6">
        <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
          <AlertTriangle size={18} /> Handling Warning
        </h4>
        <p className="text-sm text-red-700 leading-relaxed">
          These documents are provided for occupational safety and health compliance in laboratory environments. Handling of these compounds requires proper PPE (gloves, safety goggles, lab coat) and should only be performed by qualified personnel under adequate ventilation.
        </p>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-full">
          <Mail className="text-blue-600" size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Contact Us</h1>
          <p className="text-slate-600 mt-2">Get in touch with our support and laboratory teams.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Send an Inquiry</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Jane" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
                <input type="text" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="researcher@university.edu" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
              <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Bulk / Wholesale Request</option>
                <option>COA Request</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
              <textarea rows="5" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="How can we assist your research?"></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-md transition-colors flex justify-center items-center gap-2">
              Send Message <Send size={18} />
            </button>
            <p className="text-xs text-slate-500 text-center mt-2">Do not mention human consumption or therapeutic use in your message, or your inquiry will be ignored.</p>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="text-blue-400" size={20} /> Laboratory HQ</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              HelixPeptides<br/>
              123 Science Boulevard<br/>
              Suite 400<br/>
              San Diego, CA 92121
            </p>
            <div className="h-px w-full bg-slate-700 my-4"></div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Phone className="text-blue-400" size={20} /> Contact Info</h3>
            <p className="text-slate-300 text-sm mb-2">support@helixpeptides.test</p>
            <p className="text-slate-300 text-sm">(555) 123-4567</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Operating Hours</h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex justify-between"><span>Mon - Fri:</span> <span className="font-medium text-slate-900">9:00 AM - 5:00 PM EST</span></li>
              <li className="flex justify-between"><span>Sat - Sun:</span> <span className="font-medium text-slate-900">Closed</span></li>
            </ul>
            <p className="text-xs text-slate-500 mt-4 italic">Orders placed after 2:00 PM EST will be processed the following business day.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountPage({ user, setCurrentPage }) {
  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchAccountData = async () => {
      try {
        const ordersRef = collection(db, "users", user.uid, "orders");
        const ordersSnap = await getDocs(ordersRef);
        const fetchedOrders = [];
        ordersSnap.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });
        fetchedOrders.sort((a, b) => {
          const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : (a.timestamp?._seconds ? a.timestamp._seconds * 1000 : 0);
          const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : (b.timestamp?._seconds ? b.timestamp._seconds * 1000 : 0);
          return timeB - timeA;
        });
        setOrders(fetchedOrders);

        const paymentsRef = collection(db, "users", user.uid, "paymentMethods");
        const paymentsSnap = await getDocs(paymentsRef);
        const fetchedPayments = [];
        paymentsSnap.forEach((doc) => {
          fetchedPayments.push({ id: doc.id, ...doc.data() });
        });
        setPaymentMethods(fetchedPayments);
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountData();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentPage('catalog');
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Processing';
    if (timestamp.toDate) return timestamp.toDate().toLocaleDateString();
    if (timestamp.seconds || timestamp._seconds) return new Date((timestamp.seconds || timestamp._seconds) * 1000).toLocaleDateString();
    return 'Processing';
  };

  if (!user) return null;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Researcher Portal</h1>
          <p className="text-slate-600 mt-1 flex items-center gap-2"><User size={16} /> {user.email}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition-colors">
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Loading portal data...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Order History</h2>
            {orders.length === 0 ? (
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 text-center text-slate-500">
                You have no prior research orders.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold font-mono text-slate-900">{order.orderNumber}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{order.status}</span>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      {formatTimestamp(order.timestamp)} • {order.cartItems?.length} Items • <span className="font-bold text-slate-900">${order.total?.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Shipped to: {order.customerInfo?.address}, {order.customerInfo?.city}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Saved Payment Methods</h2>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              {paymentMethods.length === 0 ? (
                <p className="text-sm text-slate-500">No saved payment methods.</p>
              ) : (
                <ul className="space-y-3">
                  {paymentMethods.map(method => (
                    <li key={method.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded border border-slate-100">
                      <CreditCard size={20} className="text-slate-400" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 capitalize">{method.brand} •••• {method.last4}</p>
                        <p className="text-xs text-slate-500">Expires {method.expMonth}/{method.expYear}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-xs text-blue-800">
              <Info size={16} className="mb-2" />
              For your security, we do not store full credit card numbers. Saved methods are securely tokenized.
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

function CartDrawer({ isCartOpen, setIsCartOpen, cart, setCart, user, setIsAuthModalOpen }) {
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [shippingDetails, setShippingDetails] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '' });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  // Address Autocomplete States
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isCartOpen]);

  // Pre-fill email if logged in
  useEffect(() => {
    if (user && isCartOpen) {
      setShippingDetails(prev => ({ ...prev, email: user.email }));
    }
  }, [user, isCartOpen]);

  // OpenStreetMap Address Autocomplete Fetch
  useEffect(() => {
    if (shippingDetails.address.length < 5 || !showAddressDropdown) {
      setAddressSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(shippingDetails.address)}&addressdetails=1&countrycodes=us&limit=5`);
        if (res.status === 429) return; 
        const data = await res.json();
        setAddressSuggestions(data);
      } catch (e) {
        console.error("Address lookup failed", e);
      }
    }, 600); 
    return () => clearTimeout(timer);
  }, [shippingDetails.address, showAddressDropdown]);

  const handleSelectAddress = (suggestion) => {
    const { address } = suggestion;
    const street = `${address.house_number || ''} ${address.road || ''}`.trim();
    const finalStreet = street || suggestion.display_name.split(',')[0];
    const city = address.city || address.town || address.village || address.municipality || '';
    const zip = address.postcode ? address.postcode.split('-')[0] : ''; 

    setShippingDetails(prev => ({
      ...prev,
      address: finalStreet,
      city: city,
      state: address.state || '',
      zip: zip
    }));
    setShowAddressDropdown(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('cart');
      setCheckoutError(null);
    }, 300);
  };

  // --- NEW: Firebase Stripe Extension Checkout Logic ---
  const handleCheckoutRedirect = async () => {
    setCheckoutError(null);
    setIsProcessing(true);

    if (!user) {
      setCheckoutError("Authentication required to communicate with Stripe.");
      setIsProcessing(false);
      return;
    }

    try {
      // 1. Map your cart items to Stripe line_items format
      const line_items = cart.map(item => ({
        price: item.stripePriceId, // This MUST match a real price ID in your Stripe Dashboard
        quantity: 1
      }));

      // 2. Add document to the specific checkout_sessions collection for this user
      // The Stripe Extension is configured to listen to this exact path!
      const checkoutSessionRef = await addDoc(
        collection(db, "users", user.uid, "checkout_sessions"), 
        {
          mode: 'payment',
          line_items: line_items,
          success_url: window.location.origin + '?checkout=success',
          cancel_url: window.location.origin + '?checkout=cancel',
          metadata: {
            customerName: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
            shippingAddress: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zip}`
          }
        }
      );

      // 3. Listen for the extension to update the document with the Stripe URL
      onSnapshot(checkoutSessionRef, (snap) => {
        const data = snap.data();
        
        // If the extension encounters an error (e.g. invalid Price ID)
        if (data?.error) {
          setCheckoutError(`Stripe Error: ${data.error.message}`);
          setIsProcessing(false);
        }
        
        // If the extension successfully generated the secure Stripe URL
        if (data?.url) {
          window.location.assign(data.url); // Redirects the browser to Stripe Hosted Checkout
        }
      });

    } catch (error) {
      console.error("Firebase connection error: ", error);
      setCheckoutError("Could not initialize Stripe Checkout. Check console.");
      setIsProcessing(false);
    }
  };

  const handleShippingChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
    if (e.target.name === 'address') setShowAddressDropdown(true);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // --- Strict Validation Rules ---
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateZip = (zip) => /^\d{5}$/.test(zip); // Strict 5 digit ZIP

  const isShippingValid = 
    shippingDetails.firstName.trim() !== '' &&
    shippingDetails.lastName.trim() !== '' &&
    validateEmail(shippingDetails.email) &&
    shippingDetails.address.trim() !== '' &&
    shippingDetails.city.trim() !== '' &&
    shippingDetails.state.trim() !== '' &&
    validateZip(shippingDetails.zip);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <>
      {isCartOpen && <div className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm transition-opacity" onClick={closeCart}></div>}
      
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {checkoutStep === 'cart' && <><ShoppingCart size={20} /> Research Cart ({cart.length})</>}
            {checkoutStep === 'shipping' && <><MapPin size={20} /> Shipping Details</>}
          </h2>
          <button onClick={closeCart} className="text-slate-400 hover:text-slate-700 transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* STEP 1: CART */}
          {checkoutStep === 'cart' && (
            cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                <ShoppingCart size={48} className="opacity-20" />
                <p>Your research cart is empty.</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex gap-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="bg-slate-100 rounded h-16 w-16 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 leading-tight">{item.name}</h4>
                      <p className="text-xs text-slate-500 mb-2">{item.size} • {item.purity} Purity</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-blue-700">${item.price.toFixed(2)}</span>
                        <button onClick={() => removeFromCart(index)} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}

          {/* STEP 2: SHIPPING DETAILS */}
          {checkoutStep === 'shipping' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">First Name</label>
                  <input type="text" name="firstName" value={shippingDetails.firstName} onChange={handleShippingChange} autoComplete="given-name" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name</label>
                  <input type="text" name="lastName" value={shippingDetails.lastName} onChange={handleShippingChange} autoComplete="family-name" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={shippingDetails.email} 
                  onChange={handleShippingChange} 
                  autoComplete="email"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${shippingDetails.email !== '' && !validateEmail(shippingDetails.email) ? 'border-red-500 focus:ring-red-500 text-red-600' : 'border-slate-300 focus:ring-blue-500'}`} 
                  placeholder="researcher@lab.com" 
                />
              </div>
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Shipping Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={shippingDetails.address} 
                  onChange={handleShippingChange} 
                  onFocus={() => setShowAddressDropdown(true)}
                  onBlur={() => setTimeout(() => setShowAddressDropdown(false), 200)}
                  autoComplete="street-address" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none" 
                  placeholder="Start typing your address..." 
                />
                {showAddressDropdown && addressSuggestions.length > 0 && (
                  <ul className="absolute z-50 w-full bg-white border border-slate-200 rounded-lg shadow-2xl max-h-60 overflow-y-auto mt-1 top-full left-0 divide-y divide-slate-100">
                    {addressSuggestions.map(s => (
                      <li key={s.place_id} onClick={() => handleSelectAddress(s)} className="p-3 hover:bg-blue-50 cursor-pointer">
                        <div className="flex items-start gap-2">
                          <MapPin size={16} className="text-slate-400 shrink-0 mt-0.5" />
                          <div className="overflow-hidden">
                            <p className="text-sm font-bold text-slate-900 truncate">
                              {s.address.house_number ? `${s.address.house_number} ${s.address.road || ''}` : s.display_name.split(',')[0]}
                            </p>
                            <p className="text-xs text-slate-500 truncate">{s.display_name}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                  <input type="text" name="city" value={shippingDetails.city} onChange={handleShippingChange} autoComplete="address-level2" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
                  <input type="text" name="state" value={shippingDetails.state} onChange={handleShippingChange} autoComplete="address-level1" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ZIP</label>
                  <input type="text" name="zip" value={shippingDetails.zip} onChange={handleShippingChange} maxLength="5" autoComplete="postal-code" className={`w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none ${shippingDetails.zip !== '' && !validateZip(shippingDetails.zip) ? 'border-red-500 text-red-600' : 'border-slate-300'}`} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Persistent Footer Actions */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex justify-between text-lg font-bold text-slate-900 mb-6">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            {checkoutError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600 font-medium">
                {checkoutError}
              </div>
            )}

            {checkoutStep === 'cart' && (
              user ? (
                <button onClick={() => setCheckoutStep('shipping')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg transition-colors flex justify-center items-center gap-2">
                  Proceed to Checkout <ChevronRight size={18} />
                </button>
              ) : (
                <div className="space-y-3 mt-2">
                  <p className="text-xs text-red-600 font-bold text-center">You must be logged in to place a research order.</p>
                  <button onClick={() => { closeCart(); setIsAuthModalOpen(true); }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors">
                    Sign In or Register
                  </button>
                </div>
              )
            )}
            
            {checkoutStep === 'shipping' && (
              <div className="flex gap-2">
                <button onClick={() => setCheckoutStep('cart')} className="px-4 py-4 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                  Back
                </button>
                {/* This button now triggers the secure redirect to Stripe.
                  The credit card inputs are handled securely on Stripe's end.
                */}
                <button 
                  onClick={handleCheckoutRedirect} 
                  disabled={!isShippingValid || isProcessing} 
                  className={`flex-1 font-bold py-4 rounded-lg shadow-lg transition-colors flex justify-center items-center gap-2 ${isShippingValid && !isProcessing ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                >
                  {isProcessing ? 'Connecting to Stripe...' : `Pay $${cartTotal.toFixed(2)}`} {!isProcessing && <Lock size={16} />}
                </button>
              </div>
            )}
            
            {checkoutStep === 'cart' && user && (
              <p className="text-xs text-slate-500 text-center mt-4">
                By checking out, you reaffirm that these items are for research purposes only.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function AuthModal({ isOpen, setIsOpen }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setIsOpen(false);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex bg-slate-50 border-b border-slate-200">
          <button className={`flex-1 py-4 font-bold text-sm ${isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-100'}`} onClick={() => setIsLogin(true)}>Researcher Login</button>
          <button className={`flex-1 py-4 font-bold text-sm ${!isLogin ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:bg-slate-100'}`} onClick={() => setIsLogin(false)}>Create Account</button>
        </div>
        <div className="p-6 md:p-8">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <button type="submit" disabled={loading} className="w-full font-bold py-3 rounded-lg shadow-md bg-slate-900 text-white mt-6">{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Register Account')}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ResearcherGateModal({ isAgeGated, setIsAgeGated }) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  if (!isAgeGated) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Researcher Verification</h2>
        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
          <span className="text-sm text-slate-700 font-medium">I certify that I am 21 years of age or older, I am a qualified researcher, and I agree to the Terms of Service. I acknowledge these products are NOT for human consumption.</span>
        </label>
        <button disabled={!termsAccepted} onClick={() => setIsAgeGated(false)} className={`w-full py-3 px-4 rounded-lg font-bold text-white shadow-md ${termsAccepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-300 cursor-not-allowed'}`}>Enter Store</button>
      </div>
    </div>
  );
}

function ProductModal({ selectedProduct, setSelectedProduct, addToCart }) {
  useEffect(() => {
    if (selectedProduct) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900">{selectedProduct.name}</h2>
          <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 rounded-lg flex items-center justify-center aspect-square border border-slate-200 overflow-hidden">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-3xl font-bold text-slate-900 mb-1">${selectedProduct.price.toFixed(2)}</p>
              <p className="text-sm text-slate-500 font-medium">{selectedProduct.size} / Lyophilized Powder</p>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Purity (HPLC):</span>
                <span className="font-semibold text-slate-900">{selectedProduct.purity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">CAS Number:</span>
                <span className="font-mono text-slate-900">{selectedProduct.cas}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Mol. Weight:</span>
                <span className="text-slate-900">{selectedProduct.mw}</span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">Sequence</h4>
              <p className="text-xs font-mono text-slate-600 bg-slate-100 p-2 rounded break-all">
                {selectedProduct.sequence}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-900 mb-1">Description</h4>
              <p className="text-sm text-slate-600">{selectedProduct.description}</p>
            </div>

            <button 
              onClick={() => addToCart(selectedProduct)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-md"
            >
              <ShoppingCart size={18} /> Add to Research Cart
            </button>

            <p className="text-[10px] text-red-600 text-center uppercase tracking-wide font-bold">
              * Not for human consumption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SDSPreviewModal({ previewSDSProduct, setPreviewSDSProduct, handleDownloadSDS }) {
  useEffect(() => {
    if (previewSDSProduct) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [previewSDSProduct]);

  if (!previewSDSProduct) return null;
  
  return (
    <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setPreviewSDSProduct(null)}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck size={20} className="text-slate-500" /> 
            SDS Preview: {previewSDSProduct.name}
          </h2>
          <button onClick={() => setPreviewSDSProduct(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-slate-200 p-4 md:p-8">
          <div className="bg-white max-w-2xl mx-auto min-h-full p-8 md:p-12 shadow-md font-sans text-sm text-slate-800 space-y-6">
            <div className="text-center border-b-2 border-slate-800 pb-4 mb-8">
              <h1 className="text-2xl font-black uppercase tracking-wider mb-2">Safety Data Sheet</h1>
              <p className="text-slate-500">According to Globally Harmonized System (GHS)</p>
            </div>

            <div>
              <h3 className="font-bold text-lg border-b border-slate-300 mb-2">1. Identification</h3>
              <div className="grid grid-cols-3 gap-2">
                <span className="font-semibold">Product Name:</span> <span className="col-span-2">{previewSDSProduct.name}</span>
                <span className="font-semibold">CAS Number:</span> <span className="col-span-2">{previewSDSProduct.cas}</span>
                <span className="font-semibold">Molecular Wt:</span> <span className="col-span-2">{previewSDSProduct.mw}</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg border-b border-slate-300 mb-2">2. Hazards Identification</h3>
              <p>Not a hazardous substance or mixture. This substance is not classified as dangerous according to Directive 67/548/EEC or GHS.</p>
            </div>

            <div>
              <h3 className="font-bold text-lg border-b border-slate-300 mb-2">3. First Aid Measures</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>If inhaled:</strong> Move person into fresh air. If not breathing, give artificial respiration.</li>
                <li><strong>In case of skin contact:</strong> Wash off with soap and plenty of water.</li>
                <li><strong>In case of eye contact:</strong> Flush eyes with water as a precaution.</li>
                <li><strong>If swallowed:</strong> Never give anything by mouth to an unconscious person. Rinse mouth with water.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg border-b border-slate-300 mb-2">4. Handling and Storage</h3>
              <p><strong>Storage conditions:</strong> {previewSDSProduct.storage}. Keep container tightly closed in a dry and well-ventilated place.</p>
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-slate-200 bg-white flex justify-end gap-3">
          <button 
            onClick={() => setPreviewSDSProduct(null)} 
            className="px-5 py-2.5 rounded-lg font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={() => handleDownloadSDS(previewSDSProduct)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors flex items-center gap-2"
          >
            <Download size={18} /> Download Full SDS
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 mt-auto border-t-8 border-red-600">
      <div className="container mx-auto max-w-7xl px-4 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-white mb-6">
            <FlaskConical size={24} />
            <span className="text-lg font-bold">HelixPeptides</span>
          </div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-500" /> Compliance Notice
          </h4>
          <p className="text-xs leading-relaxed mb-4 text-slate-300">
            The products offered by HelixPeptides are intended solely for laboratory research and in-vitro analytical testing. They are explicitly <strong>NOT FOR HUMAN OR ANIMAL CONSUMPTION</strong>, administration, diagnostic, or therapeutic use.
          </p>
          <p className="text-xs leading-relaxed text-slate-300">
            These chemicals are not FDA-approved drugs. Purchaser represents and warrants that they are a qualified researcher and will utilize these products strictly in adherence with all local, state, and federal laws. HelixPeptides reserves the right to cancel any order if there is suspicion of intended bodily administration.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => setCurrentPage('catalog')} className="hover:text-white transition-colors">Catalog</button></li>
            <li><button onClick={() => setCurrentPage('quality')} className="hover:text-white transition-colors">Quality Control</button></li>
            <li><button onClick={() => setCurrentPage('safety')} className="hover:text-white transition-colors">Safety Data Sheets</button></li>
            <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Contact Lab</h4>
          <ul className="space-y-2 text-sm">
            <li>support@helixpeptides.test</li>
            <li>(555) 123-4567</li>
            <li className="mt-4 pt-4 border-t border-slate-700">
              Operating Hours:<br/>Mon-Fri, 9am - 5pm EST
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-xs text-center">
        &copy; {new Date().getFullYear()} HelixPeptides. All rights reserved. For Research Use Only.
      </div>
    </footer>
  );
}

export default function App() {
  const [isAgeGated, setIsAgeGated] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('catalog');
  const [previewSDSProduct, setPreviewSDSProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const handleDownloadSDS = (product) => {
    const sdsContent = `SAFETY DATA SHEET\n\nProduct: ${product.name}\nCAS: ${product.cas}\nMolecular Weight: ${product.mw}\n\n1. HAZARDS IDENTIFICATION\nNot a hazardous substance or mixture according to the Globally Harmonized System (GHS).\n\n2. FIRST AID MEASURES\nIf inhaled, move person to fresh air. If not breathing, give artificial respiration.\n\nFOR RESEARCH USE ONLY.`;
    const blob = new Blob([sdsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.name.replace(/\s+/g, '_')}_SDS.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-200 flex flex-col">
      <ResearcherGateModal isAgeGated={isAgeGated} setIsAgeGated={setIsAgeGated} />
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
      <DisclaimerBanner />
      
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} cartCount={cart.length} setIsCartOpen={setIsCartOpen} user={user} setIsAuthModalOpen={setIsAuthModalOpen} />

      {currentPage === 'catalog' && <CatalogPage products={products} setSelectedProduct={setSelectedProduct} addToCart={addToCart} setCurrentPage={setCurrentPage} />}
      {currentPage === 'quality' && <QualityControlPage />}
      {currentPage === 'safety' && <SafetyDataPage products={products} setPreviewSDSProduct={setPreviewSDSProduct} handleDownloadSDS={handleDownloadSDS} />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'account' && <AccountPage user={user} setCurrentPage={setCurrentPage} />}

      <ProductModal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} addToCart={addToCart} />
      <SDSPreviewModal previewSDSProduct={previewSDSProduct} setPreviewSDSProduct={setPreviewSDSProduct} handleDownloadSDS={handleDownloadSDS} />
      <CartDrawer isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} cart={cart} setCart={setCart} user={user} setIsAuthModalOpen={setIsAuthModalOpen} />
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}