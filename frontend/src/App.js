import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/User/Home/Home';
import { LoginPage, RegisterPage } from './components/User/LoginAndRegister';
import ProtectedRoute from './components/User/ProtectedRoutes';
import RestrictedRoute from './components/User/RestrictedRoute';
import AdminOnlyRoutes from './components/Admin/RoutesAccess/AdminOnlyRoutes';
import UserProfile from './components/User/UserProfile/UserProfile';
import EditProfile from './components/User/EditProfile/EditProfile';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminHome from './components/Admin/AdminHome/AdminHome';
import AddUser from './components/Admin/AddUser/AddUser';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<RestrictedRoute><LoginPage /></RestrictedRoute>} />
          <Route path='/register' element={<RestrictedRoute><RegisterPage /></RestrictedRoute>} />
          <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path='/editprofile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />

          <Route path='/admin/login' element={<RestrictedRoute><AdminLogin /></RestrictedRoute>} />
          <Route path='/admin' element={<AdminOnlyRoutes><AdminHome /></AdminOnlyRoutes>} />
          <Route path='/admin/add-user' element={<AdminOnlyRoutes><AddUser /></AdminOnlyRoutes>} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
