import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../axios/axiosInstance';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

function AddUser() {
    const [newUser, setNewUser] = useState({ username: '', name: '', email: '', password: '' });
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const error = useSelector((state) => state.auth.error);

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(setError(null))
        }, 5000)

        return () => clearInterval(intervalId)
    },[dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newUser.password !== confirmPassword) {
                throw new Error('Passwords do not match');
            } else {
                const response = await axiosInstance.post('/register/', newUser);
                if (response.status === 201) {
                    console.log("User Registered Successfully");
                    setNewUser({ username: '', name: '', email: '', password: '' });
                    setConfirmPassword('');
                    navigate('/admin');
                } else {
                    throw new Error('Registration failed');
                }
            }
        } catch (error) {
            console.error('Error creating new user:', error);
            dispatch(setError(error.message));
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Add New User</h3>
            
            {/* Display Bootstrap Alert if there is an error */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        id="username"
                        type="text"
                        className="form-control"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        id="password"
                        type="password"
                        className="form-control"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary">Add User</button>
                </div>
            </form>
        </div>
    );
}

export default AddUser;
