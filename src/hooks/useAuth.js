/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { apiUrl } from '../constants/url'
import { useNavigate } from 'react-router-dom'
import { useSnackbarContext } from '../context/snackbar'

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState()
  const navigate = useNavigate()
  const { openSnackBar } = useSnackbarContext()

  useEffect(() => {
    validateSession()
      .then((res) => {
        if (res) {
          const isValid = res.valid
          setIsAuthenticated(isValid)
        }
      })
      .catch((error) => {
        openSnackBar(error.message, 'danger')
        localStorage.removeItem('token')
        navigate('/login')
      })
      .finally(() => {
        setIsLoading(false)
      })
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

  const validateSession = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      return await fetch(`${apiUrl}/api/user/validate-token`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      }).then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('La sesión ha expirado, vuelve a iniciar sesión')
          }
          throw new Error('Error inesperado, vuelve a intentar mas tarde')
        }
        return response.json()
      })
    }
    return false
  }

  return { isAuthenticated, isLoading, user, login, logout, register }
}
