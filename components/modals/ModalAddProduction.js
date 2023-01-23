/* Importing the components from the libraries. */
import { Center, TextInput, Button } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import Notifications from "../Notifications";
import { useForm } from "@mantine/form";
import React from "react";
import api from "../../services/api";

/* A function that is being called in the Modal component. */
const ModalAddProduction = ({ closeModal3 }) => {
  /**
   * It takes the value of the input field, replaces the spaces with nothing, and then sends it to the
   * API.
   */
  async function createProduction() {
    const body = {
      data: {
        name: form.values.name.replace(/ /g, ""),
      },
    };
    try {
      /* Sending the data to the API. */
      await api.addProduction(body);
      Notifications.success(
        "Se ha agregado el area " + form.values.name + " correctamente"
      );
      closeModal3();
    } catch (error) {
     /* A notification that is being called in the Modal component. */
      Notifications.error(
        "Error al crear el area, ya se encuentra registrado?"
      );
      console.error(error);
    }
  }

  /* A function that is being called in the Modal component. */
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        /^\s+/.test(value) === true || value.length === 0
          ? "Ingrese el nombre del area de produccion"
          : null,
    },
  });
  /* A form that is being called in the Modal component. */
  return (
    <form onSubmit={form.onSubmit(createProduction)}>
      <TextInput
        label="Nombre del Area"
        {...form.getInputProps("name")}
        icon={<IconPin />}
      />
      <Center pt={10}>
        /* A button that is being called in the Modal component. */
        <Button
          variant="gradient"
          gradient={{ from: "#00255b", to: "#00255b", deg: 75 }}
          type="submit"
        >
          Agregar
        </Button>
      </Center>
    </form>
  );
};

export default ModalAddProduction;
