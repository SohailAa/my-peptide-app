'use client';

import React, { useState, useEffect } from 'react';

// --- Inline SVG Icons (Replaces lucide-react to fix Context/Hook errors) ---
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

// --- Mock Data: Research Peptides ---
const products = [
  { 
    id: 1, 
    name: "BPC-157", 
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
    sequence: "Gly-His-Lys(Cu2+)", 
    cas: "49557-75-7", 
    mw: "404.9 g/mol",
    price: 35.00, 
    size: "50mg", 
    purity: "99.8%",
    image: "https://placehold.co/400x400/f8fafc/475569?text=GHK-Cu%0A50mg",
    description: "Copper-binding tripeptide widely used in molecular biology and cellular matrix research. Characteristic blue lyophilized powder.",
    storage: "Store at 4°C, protected from light"
  },
  { 
    id: 4, 
    name: "Tirzepatide", 
    sequence: "Tyr-Aib-Glu-Gly-Thr-Phe-Thr-Ser-Asp-Val-Ser-Ser-Tyr-Leu-Glu-Gly-Gln-Ala-Ala-Lys(AEEAc-AEEAc-γ-Glu-19-carboxynonadecanoyl)-Glu-Phe-Ile-Ala-Trp-Leu-Val-Arg-Gly-Arg-Gly", 
    cas: "2023788-19-2", 
    mw: "4813.5 g/mol",
    price: 145.00, 
    size: "10mg", 
    purity: "99.4%",
    image: "https://placehold.co/400x400/f8fafc/475569?text=Tirzepatide%0A10mg",
    description: "Dual GIP and GLP-1 receptor agonist synthesized for pre-clinical in-vitro research only.",
    storage: "Desiccated at -20°C"
  },
  { 
    id: 5, 
    name: "TB-500", 
    sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln-Glu-Lys-Asn-Pro-Leu-Pro-Ser-Lys-Glu-Thr-Ile-Glu-Gln-Glu-Lys-Gln-Ala-Gly-Glu-Ser", 
    cas: "77591-33-4", 
    mw: "4963.4 g/mol",
    price: 55.00, 
    size: "5mg", 
    purity: "99.1%",
    image: "https://placehold.co/400x400/f8fafc/475569?text=TB-500%0A5mg",
    description: "Synthetic version of the naturally occurring peptide Thymosin Beta-4. Strictly for research use in cell migration and actin sequestration assays.",
    storage: "Desiccated at -20°C"
  },
  { 
    id: 6, 
    name: "Melanotan II", 
    sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH2", 
    cas: "121062-08-6", 
    mw: "1024.2 g/mol",
    price: 30.00, 
    size: "10mg", 
    purity: "99.6%",
    image: "https://placehold.co/400x400/f8fafc/475569?text=Melanotan+II%0A10mg",
    description: "Synthetic melanocortin receptor agonist. Analytical standard for laboratory assay development.",
    storage: "Desiccated at -20°C"
  }
];

// --- Extracted Components ---

function DisclaimerBanner() {
  return (
    <div className="bg-red-600 text-white text-xs font-bold text-center py-2 px-4 uppercase tracking-wider flex items-center justify-center gap-2">
      <AlertTriangle size={14} />
      Strictly for laboratory research use only. Not for human or veterinary use.
    </div>
  );
}

function Navbar({ currentPage, setCurrentPage, cartCount, setIsCartOpen }) {
  return (
    <nav className="bg-slate-900 text-white p-4 sticky top-0 z-40 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
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
    </nav>
  );
}

