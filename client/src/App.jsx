import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Landing     from './pages/Landing';
import Login       from './pages/Login';
import Register    from './pages/Register';
import Dashboard   from './pages/Dashboard';
import Inventory   from './pages/Inventory';
import AddItem     from './pages/AddItem';
import EditItem    from './pages/EditItem';
import ShoppingList from './pages/ShoppingList';
import Alerts      from './pages/Alerts';
import Profile     from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position='top-right' />
        <Routes>
          {/* Public */}
          <Route path='/'         element={<Landing />} />
          <Route path='/login'    element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* Protected */}
          <Route path='/dashboard' element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/inventory' element={
            <ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path='/add-item' element={
            <ProtectedRoute><AddItem /></ProtectedRoute>} />
          <Route path='/edit-item/:id' element={
            <ProtectedRoute><EditItem /></ProtectedRoute>} />
          <Route path='/shopping-list' element={
            <ProtectedRoute><ShoppingList /></ProtectedRoute>} />
          <Route path='/alerts' element={
            <ProtectedRoute><Alerts /></ProtectedRoute>} />
          <Route path='/profile' element={
            <ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;