/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

export const SnackbarContext = createContext()

export function SnackbarProvider({ children }) {
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
      {children}
    </SnackbarContext.Provider>
  )
}

export function useSnackbarContext() {
  const context = useContext()
  if (!context) {
    throw new Error('useSnackBar must be used within a SnackBarProvider')
  }
  return context
}
