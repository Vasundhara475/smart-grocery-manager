import { NavLink } from 'react-router-dom';
import {
  FiGrid, FiList, FiAlertTriangle,
  FiShoppingBag, FiUser, FiShoppingCart,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard',     icon: FiGrid,          label: 'Dashboard' },
  { to: '/inventory',     icon: FiList,          label: 'Inventory' },
  { to: '/alerts',        icon: FiAlertTriangle, label: 'Alerts' },
  { to: '/shopping-list', icon: FiShoppingBag,   label: 'Shopping List' },
  { to: '/profile',       icon: FiUser,          label: 'Profile' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className='w-64 bg-white border-r border-gray-100 flex-col hidden md:flex'>
      {/* Logo */}
      <div className='p-6 border-b border-gray-100'>
        <div className='flex items-center gap-2'>
          <div className='w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center'>
            <FiShoppingCart className='text-white' />
          </div>
          <span className='font-bold text-gray-900 text-lg'>GroceryAI</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className='flex-1 p-4 space-y-1'>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <Icon className='text-lg' />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User info + logout */}
      <div className='p-4 border-t border-gray-100'>
        <div className='flex items-center gap-3 mb-3'>
          <img src={user?.avatar} alt='avatar' className='w-9 h-9 rounded-full' />
          <div>
            <p className='text-sm font-medium text-gray-900'>{user?.name}</p>
            <p className='text-xs text-gray-500'>{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className='w-full text-sm text-red-500 hover:text-red-700 font-medium py-1.5'
        >
          Logout
        </button>
      </div>
    </aside>
  );
}