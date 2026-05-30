import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { getItems, deleteItem } from '../services/groceryService';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const CATEGORIES = ['All','Vegetables','Fruits','Dairy','Meat',
  'Beverages','Snacks','Grains','Frozen','Condiments','Other'];

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchItems = async () => {
    try {
      const { data } = await getItems({ search, category });
      setItems(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchItems(); }, [search, category]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    await deleteItem(id);
    toast.success('Item deleted');
    fetchItems();
  };

  const getStockBadge = (item) => {
    if (item.quantity === 0) return <span className='badge-red'>Out of Stock</span>;
    if (item.quantity <= item.minStockLevel) return <span className='badge-yellow'>Low Stock</span>;
    return <span className='badge-green'>In Stock</span>;
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar title='Inventory' />
        <main className='flex-1 overflow-y-auto p-6'>

          <div className='flex flex-col sm:flex-row gap-4 mb-6'>
            <div className='relative flex-1'>
              <FiSearch className='absolute left-3 top-3 text-gray-400' />
              <input className='input pl-10' placeholder='Search items...'
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className='input w-auto' value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <Link to='/add-item' className='btn-primary flex items-center gap-2 whitespace-nowrap'>
              <FiPlus /> Add Item
            </Link>
          </div>

          {loading ? (<div className='text-center py-20 text-gray-400'>Loading...</div>) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div key={item._id} initial={{ opacity:0, scale:0.95 }}
                  animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.95 }}
                  transition={{ delay: i * 0.05 }} className='card hover:shadow-md'>

                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h3 className='font-semibold text-gray-900'>{item.name}</h3>
                      <span className='text-xs text-gray-400'>{item.category}</span>
                    </div>
                    {getStockBadge(item)}
                  </div>

                  <div className='text-3xl font-bold text-gray-900 mb-1'>
                    {item.quantity} <span className='text-base font-normal text-gray-400'>{item.unit}</span>
                  </div>

                  {item.expiryDate && (
                    <p className='text-xs text-gray-500 mb-3'>
                      Expires: {new Date(item.expiryDate).toLocaleDateString()}
                    </p>
                  )}

                  <div className='flex gap-2 mt-4 pt-4 border-t border-gray-100'>
                    <Link to={`/edit-item/${item._id}`}
                      className='flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium'>
                      <FiEdit2 /> Edit
                    </Link>
                    <button onClick={() => handleDelete(item._id)}
                      className='flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium ml-auto'>
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>)}

          {!loading && items.length === 0 && (
            <div className='text-center py-24'>
              <p className='text-gray-400 text-lg'>No items found.</p>
              <Link to='/add-item' className='btn-primary mt-4 inline-block'>Add First Item</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}