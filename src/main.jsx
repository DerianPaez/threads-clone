import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import LayoutSpiral from './components/LayoutSpiral'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import VerificationCode from './pages/VerificationCode'
import Root from './pages/Root'
import { SnackbarProvider } from './context/snackbar'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  },
  {
    element: <LayoutSpiral />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/reset-password',
        element: <ResetPassword />
      },
      {
        path: '/verification-code',
        element: <VerificationCode />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
      <RouterProvider router={router} />
    </SnackbarProvider>
  </React.StrictMode>
)
