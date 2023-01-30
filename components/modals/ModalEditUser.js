import { Button, Center, Select, TextInput } from "@mantine/core";
import React, { useState } from "react";

import { useForm } from "@mantine/form";
import api from "../../services/api";
import Notifications from "../Notifications";

const ModalEditUser = ({ userToEdit }) => {
  var blockedTextNew = "";
  var confirmedTextNew = "";

  const id_user = userToEdit.id;

  /* It's a condition that checks if the user is blocked or not. */
  if (userToEdit.blocked.toString() === "false") {
    blockedTextNew = "No";
  } else {
    blockedTextNew = "Si";
  }

  /* It's a condition that checks if the user is active or not. */
  if (userToEdit.confirmed.toString() == "true") {
    confirmedTextNew = "Activo";
  } else {
    confirmedTextNew = "Inactivo";
  }

  /**
   * It's an async function that takes the values from the form and sends them to the API.
   * </code>
   */
  async function updateUser() {
    const body = {
      data: {
        username: form.values.username,
        email: form.values.email,
       /*  blocked: form.values.blocked,
        confirmed: form.values.confirmed,  */
      },
    };
    try {
      await api.updateUser(id_user, body);
      Notifications.success('Se ha edito al usuario correctamente')
    } catch (error) {
      Notifications.error('Error al editar al usuario')
    }
  }

  /* Creating a form with the initial values of the user that is being edited. */
  const form = useForm({
    initialValues: {
      username: userToEdit.username,
      email: userToEdit.email,
      /* blocked: blockedTextNew,
      confirmed: confirmedTextNew, */
    },
    validate: {},
  });

  const user_edit = userToEdit.id;
 /* A form that is being created. */
  return (
    <form onSubmit={form.onSubmit(updateUser)}>
      <TextInput label="Usuario" {...form.getInputProps("username")} />
      <TextInput label="Correo" {...form.getInputProps("email")} />
      <TextInput label="Permisos" />
      <TextInput label="Estatus" {...form.getInputProps("confirmed")} />
      <TextInput label="Bloqueado" {...form.getInputProps("blocked")} />

      <Center pt={10}>
        <Button type="submit"> Aplicar{""}</Button>
      </Center>
    </form>
  );
};

export default ModalEditUser;
