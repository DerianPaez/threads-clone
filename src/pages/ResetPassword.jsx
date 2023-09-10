import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

export default function ResetPassword() {
  const navigate = useNavigate()

  const {
    formState: { isDirty, isLoading, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2))
    navigate('/verification-code')
  }

  return (
    <div className="h-screen grid place-items-center p-4">
      <Card className="max-w-sm w-full">
        <CardHeader className="font-bold justify-center pb-0 pt-5">
          ¿Tienes problemas para iniciar sesión?
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return <Input fullWidth label="Correo electrónico" {...field} />
              }}
            />
            <Button
              fullWidth
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={!isDirty || !isValid || isSubmitting || isLoading}
            >
              Enviar código de verificación
            </Button>
          </form>
        </CardBody>
        <CardFooter className="grid grid-cols-1 gap-3 pb-5 pt-0 justify-center">
          <Link to="/login" className="text-center text-secondary-text text-sm">
            Inicia sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
