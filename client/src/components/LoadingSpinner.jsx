export default function LoadingSpinner({ size = 'md', color = 'green' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className='flex items-center justify-center'>
      <div
        className={`${sizes[size]} border-${color}-500 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
}