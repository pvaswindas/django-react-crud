import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../../axios/axiosInstance'
import { setAccessToken, setRefreshToken, setError, clearAuth, setUsername, setName, setEmail } from '../../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import './AuthForm.css'
import axios from 'axios'

function AuthForm({ mode }) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const username = useSelector((state) => state.auth.username)
    const email = useSelector((state) => state.auth.email)
    const name = useSelector((state) => state.auth.name)
    const error = useSelector((state) => state.auth.error)    

    const isLoginMode = mode === 'login'
    const headerName = isLoginMode ? 'Login' : 'Sign up'

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(setError(null))
        }, 5000)

        return () => clearInterval(intervalId)
    },[dispatch])

    const registerUser = async (userData) => {
        try {
            const response = await axiosInstance.post('/register/', userData)
            if (response.status === 201) {
                console.log("User Registered Successfully")
                return response.data
            } else {
                throw new Error('Registration failed')
            }
        } catch (error) {
            console.error("Error during registration:", error.response?.data || error.message)
            throw error
        }
    }

    const loginUser = async (userData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', userData)
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

        if (!isLoginMode && password !== confirmPassword) {
            dispatch(setError('Passwords do not match'))
            return
        }

        const data = { username, password, ...(isLoginMode ? {} : { name, email }) }

        try {
            if (!isLoginMode) {
                await registerUser(data)
                dispatch(clearAuth())
                navigate('/login')
            } else {
                const result = await loginUser(data)
                dispatch(setAccessToken(result.access))
                dispatch(setRefreshToken(result.refresh))
                localStorage.setItem('ACCESS_TOKEN', result.access)
                localStorage.setItem('REFRESH_TOKEN', result.refresh)
                navigate('/')
            }
        } catch (error) {
            dispatch(setError('Invalid Credentials!'))
        }
    }

    return (
        <form className='form-container' onSubmit={handleSubmit}>
            <h2 className='my-3'>{headerName}</h2>
            {error && (
                <div className="alert alert-danger text-center py-2" role="alert">
                    {error}
                </div>
            )}
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    className='form-input my-2 p-2'
                    type="text"
                    value={username}
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                    required
                />
            </div>
            {!isLoginMode && (
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        name="name"
                        className='form-input my-2 p-2'
                        type="text"
                        value={name}
                        onChange={(e) => dispatch(setName(e.target.value))}
                        required
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        className='form-input my-2 p-2'
                        type="email"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        required
                    />
                </div>
            )}
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    name="password"
                    className='form-input my-2 p-2'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {!isLoginMode && (
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        className='form-input my-2 p-2'
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
            )}
            <button className='form-button my-4 p-2' type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
        </form>
    )
}

export default AuthForm
