/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import SnackBar from '../components/SnackBar'

const SnackbarContext = createContext()

export default function SnackbarProvider({ children }) {
  const [isSnackBarOpen, setSnackBarOpen] = useState()
  const [snackBarMessage, setSnackBarMessage] = useState()
  const [snackBarType, setSnackBarType] = useState()

  const openSnackBar = (message, type) => {
    setSnackBarMessage(message)
    setSnackBarType(type)
    setSnackBarOpen(true)
  }

  const closeSnackBar = () => {
    setSnackBarOpen(false)
  }

  return (
    <SnackbarContext.Provider
      value={{
        isSnackBarOpen,
        setSnackBarOpen,
        snackBarMessage,
        setSnackBarMessage,
        snackBarType,
        setSnackBarType,
        openSnackBar,
        closeSnackBar
      }}
    >
      <SnackBar open={isSnackBarOpen} onClose={closeSnackBar} type={snackBarType} text={snackBarMessage} />
      {children}
    </SnackbarContext.Provider>
  )
}

export function useSnackbarContext() {
  const context = useContext(SnackbarContext)
  if (!context) {
    throw new Error('useSnackBar must be used within a SnackBarProvider')
  }
  return context
}
