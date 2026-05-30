import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiShoppingBag, FiBarChart2, FiShoppingCart } from 'react-icons/fi';

const features = [
  { icon: FiCheckCircle,   color:'text-green-500',  title:'Smart Inventory',  desc:'Track every item with quantity, unit, and category in one place.' },
  { icon: FiAlertTriangle, color:'text-yellow-500', title:'Low Stock Alerts', desc:'Never run out — get instant alerts when stock drops below your threshold.' },
  { icon: FiShoppingBag,   color:'text-blue-500',   title:'Shopping Lists',   desc:'Auto-generate your shopping list from low-stock and out-of-stock items.' },
  { icon: FiBarChart2,     color:'text-purple-500', title:'Visual Dashboard', desc:'Bar & pie charts give you a birds-eye view of your entire pantry.' },
];

export default function Landing() {
  return (
    <div className='min-h-screen bg-white'>
      <nav className='flex items-center justify-between px-6 md:px-16 py-5 border-b border-gray-100'>
        <div className='flex items-center gap-2'>
          <div className='w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center'>
            <FiShoppingCart className='text-white' />
          </div>
          <span className='font-bold text-gray-900 text-lg'>GroceryAI</span>
        </div>
        <div className='flex items-center gap-3'>
          <Link to='/login'    className='text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2'>Sign In</Link>
          <Link to='/register' className='btn-primary text-sm'>Get Started Free</Link>
        </div>
      </nav>

      <section className='px-6 md:px-16 py-20 md:py-32 text-center max-w-4xl mx-auto'>
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
          <span className='inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6'>
            🛒 Smart Grocery Management
          </span>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6'>
            Manage Your Groceries<br/>
            <span className='text-green-600'>Like a Pro</span>
          </h1>
          <p className='text-lg text-gray-500 mb-10 max-w-2xl mx-auto'>
            Track inventory, get expiry alerts, generate shopping lists, and
            visualize your pantry — all in one beautiful dashboard.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link to='/register' className='btn-primary text-base px-8 py-3'>Start for Free →</Link>
            <Link to='/login' className='text-base px-8 py-3 border border-gray-200
              rounded-xl font-semibold text-gray-600 hover:border-green-300 hover:text-green-700 transition'>
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      <section className='px-6 md:px-16 py-16 bg-gray-50'>
        <h2 className='text-3xl font-bold text-center text-gray-900 mb-12'>Everything You Need</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition'>
              <f.icon className={`text-3xl ${f.color} mb-4`} />
              <h3 className='font-bold text-gray-900 mb-2'>{f.title}</h3>
              <p className='text-sm text-gray-500'>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className='text-center py-8 text-sm text-gray-400 border-t border-gray-100'>
        © 2025 GroceryAI — Built with MERN Stack
      </footer>
    </div>
  );
}