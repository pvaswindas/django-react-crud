import React from 'react'
import "./Home.css"
import { Container, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Navbar from '../Navbar/Navbar'

const HomePage = ({ user = {} }) => {
  const username = useSelector((state) => state.auth.username)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    .then(() => navigate('/login'))
  }

  return (
    <div className="home-page">
      <Navbar />
      <Container className="text-center">
        <Card className="welcome-card">
          <Card.Body>
            <h1 className="welcome-title">Welcome Home, {username}!</h1>
            <p className="welcome-subtitle my-3">We are glad to have you back.</p>
            <div className="action-buttons">
              <Button variant="danger" onClick={() => navigate('/profile')} className="action-button">Profile</Button>
              <Button variant="danger" onClick={handleLogout} className="action-button">Logout</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default HomePage
