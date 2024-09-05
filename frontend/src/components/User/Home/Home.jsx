import React from 'react'
import "./Home.css"
import { Container, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { clearAuth } from '../../../features/auth/authSlice'
import axiosInstance from '../../../axios/axiosInstance'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const HomePage = ({ user = {} }) => {
  const username = useSelector((state) => state.auth.username)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutUser = async () => {
    try {
        const refresh_token = localStorage.getItem('REFRESH_TOKEN');
        await axiosInstance.post('/logout/', { refresh_token });
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        dispatch(clearAuth());
        console.log("User logged out");
        navigate('/login');
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

  return (
    <div className="home-page">
      <Container className="text-center">
        <Card className="welcome-card">
          <Card.Body>
            <h1 className="welcome-title">Welcome Home, {username}!</h1>
            <p className="welcome-subtitle my-3">We are glad to have you back.</p>
            <div className="action-buttons">
              <Button variant="danger" onClick={() => navigate('/profile')} className="action-button">Profile</Button>
              <Button variant="danger" onClick={logoutUser} className="action-button">Logout</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default HomePage
