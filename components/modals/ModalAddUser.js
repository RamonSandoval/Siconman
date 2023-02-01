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
       password: form.values.password
      },
    };

    try {
     /* Calling the api.addDevice function, which is an asynchronous function. It is waiting for the
     function to finish, and then it is calling the Notifications.success function, which is a
     function that displays a notification. Then it is calling the closeModal function, which is a
     function that closes the modal. Finally, it is calling the init function, which is a function
     that gets the list of departments and the list of productions from the API, and stores them in
     the state variables arrayDep and arrayProd. */
      await api.addUser(body);
      Notifications.success("Se ha creado un nuevo usuario");
    } catch (error) {
      Notifications.error("Error");
      console.error(error);
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
