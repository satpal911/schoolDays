import React, { useState } from 'react';

function PrincipalRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    school: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log("Principal registration successful:", formData);
      setFormData({ name: "", email: "", password: "", school: "" });
    } catch (error) {
      console.log("Submission error:", error);
    }
  };

  return (
    <div className='bg-slate-950 min-h-screen w-full grid place-items-center p-4 font-sans antialiased'>
      <div className='w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md'>
        
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-extrabold tracking-tight text-white mb-2'>
            Principal Registration
          </h1>
          <p className='text-sm text-slate-400'>
            Set up your administrative authority workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>Full Name</label>
            <input 
              type="text"
              placeholder="Dr. Eleanor Vance"
              name="name"
              value={formData.name}
              onChange={handleChange} 
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 text-sm'
              required
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>Email Address</label>
            <input 
              type="email"
              placeholder="principal@school.com"
              name="email"
              value={formData.email}
              onChange={handleChange} 
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 text-sm'
              required
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>Password</label>
            <input 
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange} 
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 text-sm'
              required
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>School Name</label>
            <input 
              type="text"
              placeholder="Greenwood High School"
              name="school"
              value={formData.school}
              onChange={handleChange} 
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 text-sm mb-2'
              required
            />
          </div>

          <button 
            type="submit"
            className='w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-cyan-900/20 active:scale-[0.98] transition duration-200 text-sm cursor-pointer mt-2'
          >
            Register Principal
          </button>

          <p className='text-center text-sm text-slate-400 mt-4'>
            Already have an account?{' '}
            <span className='text-cyan-400 font-medium hover:underline cursor-pointer transition duration-150'>
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default PrincipalRegister;
