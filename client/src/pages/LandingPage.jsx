import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-orange-200 flex flex-col items-center justify-center px-6 py-12 text-center select-none overflow-hidden relative">
      
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        
        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-amber-700 bg-amber-100/80 rounded-full tracking-wide uppercase shadow-sm">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
          Institutional Management Platform
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-800 leading-tight">
          Welcome to the <br />
          <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
            Smart ERP Portal
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto font-medium leading-relaxed">
          A centralized, feature-driven dashboard engine designed for Directors, Principals, Teachers, and Students to manage data seamlessly.
        </p>

        <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
          <Link
            to="/director/login"
            className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg hover:from-amber-600 hover:to-orange-600 active:scale-95"
          >
            Access Dashboard Panel
          </Link>
          <Link
            to="/director/login"
            className="px-8 py-3 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold text-sm rounded-xl border border-gray-200 transition-all duration-200 hover:bg-white hover:text-gray-900 active:scale-95"
          >
            Learn More
          </Link>
        </div>

      </div>
    </div>
  );
}
