import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAccessToken, setRefreshToken, setError, setUsername, setIsAdmin } from '../../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'
import axios from 'axios'

function AdminLogin() {
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useSelector((state) => state.auth.username)
    const error = useSelector((state) => state.auth.error)

    const loginUser = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/adminlogin/', userData)
            if (response.status === 200) {
                console.log('User logged in successfully')
                return response.data
            } else {
                throw new Error('Login failed')
            }
        } catch (error) {
            console.error('Error during login:', error.response?.data || error.message)
            throw error
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { username, password }

        try {
            const result = await loginUser(data)
            dispatch(setAccessToken(result.access))
            dispatch(setRefreshToken(result.refresh))
            localStorage.setItem('ACCESS_TOKEN', result.access)
            localStorage.setItem('REFRESH_TOKEN', result.refresh)
            dispatch(setIsAdmin(true))
            navigate('/admin')
        } catch (error) {
            dispatch(setError('Invalid Credentials!'))
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(setError(null))
        }, 5000)

        return () => clearInterval(intervalId)
    },[dispatch])

    return (
        <form className='admin-form-container' onSubmit={handleSubmit}>
            <h2 className='my-3'>Admin Login</h2>
            {error && (
                <div className="alert text-center py-2" role="alert">
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    className='admin-form-input my-2 p-2'
                    type="text"
                    value={username}
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    className='admin-form-input my-2 p-2'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button className='admin-login-button my-4 p-2' type="submit">Login</button>
        </form>
    )
}

export default AdminLogin
