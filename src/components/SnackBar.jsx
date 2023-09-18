/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Card, CardBody } from '@nextui-org/react'

export default function SnackBar({ open, onClose, type, text }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [open])

  const snackBarTypes = {
    default: '',
    success: 'bg-success-500',
    danger: 'bg-danger-500'
  }

  return (
    <>
      {open && (
        <Card className={`${snackBarTypes[type]} text-white fixed top-6 right-4 min-w-[300px] z-50`}>
          <CardBody className='px-5 py-4'>{text}</CardBody>
        </Card>
      )}
    </>
  )
}
