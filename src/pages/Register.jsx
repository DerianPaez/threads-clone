import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4, "Mínimo 8 caracteres").required(),
});

export default function Register() {
  const {
    formState: { isDirty, isLoading, isSubmitting, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) =>
    alert(
      `Hay que encriptar la contraseña antes de enviarla \n\n${JSON.stringify(
        data,
        null,
        2
      )}`
    );

  return (
    <div className="h-screen grid place-items-center p-4">
      <Card className="max-w-sm w-full">
        <CardHeader className="font-bold justify-center pb-0 pt-5">
          Registrar cuenta
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
            <Controller
              name="fullname"
              control={control}
              render={({ field }) => {
                return <Input fullWidth label="Nombres" {...field} />;
              }}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return (
                  <Input fullWidth label="Correo electrónico" {...field} />
                );
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => {
                return (
                  <Input
                    fullWidth
                    label="Contraseña"
                    type="password"
                    {...field}
                  />
                );
              }}
            />
            <Button
              fullWidth
              type="submit"
              color="primary"
              isLoading={isLoading}
              isDisabled={!isDirty || !isValid || isSubmitting || isLoading}
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardBody>
        <CardFooter className="grid grid-cols-1 gap-3 pb-5 pt-0 justify-center">
          <Link to="" className="text-center text-secondary-text text-sm">
            ¿Has olvidado la contraseña?
          </Link>
          <Divider />
          <Link to="/login" className="text-center text-secondary-text text-sm">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
