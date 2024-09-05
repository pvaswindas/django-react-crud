import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/User/Home/Home';
import { LoginPage, RegisterPage } from './components/User/LoginAndRegister';
import ProtectedRoute from './components/User/ProtectedRoutes';
import RestrictedRoute from './components/User/RestrictedRoute';
import './App.css'
import UserProfile from './components/User/UserProfile/UserProfile';
import EditProfile from './components/User/EditProfile/EditProfile';

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
        </Routes>
      </Router>
    </div>

  );
}

export default App;
