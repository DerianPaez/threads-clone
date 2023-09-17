/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Spinner } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useEffect } from 'react'
import SnackBar from '../components/SnackBar'
import { useSnackBar } from '../hooks/useSnackBar'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
  fullname: yup.string().required('Nombre requerido'),
  email: yup.string().email('Correo invalido').required('Correo requerido'),
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*+-])[a-zA-Z0-9!@#$%^&*+-]{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, un número y un caracter especial'
    )
    .required('Contraseña requerida')
})

export default function Register() {
  const { isSnackBarOpen, openSnackBar, snackBarMessage, snackBarType, closeSnackBar } = useSnackBar()
  const { register } = useAuth()
  const navigate = useNavigate()

  const {
    formState: { isDirty, isLoading, isSubmitting, isValid, isSubmitSuccessful },
    handleSubmit,
    control,
    reset,
    formState
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: ''
    },
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const onSubmit = async (data) => {
    await register(data)
      .then(() => {
        openSnackBar('Registro exitoso', 'success')
        navigate('/login')
      })
      .catch((error) => {
        openSnackBar(error.message, 'danger')
      })
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        fullname: '',
        email: '',
        password: ''
      })
    }
  }, [formState, reset])

  return (
    <div className='h-screen grid place-items-center p-4'>
      <SnackBar open={isSnackBarOpen} onClose={closeSnackBar} text={snackBarMessage} type={snackBarType} />
      <Card className='max-w-sm w-full'>
        <CardHeader className='font-bold justify-center pb-0 pt-5'>Registrar cuenta</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-2'>
            <Controller
              name='fullname'
              control={control}
              render={({ field, fieldState }) => {
                return <Input fullWidth label='Nombres' errorMessage={fieldState.error?.message} {...field} />
              }}
            />
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
              isDisabled={!isDirty || !isValid || isSubmitting || isLoading}
            >
              {!isSubmitting ? 'Registrar' : <Spinner color='white' size='sm' />}
            </Button>
          </form>
        </CardBody>
        <CardFooter className='grid grid-cols-1 gap-3 pb-5 pt-0 justify-center'>
          <Link to='' className='text-center text-secondary-text text-sm'>
            ¿Has olvidado la contraseña?
          </Link>
          <Divider />
          <Link to='/login' className='text-center text-secondary-text text-sm'>
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
