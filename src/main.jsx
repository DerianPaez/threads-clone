import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import LayoutSpiral from './components/LayoutSpiral'
import Register from './pages/Register'
import RecoverInit from './pages/RecoverInit'
import VerificationCode from './pages/VerificationCode'
import Root from './pages/Root'
import SnackbarProvider from './context/snackbar'
import ChangePassword from './pages/ChangePassword'
import RecoverLayout from './components/RecoverLayout'

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
        path: '/recover',
        element: <RecoverLayout />,
        children: [
          {
            index: true,
            path: 'init',
            element: <RecoverInit />
          },
          {
            path: 'verification-code',
            element: <VerificationCode />
          },
          {
            path: 'change-password',
            element: <ChangePassword />
          }
        ]
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
