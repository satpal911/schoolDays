import React, { useState } from 'react';
import toast from "react-hot-toast";
import { useAuth } from '../context/AuthContext';

function DirectorLogin() {
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
      await login("director", formData.email, formData.password);
      toast.success("Director logged in successfully");
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.log("Login error:", error);
      toast.error(error || "Login failed");
    }
  };

  return (
    <div className='bg-slate-950 min-h-screen w-full grid place-items-center p-4 font-sans antialiased'>
      <div className='w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-md'>
        
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-extrabold tracking-tight text-white mb-2'>
            Director Sign In
          </h1>
          <p className='text-sm text-slate-400'>
            Welcome back! Access your executive management dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2'>Email</label>
            <input 
              type="email"
              placeholder="director@institution.com"
              name="email"
              value={formData.email}
              onChange={handleChange} 
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 text-sm'
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
              className='w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200 text-sm mb-2'
              required
            />
          </div>

          <button 
            type="submit"
            className='w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-amber-900/20 active:scale-[0.98] transition duration-200 text-sm cursor-pointer mt-2'
          >
            Sign In
          </button>

          <p className='text-center text-sm text-slate-400 mt-4'>
            Don't have a director account?{' '}
            <span className='text-amber-400 font-medium hover:underline cursor-pointer transition duration-150'>
              Register here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default DirectorLogin;
