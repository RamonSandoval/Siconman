import { Center, TextInput, Button } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import Notifications from "../Notifications";
import { useForm } from "@mantine/form";
import React from "react";
import api from "../../services/api";

const ModalAddProduction = ({closeModal3}) => {
  
  async function createProduction() {
    const body = {
      data: {
        name: form.values.name,
      },
    };
    try {
      await api.addProduction(body);
      Notifications.success("Se ha agregado el area " + form.values.name + " correctamente");
      closeModal3()
    } catch (error) {
      Notifications.error("Error al crear el area, ya se encuentra registrado?");
      console.error(error);
    }
  }

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) =>
        value.length === 0 ? "Ingrese el nombre del area de produccion" : null,
    },
  });
  return (
    <form onSubmit={form.onSubmit(createProduction)}>
      <TextInput
        label="Nombre del Area"
        {...form.getInputProps("name")}
        icon={<IconPin />}
      />
      <Center pt={10}>
        <Button color="#002a5b" type="submit">
          Agregar
        </Button>
      </Center>
    </form>
  );
};

export default ModalAddProduction;
