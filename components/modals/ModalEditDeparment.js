import React from "react";
import { useEffect } from "react";
import { useForm } from "@mantine/form";
import { Button, Center, TextInput } from "@mantine/core";
import { IconId } from "@tabler/icons";
import Notifications from "../Notifications";
import api from "../../services/api";

const ModalEditDeparment = ({ departmentToEdit, closeModal }) => {
  const id_department = departmentToEdit.id;

  useEffect(() => {
    init();
  }, []);

  async function init() {}

  /**
   * It updates the department name in the database.
   */
  async function updateDepartment() {
    const body = {
      data: {
        department_name: form.values.department_name,
      },
    };
    try {
      await api.updateDepartment(id_department, body);
      Notifications.success("Se ha editado el departamento correctamente");
      closeModal();
    } catch (error) {
      console.log(error);
      Notifications.error("Error al editar el departamento");
    }
  }

  /* A form that is being submitted to the updateDepartment function. */
  const form = useForm({
    initialValues: {
      department_name: departmentToEdit.attributes.department_name,
    },
    validate: {},
  });

  /* A form that is being submitted to the updateDepartment function. */
  return (
    <form onSubmit={form.onSubmit(updateDepartment)}>
      <TextInput
        label="Departamento"
        {...form.getInputProps("department_name")}
        icon={<IconId />}
      />
      <Center pt={12}>
        <Button variant="gradient"
              gradient={{ from: "#00255b", to: "#00255b", deg: 75 }} type="submit">
          {" "}
          Aplicar{" "}
        </Button>
      </Center>
    </form>
  );
};

export default ModalEditDeparment;
