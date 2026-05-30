import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Profile() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '' });
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/auth/profile', form);
      toast.success('Profile updated! Please log in again to see changes.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar title='Profile' />
        <main className='flex-1 overflow-y-auto p-6 max-w-xl mx-auto w-full'>
          <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}>

            <div className='card text-center mb-6'>
              <img src={user?.avatar} alt='avatar'
                className='w-24 h-24 rounded-full mx-auto mb-4 ring-4 ring-green-100' />
              <h2 className='text-xl font-bold text-gray-900'>{user?.name}</h2>
              <p className='text-gray-500 text-sm'>{user?.email}</p>
              <span className='badge-green mt-3 inline-block'>Active Member</span>
            </div>

            <div className='card'>
              <h3 className='font-semibold text-gray-800 mb-5'>Update Profile</h3>
              <form onSubmit={handleUpdate} className='space-y-4'>
                <div>
                  <label className='text-sm font-medium text-gray-700 block mb-1'>Full Name</label>
                  <div className='relative'>
                    <FiUser className='absolute left-3 top-3.5 text-gray-400' />
                    <input className='input pl-10' value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className='text-sm font-medium text-gray-700 block mb-1'>Email</label>
                  <div className='relative'>
                    <FiMail className='absolute left-3 top-3.5 text-gray-400' />
                    <input type='email' className='input pl-10' value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <button type='submit' disabled={loading}
                  className='btn-primary w-full flex items-center justify-center gap-2'>
                  <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>

            <div className='card mt-6 border border-red-100'>
              <h3 className='font-semibold text-red-600 mb-2'>Danger Zone</h3>
              <p className='text-sm text-gray-500 mb-4'>Logging out will clear your session.</p>
              <button onClick={logout}
                className='w-full border border-red-200 text-red-600 rounded-xl py-2.5
                font-semibold hover:bg-red-50 transition text-sm'>
                Logout from Account
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}