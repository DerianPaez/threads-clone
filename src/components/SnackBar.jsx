/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Card, CardBody } from '@nextui-org/react'
import { useSnackbarContext } from '../context/snackbar'

export default function SnackBar() {
  const { isSnackBarOpen, closeSnackBar, snackBarMessage: text, snackBarType: type } = useSnackbarContext()
  useEffect(() => {
    if (isSnackBarOpen) {
      const timer = setTimeout(() => {
        closeSnackBar()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSnackBarOpen])

  const snackBarTypes = {
    default: '',
    success: 'bg-success-500',
    danger: 'bg-danger-500'
  }

  return (
    <>
      {isSnackBarOpen && (
        <Card className={`${snackBarTypes[type]} text-white fixed top-6 right-4 min-w-[300px] z-50`}>
          <CardBody className='px-5 py-4'>{text}</CardBody>
        </Card>
      )}
    </>
  )
}
