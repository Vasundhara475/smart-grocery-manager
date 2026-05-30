import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getItems, updateItem } from '../services/groceryService';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const CATEGORIES = ['Vegetables','Fruits','Dairy','Meat','Beverages','Snacks','Grains','Frozen','Condiments','Other'];
const UNITS = ['kg','g','L','ml','pcs','dozen','pack'];

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    name:'', category:'Other', quantity:1, unit:'pcs',
    minStockLevel:2, expiryDate:'', price:'', notes:'', inShoppingList:false
  });

  useEffect(() => {
    getItems({}).then(({ data }) => {
      const item = data.find(i => i._id === id);
      if (item) {
        setForm({
          name: item.name, category: item.category, quantity: item.quantity,
          unit: item.unit, minStockLevel: item.minStockLevel,
          expiryDate: item.expiryDate ? item.expiryDate.split('T')[0] : '',
          price: item.price || '', notes: item.notes || '',
          inShoppingList: item.inShoppingList,
        });
      }
    }).finally(() => setFetching(false));
  }, [id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateItem(id, form);
      toast.success('Item updated!');
      navigate('/inventory');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally { setLoading(false); }
  };

  if (fetching) return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex items-center justify-center'>
        <div className='animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full'/>
      </div>
    </div>
  );

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar title='Edit Item' />
        <main className='flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full'>
          <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} className='card'>
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div><label className='text-sm font-medium text-gray-700 block mb-1'>Item Name*</label>
                  <input name='name' required className='input' value={form.name} onChange={handleChange} /></div>
                <div><label className='text-sm font-medium text-gray-700 block mb-1'>Category</label>
                  <select name='category' className='input' value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c=><option key={c}>{c}</option>)}</select></div>
                <div><label className='text-sm font-medium text-gray-700 block mb-1'>Quantity*</label>
                  <input name='quantity' type='number' min='0' required className='input'
                    value={form.quantity} onChange={handleChange} /></div>
                <div><label className='text-sm font-medium text-gray-700 block mb-1'>Unit</label>
                  <select name='unit' className='input' value={form.unit} onChange={handleChange}>
                    {UNITS.map(u=><option key={u}>{u}</option>)}</select></div>
                <div><label className='text-sm font-medium text-gray-700 block mb-1'>Min Stock Level</label>
                  <input name='minStockLevel' type='number' min='0' className='input'
                    value={form.minStockLevel} onChange={handleChange} /></div>
                <div><label className='text-sm font-medium text-gray-700 block mb-1'>Expiry Date</label>
                  <input name='expiryDate' type='date' className='input'
                    value={form.expiryDate} onChange={handleChange} /></div>
                <div><label className='text-sm font-medium text-gray-700 block mb-1'>Price</label>
                  <input name='price' type='number' min='0' step='0.01' className='input'
                    placeholder='0.00' value={form.price} onChange={handleChange} /></div>
                <div className='flex items-center gap-3 pt-6'>
                  <input name='inShoppingList' type='checkbox' id='shoppingList'
                    className='w-4 h-4 text-green-600' checked={form.inShoppingList} onChange={handleChange} />
                  <label htmlFor='shoppingList' className='text-sm text-gray-700'>In Shopping List</label>
                </div>
              </div>
              <div><label className='text-sm font-medium text-gray-700 block mb-1'>Notes</label>
                <textarea name='notes' rows={3} className='input resize-none'
                  value={form.notes} onChange={handleChange} /></div>
              <div className='flex gap-4 pt-2'>
                <button type='submit' disabled={loading} className='btn-primary flex-1'>
                  {loading ? 'Saving...' : 'Save Changes'}</button>
                <button type='button' onClick={()=>navigate(-1)}
                  className='flex-1 border border-gray-200 rounded-xl py-2.5 font-semibold
                  text-gray-600 hover:bg-gray-50 transition'>Cancel</button>
              </div>
            </form>
          </motion.div>
        </main>
      </div>
    </div>
  );
}