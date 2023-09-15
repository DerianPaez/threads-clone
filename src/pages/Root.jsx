import { Button } from '@nextui-org/react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
export default function Root() {
  const { isLoading, isAuthenticated, logout } = useAuth()

  if (isLoading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return (
    <main>
      <h1 className='text-6xl text-primary'>Threads App</h1>
      <Button onClick={logout}>Logout</Button>
    </main>
  )
}
