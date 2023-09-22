import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().email('Correo invalido').required('Correo requerido')
})

export default function RecoverInit() {
  const navigate = useNavigate()

  const {
    formState: { isDirty, isLoading, isSubmitting, isValid },
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(schema),
    mode: 'all'
  })

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2))
    navigate('/recover/verification-code')
  }

  return (
    <div className='h-screen grid place-items-center p-4'>
      <Card className='max-w-sm w-full'>
        <CardHeader className='font-bold justify-center pb-0 pt-5'>¿Tienes problemas para iniciar sesión?</CardHeader>
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
            <Button
              fullWidth
              type='submit'
              color='primary'
              isLoading={isLoading}
              isDisabled={!isDirty || !isValid || isSubmitting || isLoading}
            >
              Enviar código de verificación
            </Button>
          </form>
        </CardBody>
        <CardFooter className='grid grid-cols-1 gap-3 pb-5 pt-0 justify-center'>
          <Link to='/login' className='text-center text-secondary-text text-sm'>
            Inicia sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
