import { FiBell } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ title }) {
  const { user } = useAuth();

  return (
    <header className='bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10'>
      <h1 className='text-xl font-bold text-gray-900'>{title}</h1>

      <div className='flex items-center gap-4'>
        <Link to='/alerts' className='relative p-2 rounded-xl hover:bg-gray-100'>
          <FiBell className='text-gray-600 text-xl' />
          <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full' />
        </Link>
        <Link to='/profile'>
          <img
            src={user?.avatar}
            alt='avatar'
            className='w-9 h-9 rounded-full ring-2 ring-green-200 hover:ring-green-400 transition'
          />
        </Link>
      </div>
    </header>
  );
}