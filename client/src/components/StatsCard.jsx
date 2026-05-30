import { motion } from 'framer-motion';

export default function StatsCard({ label, value, icon: Icon, colorClass, delay = 0 }) {
  return (
    <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
      transition={{ delay }} className='card hover:shadow-md transition-shadow'>
      <div className={`inline-flex p-3 rounded-xl ${colorClass} mb-3`}>
        <Icon className='text-xl' />
      </div>
      <div className='text-3xl font-bold text-gray-900'>{value}</div>
      <div className='text-sm text-gray-500 mt-1'>{label}</div>
    </motion.div>
  );
}