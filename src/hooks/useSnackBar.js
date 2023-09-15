import { useState } from 'react'

export const useSnackBar = () => {
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

  return { openSnackBar, isSnackBarOpen, closeSnackBar, snackBarMessage, snackBarType }
}
