import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiCheck, FiRefreshCw } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getItems, updateItem } from '../services/groceryService';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(new Set());

  const fetchList = async () => {
    try {
      const { data } = await getItems({});
      setItems(data.filter(i => i.inShoppingList || i.quantity <= i.minStockLevel));
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchList(); }, []);

  const togglePurchased = (id) => {
    setPurchased(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleClearPurchased = async () => {
    const toClear = items.filter(i => purchased.has(i._id));
    await Promise.all(toClear.map(i => updateItem(i._id, { inShoppingList: false })));
    setPurchased(new Set());
    toast.success(`${toClear.length} item(s) marked as purchased!`);
    fetchList();
  };

  const pending = items.filter(i => !purchased.has(i._id));
  const done    = items.filter(i =>  purchased.has(i._id));

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar title='Shopping List' />
        <main className='flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full'>

          <div className='flex items-center justify-between mb-6'>
            <div className='card flex items-center gap-4 py-4 flex-1 mr-4'>
              <div className='w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'>
                <FiShoppingBag className='text-green-600 text-2xl' />
              </div>
              <div>
                <p className='text-2xl font-bold text-gray-900'>{items.length}</p>
                <p className='text-sm text-gray-500'>Items to buy</p>
              </div>
            </div>
            {purchased.size > 0 && (
              <button onClick={handleClearPurchased} className='btn-primary flex items-center gap-2'>
                <FiCheck /> Done ({purchased.size})
              </button>
            )}
            <button onClick={fetchList} className='ml-3 p-3 rounded-xl border border-gray-200
              hover:bg-gray-50 transition text-gray-500'>
              <FiRefreshCw />
            </button>
          </div>

          {loading ? (<div className='text-center py-20 text-gray-400'>Loading...</div>) : (
          <>
            {pending.length === 0 && done.length === 0 && (
              <div className='text-center py-24'>
                <FiShoppingBag className='text-gray-300 text-6xl mx-auto mb-4' />
                <p className='text-gray-400 text-lg'>Your shopping list is empty!</p>
              </div>
            )}

            <div className='space-y-3'>
              <AnimatePresence>
                {pending.map((item, i) => (
                  <motion.div key={item._id} initial={{ opacity:0,x:-20 }}
                    animate={{ opacity:1,x:0 }} transition={{ delay:i*0.05 }}
                    className='card flex items-center gap-4 py-4 cursor-pointer hover:border-green-200 transition'
                    onClick={() => togglePurchased(item._id)}>
                    <div className='w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0' />
                    <div className='flex-1'>
                      <p className='font-semibold text-gray-900'>{item.name}</p>
                      <p className='text-sm text-gray-400'>{item.category} • Need: {item.minStockLevel} {item.unit}</p>
                    </div>
                    <span className='text-xs badge-yellow'>{item.quantity} {item.unit} left</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {done.length > 0 && (
              <div className='mt-6'>
                <p className='text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide'>Purchased</p>
                <div className='space-y-2'>
                  {done.map(item => (
                    <div key={item._id} className='card flex items-center gap-4 py-3 opacity-50 cursor-pointer'
                      onClick={() => togglePurchased(item._id)}>
                      <div className='w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0'>
                        <FiCheck className='text-white text-sm' />
                      </div>
                      <p className='font-medium text-gray-500 line-through'>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>)}
        </main>
      </div>
    </div>
  );
}