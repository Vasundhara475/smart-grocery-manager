import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className='relative flex-1'>
      <FiSearch className='absolute left-3 top-3 text-gray-400' />
      <input
        className='input pl-10 pr-10'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
        >
          <FiX />
        </button>
      )}
    </div>
  );
}