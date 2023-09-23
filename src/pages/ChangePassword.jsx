import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  password: yup
    .string()
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*+-])[a-zA-Z0-9!@#$%^&*+-]{8,}$/,
      'La contraseña debe tener al menos 8 caracteres, un número y un caracter especial'
    )
    .required('Contraseña requerida')
})

export default function ChangePassword() {
  const navigate = useNavigate()
  const {
    formState: { isDirty, isLoading, isSubmitting, isValid },
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      password: ''
    },
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2))
    navigate('/login')
  }

  return (
    <div className='h-screen grid place-items-center p-4'>
      <Card className='max-w-sm w-full'>
        <CardHeader className='font-bold justify-center pb-0 pt-5'>Ingresa tu nueva contraseña</CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className='grid gap-2'>
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
              {!isSubmitting ? 'Establecer nueva contraseña' : <Spinner color='white' size='sm' />}
            </Button>
          </form>
        </CardBody>
        <CardFooter className='grid grid-cols-1 gap-3 pb-5 pt-0 justify-center'>
          <Link to='/recover/verification-code' className='text-center text-secondary-text text-sm'>
            Volver
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
