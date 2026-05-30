import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiUser, FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

// Reusable Input Field Component
function Field({
  name,
  label,
  type = 'text',
  icon: Icon,
  placeholder,
  value,
  error,
  onChange
}) {
  return (
    <div>
      <label className='text-sm font-medium text-gray-700 block mb-1'>
        {label}
      </label>

      <div className='relative'>
        <Icon className='absolute left-3 top-3.5 text-gray-400' />

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`input pl-10 ${error ? 'border-red-400' : ''}`}
          value={value}
          onChange={onChange}
        />
      </div>

      {error && (
        <p className='text-xs text-red-500 mt-1'>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [errors, setErrors] = useState({});

  const { register, loading } = useAuth();

  const navigate = useNavigate();

  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = 'Name is required';
    }

    if (!form.email.includes('@')) {
      e.email = 'Enter a valid email';
    }

    if (form.password.length < 6) {
      e.password = 'Password must be 6+ characters';
    }

    if (form.password !== form.confirm) {
      e.confirm = 'Passwords do not match';
    }

    return e;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const result = await register(
      form.name,
      form.email,
      form.password
    );

    if (result.success) {
      toast.success('Account created! Welcome 🎉');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md'
      >
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4'>
            <FiShoppingCart className='text-green-600 text-3xl' />
          </div>

          <h1 className='text-2xl font-bold text-gray-900'>
            Create your account
          </h1>

          <p className='text-gray-500 mt-1'>
            Start managing your grocery inventory
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <Field
            name='name'
            label='Full Name'
            icon={FiUser}
            placeholder='John Doe'
            value={form.name}
            error={errors.name}
            onChange={handleChange}
          />

          <Field
            name='email'
            label='Email'
            icon={FiMail}
            placeholder='you@example.com'
            value={form.email}
            error={errors.email}
            onChange={handleChange}
          />

          <Field
            name='password'
            label='Password'
            type='password'
            icon={FiLock}
            placeholder='Min 6 characters'
            value={form.password}
            error={errors.password}
            onChange={handleChange}
          />

          <Field
            name='confirm'
            label='Confirm Password'
            type='password'
            icon={FiLock}
            placeholder='Repeat password'
            value={form.confirm}
            error={errors.confirm}
            onChange={handleChange}
          />

          <button
            type='submit'
            disabled={loading}
            className='btn-primary w-full mt-2'
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          Already have an account?{' '}

          <Link
            to='/login'
            className='text-green-600 font-semibold hover:underline'
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}