function CatalogPage({ products, setSelectedProduct, addToCart, setCurrentPage }) {
  return (
    <>
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
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
          <div className="hidden md:flex justify-end relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20"></div>
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative w-full max-w-md">
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

      <main id="catalog-grid" className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Research Catalog</h2>
            <p className="text-slate-600">Premium analytical reference standards. Sold as lyophilized powder.</p>
          </div>
          <div className="bg-slate-100 p-1 rounded-lg inline-flex">
            <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-medium text-slate-800">All Peptides</button>
            <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Vials</button>
            <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">Kits</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all group flex flex-col">
              <div 
                className="bg-slate-50 aspect-square flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded border border-green-200 shadow-sm">
                    &gt;{product.purity} Purity
                  </span>
                </div>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <button className="bg-white text-slate-700 p-2 rounded-full shadow-md hover:bg-slate-100">
                    <Info size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 leading-tight">{product.name}</h3>
                  <span className="font-bold text-blue-700">${product.price.toFixed(2)}</span>
                </div>
                
                <p className="text-xs text-slate-500 mb-4 font-medium">{product.size} / Lyophilized</p>
                
                <div className="mt-auto space-y-3">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded transition-colors text-sm"
                  >
                    View Specifications
                  </button>
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
    <div className="container mx-auto px-4 py-16 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
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
    <div className="container mx-auto px-4 py-16 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
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
    <div className="container mx-auto px-4 py-16 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
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

function Footer({ setCurrentPage }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 mt-auto border-t-8 border-red-600">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
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

function ResearcherGateModal({ isAgeGated, setIsAgeGated }) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (isAgeGated) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isAgeGated]);

  if (!isAgeGated) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 md:p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <AlertTriangle className="text-red-600" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Researcher Verification</h2>
        <p className="text-center text-slate-600 text-sm mb-6">
          Please review and acknowledge our terms of service before accessing our catalog.
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 h-48 overflow-y-auto text-xs text-slate-700 space-y-3">
          <p><strong>1. Intended Use:</strong> All products sold on this website are for strictly laboratory and in-vitro research purposes only. They are not intended for human consumption, animal use, or therapeutic applications.</p>
          <p><strong>2. Regulatory Status:</strong> These products are not FDA-approved drugs. They have not been evaluated for safety or efficacy in humans or animals.</p>
          <p><strong>3. Assumption of Risk:</strong> The purchaser assumes all risk and liability for the use, handling, and storage of these products. Handling must be performed by qualified professionals using proper laboratory equipment.</p>
          <p><strong>4. Misuse:</strong> Any communication indicating an intent to use these products for bodily administration will result in immediate account termination and order cancellation.</p>
        </div>

        <label className="flex items-start gap-3 mb-6 cursor-pointer group">
          <div className="mt-0.5">
            <input 
              type="checkbox" 
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
          </div>
          <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
            I certify that I am 21 years of age or older, I am a qualified researcher, and I agree to the Terms of Service. I acknowledge these products are NOT for human consumption.
          </span>
        </label>

        <button 
          disabled={!termsAccepted}
          onClick={() => setIsAgeGated(false)}
          className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all shadow-md
            ${termsAccepted ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg' : 'bg-slate-300 cursor-not-allowed'}`}
        >
          Enter Store
        </button>
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
          {/* Mock PDF Document Visual */}
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

function CartDrawer({ isCartOpen, setIsCartOpen, cart, setCart }) {
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [shippingDetails, setShippingDetails] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', state: '', zip: '' });
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isCartOpen]);

  const closeCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      if (checkoutStep === 'success') setCart([]); 
      setCheckoutStep('cart');
    }, 300);
  };

  const handlePlaceOrder = () => {
    setOrderNumber('RX-' + Math.floor(100000 + Math.random() * 900000));
    setCheckoutStep('success');
  };

  const handleShippingChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const isShippingValid = Object.values(shippingDetails).every(val => val.trim() !== '');

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        ></div>
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            {checkoutStep === 'cart' && <><ShoppingCart size={20} /> Research Cart ({cart.length})</>}
            {checkoutStep === 'shipping' && <><MapPin size={20} /> Shipping Details</>}
            {checkoutStep === 'payment' && <><CreditCard size={20} /> Secure Checkout</>}
            {checkoutStep === 'success' && <><Check size={20} className="text-green-600" /> Order Confirmed</>}
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
                <button onClick={closeCart} className="text-blue-600 font-medium hover:underline mt-2">
                  Continue Browsing
                </button>
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
                        <button onClick={() => removeFromCart(index)} className="text-xs text-red-500 hover:text-red-700 font-medium">
                          Remove
                        </button>
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
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input type="text" name="firstName" value={shippingDetails.firstName} onChange={handleShippingChange} className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all" placeholder="John" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name</label>
                  <input type="text" name="lastName" value={shippingDetails.lastName} onChange={handleShippingChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email (For tracking & invoice)</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-3 text-slate-400" />
                  <input type="email" name="email" value={shippingDetails.email} onChange={handleShippingChange} className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all" placeholder="researcher@lab.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Shipping Address</label>
                <input type="text" name="address" value={shippingDetails.address} onChange={handleShippingChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all" placeholder="123 Science Blvd, Suite 100" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
                  <input type="text" name="city" value={shippingDetails.city} onChange={handleShippingChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none transition-all" placeholder="City" />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">State</label>
                  <input type="text" name="state" value={shippingDetails.state} onChange={handleShippingChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none transition-all" placeholder="CA" />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">ZIP</label>
                  <input type="text" name="zip" value={shippingDetails.zip} onChange={handleShippingChange} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm outline-none transition-all" placeholder="90210" />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT METHOD (STRIPE) */}
          {checkoutStep === 'payment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Enter your card details to complete the order.</p>
                <div className="flex gap-1">
                  <div className="w-8 h-5 bg-slate-200 rounded text-[8px] font-bold text-slate-500 flex items-center justify-center">VISA</div>
                  <div className="w-8 h-5 bg-slate-200 rounded text-[8px] font-bold text-slate-500 flex items-center justify-center">MC</div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Card Information</label>
                  <div className="relative">
                    <CreditCard size={16} className="absolute left-3 top-3 text-slate-400" />
                    <input type="text" placeholder="Card number" className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-t-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all" />
                  </div>
                  <div className="flex">
                    <input type="text" placeholder="MM / YY" className="w-1/2 px-3 py-2 border-b border-l border-r border-slate-300 rounded-bl-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all -mt-px relative z-10" />
                    <input type="text" placeholder="CVC" className="w-1/2 px-3 py-2 border-b border-r border-slate-300 rounded-br-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all -mt-px -ml-px relative z-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Name on card</label>
                  <input type="text" placeholder="Name on card" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none transition-all" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-6">
                <Lock size={12} className="text-slate-400" />
                <span>Payments are secure and encrypted via <span className="font-bold text-slate-700">Stripe</span>.</span>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS / INVOICE */}
          {checkoutStep === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful</h3>
              <p className="text-sm text-slate-600 mb-6">Your research materials have been reserved. Order <span className="font-mono font-bold text-slate-900">{orderNumber}</span></p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full text-left space-y-4">
                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2">Order Summary</h4>
                
                <div className="text-sm text-slate-600 space-y-2">
                  <p>Your card was successfully charged <strong className="text-slate-900">${cartTotal.toFixed(2)}</strong>.</p>
                  <p>A full receipt and tracking information will be sent to <strong className="text-slate-900">{shippingDetails.email}</strong> once your order ships.</p>
                </div>
              </div>

              <button onClick={closeCart} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-8">
                Return to Catalog
              </button>
            </div>
          )}
        </div>

        {/* Persistent Footer Actions */}
        {cart.length > 0 && checkoutStep !== 'success' && (
          <div className="p-6 border-t border-slate-200 bg-slate-50">
            <div className="flex justify-between text-lg font-bold text-slate-900 mb-6">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            
            {checkoutStep === 'cart' && (
              <button onClick={() => setCheckoutStep('shipping')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg shadow-lg transition-colors flex justify-center items-center gap-2">
                Proceed to Checkout <ChevronRight size={18} />
              </button>
            )}
            {checkoutStep === 'shipping' && (
              <div className="flex gap-2">
                <button onClick={() => setCheckoutStep('cart')} className="px-4 py-4 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                  Back
                </button>
                <button onClick={() => setCheckoutStep('payment')} disabled={!isShippingValid} className={`flex-1 font-bold py-4 rounded-lg shadow-lg transition-colors flex justify-center items-center gap-2 ${isShippingValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>
                  Continue to Payment <ChevronRight size={18} />
                </button>
              </div>
            )}
            {checkoutStep === 'payment' && (
              <div className="flex gap-2">
                <button onClick={() => setCheckoutStep('shipping')} className="px-4 py-4 rounded-lg font-bold text-slate-600 hover:bg-slate-200 transition-colors">
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg shadow-lg transition-colors flex justify-center items-center gap-2">
                  Pay ${cartTotal.toFixed(2)} <Lock size={16} />
                </button>
              </div>
            )}

            {checkoutStep === 'cart' && (
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

// --- Main App Component ---

export default function App() {
  const [isAgeGated, setIsAgeGated] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('catalog');
  const [previewSDSProduct, setPreviewSDSProduct] = useState(null);

  // Scroll to top when changing pages
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
      <DisclaimerBanner />
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cart.length} 
        setIsCartOpen={setIsCartOpen} 
      />

      {/* Main Content Area Routing */}
      {currentPage === 'catalog' && (
        <CatalogPage 
          products={products} 
          setSelectedProduct={setSelectedProduct} 
          addToCart={addToCart} 
          setCurrentPage={setCurrentPage} 
        />
      )}
      {currentPage === 'quality' && <QualityControlPage />}
      {currentPage === 'safety' && (
        <SafetyDataPage 
          products={products} 
          setPreviewSDSProduct={setPreviewSDSProduct} 
          handleDownloadSDS={handleDownloadSDS} 
        />
      )}
      {currentPage === 'contact' && <ContactPage />}

      <ProductModal 
        selectedProduct={selectedProduct} 
        setSelectedProduct={setSelectedProduct} 
        addToCart={addToCart} 
      />
      <SDSPreviewModal 
        previewSDSProduct={previewSDSProduct} 
        setPreviewSDSProduct={setPreviewSDSProduct} 
        handleDownloadSDS={handleDownloadSDS} 
      />
      <CartDrawer 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen} 
        cart={cart} 
        setCart={setCart} 
      />
      
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}