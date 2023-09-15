import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import SnackBar from '../components/SnackBar'
import { useAuth } from '../hooks/useAuth'
import { useSnackBar } from '../hooks/useSnackBar'

const schema = yup.object().shape({
  email: yup.string().email('Correo invalido').required('Correo requerido'),
  password: yup.string().required('Contraseña requerida')
})

export default function Login() {
  const { isSnackBarOpen, openSnackBar, snackBarMessage, snackBarType, closeSnackBar } = useSnackBar()
  const { login } = useAuth()

  const {
    formState: { isDirty, isLoading, isSubmitting, isValid, isSubmitSuccessful },
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const onSubmit = (data) => {
    login(data).catch((error) => {
      openSnackBar(error.message, 'danger')
    })
  }

  return (
    <div className='h-screen grid place-items-center p-4'>
      <SnackBar open={isSnackBarOpen} onClose={closeSnackBar} text={snackBarMessage} type={snackBarType} />
      <Card className='max-w-sm w-full'>
        <CardHeader className='font-bold justify-center pb-0 pt-5'>Iniciar sesión</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-2'>
            <Controller
              name='email'
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Input fullWidth label='Correo electrónico' errorMessage={fieldState.error?.message} {...field} />
                )
              }}
            />
            <Controller
              name='password'
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    fullWidth
                    label='Contraseña'
                    type='password'
                    errorMessage={fieldState.error?.message}
                    {...field}
                  />
                )
              }}
            />
            <Button
              fullWidth
              type='submit'
              color='primary'
              isLoading={isLoading}
              isDisabled={!isDirty || !isValid || isSubmitting || isLoading || isSubmitSuccessful}
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardBody>
        <CardFooter className='grid grid-cols-1 gap-3 pb-5 pt-0 justify-center'>
          <Link to='/reset-password' className='text-center text-secondary-text text-sm'>
            ¿Has olvidado la contraseña?
          </Link>
          <Divider />
          <Link to='/register' className='text-center text-secondary-text text-sm'>
            ¿No tienes una cuenta? Regístrate
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
