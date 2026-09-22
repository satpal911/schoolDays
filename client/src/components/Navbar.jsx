import React from 'react';

export default function Navbar() {
  return (
    <nav className='bg-slate-900 border-b border-slate-800 w-full sticky top-0 z-50 px-6 py-4 backdrop-blur-md bg-opacity-95'>
      <div className='max-w-7xl mx-auto flex items-center justify-between'>
        
        <div className='flex items-center gap-2 cursor-pointer group'>
          <span className='w-3 h-3 rounded-full bg-orange-500 animate-pulse'></span>
          <span className='text-2xl font-black tracking-tight text-white transition duration-200 group-hover:text-orange-400'>
            school<span className='text-orange-500'>Days</span>
          </span>
        </div>

        <div className='flex items-center gap-4 text-sm font-medium text-slate-400'>
          <span className='hover:text-white cursor-pointer transition duration-150'>
            Documentation
          </span>
          <span className='bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer transition duration-150 text-xs font-semibold uppercase tracking-wider'>
            v1.0.0
          </span>
        </div>

      </div>
    </nav>
  );
}
