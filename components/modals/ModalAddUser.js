import {
  Button,
  Center,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";
import api from "../../services/api";
import Notifications from "../Notifications";

const ModalAddUser = () => {
  async function createUser() {
    const body = {
      data: {
        username: form.values.username,
        email: form.values.email,
        password: form.values.password,
      },
    };
    try {
      await api.addUser(body);
      Notifications.success("Se ha creado al usuario correctamente ");
    } catch (error) {
      Notifications.error("Error al crear el usuaro");
      console.log(error)
    }
  }

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
      confirmed: "true",
      blocked: "false",
    }
  });
  return (
    <form onSubmit={form.onSubmit(createUser)}>
      <TextInput label="Usuario" {...form.getInputProps("username")} />
      <TextInput label="Correo" {...form.getInputProps("email")} />
      <PasswordInput label="Contraseña" {...form.getInputProps("password")} />
      
      <Center pt={10}>
        <Button type="submit"> Agregar{""}</Button>
      </Center>
    </form>
  );
};

export default ModalAddUser;
