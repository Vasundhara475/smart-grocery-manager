import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
         CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiPackage, FiAlertTriangle, FiClock, FiShoppingBag } from 'react-icons/fi';
import { getStats } from '../services/groceryService';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const COLORS = ['#16a34a','#2563eb','#ea580c','#7c3aed','#d97706','#dc2626'];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats().then(({ data }) => { setStats(data); setLoading(false); })
    .catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label:'Total Items',   value:stats?.total||0,          icon:FiPackage,       color:'bg-blue-50 text-blue-600' },
    { label:'Low Stock',     value:stats?.lowStock||0,       icon:FiAlertTriangle, color:'bg-red-50 text-red-600' },
    { label:'Expiring Soon', value:stats?.expiringSoon||0,   icon:FiClock,         color:'bg-yellow-50 text-yellow-600' },
    { label:'Shopping List', value:stats?.inShoppingList||0, icon:FiShoppingBag,   color:'bg-green-50 text-green-600' },
  ];

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar title='Dashboard' />
        <main className='flex-1 overflow-y-auto p-6'>

          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            {statCards.map((s, i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.1 }}
                className='card hover:shadow-md transition-shadow'>
                <div className={`inline-flex p-3 rounded-xl ${s.color} mb-3`}>
                  <s.icon className='text-xl' />
                </div>
                <div className='text-3xl font-bold text-gray-900'>{s.value}</div>
                <div className='text-sm text-gray-500 mt-1'>{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='card'>
              <h3 className='font-semibold text-gray-800 mb-4'>Items by Category</h3>
              <ResponsiveContainer width='100%' height={240}>
                <BarChart data={stats?.byCategory?.map(c => ({ name: c._id, count: c.count }))}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey='count' fill='#16a34a' radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className='card'>
              <h3 className='font-semibold text-gray-800 mb-4'>Category Distribution</h3>
              <ResponsiveContainer width='100%' height={240}>
                <PieChart>
                  <Pie data={stats?.byCategory?.map(c => ({ name: c._id, value: c.count }))}
                    cx='50%' cy='50%' outerRadius={90} label>
                    {stats?.byCategory?.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}