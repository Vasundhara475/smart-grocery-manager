import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiClock, FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getItems } from '../services/groceryService';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function Alerts() {
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState('lowStock');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItems({}).then(({ data }) => setItems(data)).finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const lowStock    = items.filter(i => i.quantity > 0 && i.quantity <= i.minStockLevel);
  const outOfStock  = items.filter(i => i.quantity === 0);
  const expiringSoon = items.filter(i => {
    if (!i.expiryDate) return false;
    const exp = new Date(i.expiryDate);
    return exp >= now && exp <= threeDays;
  });
  const expired = items.filter(i => i.expiryDate && new Date(i.expiryDate) < now);

  const tabs = [
    { id:'lowStock',    label:'Low Stock',     count:lowStock.length,     color:'text-yellow-600 bg-yellow-50 border-yellow-200' },
    { id:'outOfStock',  label:'Out of Stock',  count:outOfStock.length,   color:'text-red-600 bg-red-50 border-red-200' },
    { id:'expiringSoon',label:'Expiring Soon', count:expiringSoon.length, color:'text-orange-600 bg-orange-50 border-orange-200' },
    { id:'expired',     label:'Expired',       count:expired.length,      color:'text-gray-600 bg-gray-50 border-gray-200' },
  ];

  const current = { lowStock, outOfStock, expiringSoon, expired }[tab];

  const AlertCard = ({ item, type }) => {
    const daysLeft = item.expiryDate
      ? Math.ceil((new Date(item.expiryDate) - now) / (1000*60*60*24)) : null;
    return (
      <motion.div initial={{ opacity:0,y:15 }} animate={{ opacity:1,y:0 }}
        className='card flex items-center gap-4 py-4'>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          type==='expiringSoon'||type==='expired' ? 'bg-orange-50':'bg-red-50'}`}>
          {type==='expiringSoon'||type==='expired'
            ? <FiClock className='text-orange-500 text-xl' />
            : <FiPackage className='text-red-500 text-xl' />}
        </div>
        <div className='flex-1'>
          <p className='font-semibold text-gray-900'>{item.name}</p>
          <p className='text-sm text-gray-500'>{item.category}</p>
        </div>
        <div className='text-right'>
          {(type==='lowStock'||type==='outOfStock') && (
            <p className='text-sm font-bold text-red-600'>{item.quantity} {item.unit} left</p>
          )}
          {type==='expiringSoon' && daysLeft !== null && (
            <p className='text-sm font-bold text-orange-600'>
              {daysLeft === 0 ? 'Expires today!' : `${daysLeft} day(s) left`}
            </p>
          )}
          {type==='expired' && <p className='text-sm font-bold text-gray-400'>Expired</p>}
          <Link to={`/edit-item/${item._id}`} className='text-xs text-green-600 hover:underline'>Update</Link>
        </div>
      </motion.div>
    );
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar title='Alerts' />
        <main className='flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full'>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-6'>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`rounded-2xl border p-4 text-left transition
                ${tab===t.id ? t.color+' shadow-sm' : 'bg-white border-gray-100 hover:border-gray-200'}`}>
                <p className='text-2xl font-bold'>{t.count}</p>
                <p className='text-xs font-medium mt-0.5'>{t.label}</p>
              </button>
            ))}
          </div>

          {loading ? (<div className='text-center py-20 text-gray-400'>Loading...</div>) : (
          <div className='space-y-3'>
            {current.length === 0 ? (
              <div className='text-center py-20'>
                <FiAlertTriangle className='text-gray-300 text-6xl mx-auto mb-4' />
                <p className='text-gray-400'>No alerts in this category. Great job!</p>
              </div>
            ) : current.map(item => <AlertCard key={item._id} item={item} type={tab} />)}
          </div>)}
        </main>
      </div>
    </div>
  );
}