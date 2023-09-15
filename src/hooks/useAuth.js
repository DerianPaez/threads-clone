import { useEffect, useState } from 'react'
import { apiUrl } from '../constants/url'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true)
    validateSession()
    setIsLoading(false)
  }, [])

  const register = async (data) => {
    return await fetch(`${apiUrl}/api/user/register`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('El usuario ya existe')
        }
        throw new Error('Error inesperado, vuelve a intentar mas tarde')
      }
    })
  }

  const login = (data) => {
    return fetch(`${apiUrl}/api/user/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          if (response?.status === 401) {
            throw new Error('Correo o contraseña incorrecta')
          }
          throw new Error('Error inesperado, vuelve a intentar mas tarde')
        }

        return response.json()
      })
      .then((res) => {
        const token = res?.token
        if (token) {
          localStorage.setItem('token', token)
          setIsAuthenticated(true)
          navigate('/')
        }
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setUser(null)
    navigate('/login')
  }

  const validateSession = () => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      return
    }

    setIsAuthenticated(false)
  }

  return { isAuthenticated, isLoading, user, login, logout, register }
}
