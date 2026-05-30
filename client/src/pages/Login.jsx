import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100
      flex items-center justify-center p-4'>
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
        className='bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md'>

        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4'>
            <FiShoppingCart className='text-green-600 text-3xl' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>Welcome back</h1>
          <p className='text-gray-500 mt-1'>Sign in to your grocery manager</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-1'>Email</label>
            <div className='relative'>
              <FiMail className='absolute left-3 top-3.5 text-gray-400' />
              <input type='email' placeholder='you@example.com' required
                className='input pl-10' value={form.email}
                onChange={e => setForm({...form, email: e.target.value})} />
            </div>
          </div>
          <div>
            <label className='text-sm font-medium text-gray-700 block mb-1'>Password</label>
            <div className='relative'>
              <FiLock className='absolute left-3 top-3.5 text-gray-400' />
              <input type='password' placeholder='Enter password' required
                className='input pl-10' value={form.password}
                onChange={e => setForm({...form, password: e.target.value})} />
            </div>
          </div>
          <button type='submit' disabled={loading} className='btn-primary w-full'>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Don't have an account?{' '}
          <Link to='/register' className='text-green-600 font-semibold hover:underline'>Sign up free</Link>
        </p>
      </motion.div>
    </div>
  );
}