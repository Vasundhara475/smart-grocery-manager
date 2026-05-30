import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function GroceryCard({ item, onDelete, index = 0 }) {
  const now       = new Date();
  const threeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  const isExpiring =
    item.expiryDate &&
    new Date(item.expiryDate) <= threeDays &&
    new Date(item.expiryDate) >= now;
  const isExpired = item.expiryDate && new Date(item.expiryDate) < now;
  const isLow     = item.quantity > 0 && item.quantity <= item.minStockLevel;
  const isOut     = item.quantity === 0;

  let badge, badgeClass;
  if (isOut)       { badge = 'Out of Stock'; badgeClass = 'badge-red'; }
  else if (isLow)  { badge = 'Low Stock';    badgeClass = 'badge-yellow'; }
  else             { badge = 'In Stock';     badgeClass = 'badge-green'; }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className='card hover:shadow-md transition-shadow group'
    >
      <div className='flex items-start justify-between mb-3'>
        <div>
          <h3 className='font-semibold text-gray-900 group-hover:text-green-600 transition'>
            {item.name}
          </h3>
          <span className='text-xs text-gray-400'>{item.category}</span>
        </div>
        <span className={badgeClass}>{badge}</span>
      </div>

      <div className='text-3xl font-bold text-gray-900 mb-2'>
        {item.quantity}
        <span className='text-sm font-normal text-gray-400 ml-1'>{item.unit}</span>
      </div>

      {isExpiring && (
        <p className='text-xs text-orange-500 font-medium mb-1'>
          ⚠ Expires: {new Date(item.expiryDate).toLocaleDateString()}
        </p>
      )}
      {isExpired && (
        <p className='text-xs text-red-500 font-medium mb-1'>✗ Expired!</p>
      )}
      {item.price > 0 && (
        <p className='text-sm text-gray-400 mb-2'>₹{item.price}</p>
      )}

      <div className='flex gap-2 pt-4 border-t border-gray-100'>
        <Link
          to={`/edit-item/${item._id}`}
          className='flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium'
        >
          <FiEdit2 size={13} /> Edit
        </Link>
        <button
          onClick={() => onDelete(item._id)}
          className='flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium ml-auto'
        >
          <FiTrash2 size={13} /> Delete
        </button>
      </div>
    </motion.div>
  );
}