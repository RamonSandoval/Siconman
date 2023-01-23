import { Center, TextInput, Button } from "@mantine/core";
import { IconPin } from "@tabler/icons";
import Notifications from "../Notifications";
import { useForm } from "@mantine/form";
import React from "react";
import api from "../../services/api";

const ModalAddDepartment = ({closeModal2}) => {
  
  async function createDepartment() {
    const body = {
      data: {
        department_name: form.values.department_name.replace(/ /g,''),
      },
    };
    try {
      await api.addDepartment(body);
      Notifications.success("Se ha agregado el departamento Correctamente");
      closeModal2();
    } catch (error) {
      Notifications.error("El departamento ya se encuentra registrado");
      console.error(error);
    }
  }

  const form = useForm({
    initialValues: {
      department_name: "",
    },
    validate: {
      department_name: (value) =>
        value.length === 0 ? "Ingrese el nombre del departamento" : null,
    },
  });
  return (
    <form onSubmit={form.onSubmit(createDepartment)}>
      <TextInput
        label="Nombre del Departamento"
        {...form.getInputProps("department_name")}
        icon={<IconPin />}
      />
      <Center pt={10}>
        <Button variant="gradient" gradient={{ from: '#00255b', to: '#00255b', deg:75 }} type="submit">
          Agregar
        </Button>
      </Center>
    </form>
  );
};

export default ModalAddDepartment;
