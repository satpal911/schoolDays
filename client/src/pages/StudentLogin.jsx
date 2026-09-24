import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function StudentLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login, loading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login("student", formData.email, formData.password);
      console.log("Student login credentials submitted:", formData);
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className='bg-slate-950 min-h-screen w-full grid place-items-center p-4 font-sans antialiased'>
      <div className='w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md'>
        
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-extrabold tracking-tight text-white mb-2'>
            Student Sign In
          </h1>
          <p className='text-sm text-slate-400'>
            Welcome back! Access your courses and assignments
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>school</label>
            <input 
              type="email"
              placeholder="student@school.com"
              name="email"
              value={formData.email}
              onChange={handleChange} 
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition duration-200 text-sm'
              required
            />
          </div>
          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>class</label>
            <input 
              type="email"
              placeholder="student@school.com"
              name="email"
              value={formData.email}
              onChange={handleChange} 
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition duration-200 text-sm'
              required
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>roll no.</label>
            <input 
              type="email"
              placeholder="student@school.com"
              name="email"
              value={formData.email}
              onChange={handleChange} 
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition duration-200 text-sm'
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
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition duration-200 text-sm mb-2'
              required
            />
          </div>

          <button 
            type="submit"
            className='w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-violet-900/20 active:scale-[0.98] transition duration-200 text-sm cursor-pointer mt-2'
          >
            Sign In
          </button>

          <p className='text-center text-sm text-slate-400 mt-4'>
            Don't have a student account?{' '}
            Contact your class teacher
          </p>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
