import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import SnackBar from '../components/SnackBar'
import { useState } from 'react'

const schema = yup.object().shape({
  otp: yup.string().min(5, 'Completa todos los campos').max(5, 'Completa todos los campos').required()
})

export default function VerificationCode() {
  const [isSnackBarOpen, setSnackBarOpen] = useState()
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { isDirty, isLoading, isValid, isSubmitting }
  } = useForm({
    defaultValues: {
      otp: ''
    },
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2))
    setSnackBarOpen(true)
    navigate('/recover/change-password')
  }

  return (
    <div className='h-screen grid place-items-center p-4'>
      <SnackBar open={isSnackBarOpen} setOpen={setSnackBarOpen} text='Verificación Exitosa' type='success' />
      <Card className='max-w-sm w-full'>
        <CardHeader className='font-bold justify-center pb-0 pt-5'>Código de verificación</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-2'>
            <Controller
              name='otp'
              control={control}
              render={({ field }) => {
                return (
                  <OTPInput
                    name='otp'
                    value={field.value}
                    onChange={field.onChange}
                    numInputs={5}
                    renderSeparator={<span className='mx-2'>-</span>}
                    renderInput={(props) => <Input {...props} />}
                  />
                )
              }}
            />
            <Button
              fullWidth
              type='submit'
              color='primary'
              isLoading={isLoading}
              isDisabled={!isDirty || !isValid || isSubmitting || isLoading}
            >
              Confirmar
            </Button>
          </form>
        </CardBody>
        <CardFooter className='grid grid-cols-1 gap-3 pb-5 pt-0 justify-center'>
          <Link to='/recover/init' className='text-center text-secondary-text text-sm'>
            Volver
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
