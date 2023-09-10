/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Card, CardBody } from '@nextui-org/react'

export default function SnackBar({ text, open, setOpen, type }) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setOpen(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [open])

  const snackBarTypes = {
    default: '',
    success: 'bg-success-300',
    danger: 'bg-danger-300'
  }

  return (
    <>
      {open && (
        <Card className={`${snackBarTypes[type]} fixed top-6 right-4 min-w-[300px]`}>
          <CardBody className='px-5 py-4'>{text}</CardBody>
        </Card>
      )}
    </>
  )
}
