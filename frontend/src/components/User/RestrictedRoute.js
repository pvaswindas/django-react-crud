import {jwtDecode} from 'jwt-decode'
import axiosInstance from '../../axios/axiosInstance'
import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

function RestrictedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null)
    const navigate = useNavigate()

    const refreshToken = useCallback(async () => {
        const refreshToken = localStorage.getItem('REFRESH_TOKEN')
        try {
            const res = await axiosInstance.post('/api/token/refresh/', {
                refresh: refreshToken
            })
            if (res.status === 200) {
                localStorage.setItem('ACCESS_TOKEN', res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }, [])

    const auth = useCallback(async () => {
        const token = localStorage.getItem('ACCESS_TOKEN')
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }, [refreshToken])

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [auth])

    useEffect(() => {
        if (isAuthorized === null) return
        if (isAuthorized) {
            navigate('/')
        }
    }, [isAuthorized, navigate])

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return !isAuthorized ? children : null
}

export default RestrictedRoute
