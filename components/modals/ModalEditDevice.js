import React from "react";
import { Button, TextInput, Center, Select } from "@mantine/core";
import { IconClipboardList, IconId, IconPin, IconWorld } from "@tabler/icons";
import api from "../../services/api";
import { useForm } from "@mantine/form";
import Notifications from "../Notifications";
import { useState, useEffect } from "react";

const ModalEditDevice = ({ deviceToEdit, closeModal2 }) => {
  const id_edit = deviceToEdit.id;
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setarrayProd] = useState([])


  
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listDepartment = await api.departmentsList(1);
    setarrayDep(listDepartment.data);
    const listProd = await api.productionList(1)
    setarrayProd(listProd.data)
  }

  async function updateDevice() {
    const body = {
      data: {
        device_id: form.values.device_id,
        department: form.values.department_name,
        model: form.values.model,
        production: form.values.name
      },
    };

    try {
      await api.updateDevice(id_edit, body);
      Notifications.success("Se ha editado el dispositivo correcatamente");
      closeModal2();
      init();
    } catch (error) {
      Notifications.error("Error al editar el dispositivo");
      console.log(error);
    }
  }

  const form = useForm({
    initialValues: {
      device_id: deviceToEdit.attributes.device_id,
      department_name:
      deviceToEdit.attributes?.department?.data?.id,
      model: deviceToEdit.attributes.model,
      name: deviceToEdit.attributes?.production?.data?.id
    },
    validate: {
      /* device_id: (value) => 
      value.length === 0 ? "Escriba el ID del Dispositivo" : null, */
    },
  });

  return (
    <>
      <form onSubmit={form.onSubmit(updateDevice)}>
        <TextInput
          disabled
          label="ID del Dispositivo"
          {...form.getInputProps("device_id")}
          icon={<IconId />}
        />

        <Select
          label="Departamento / Area"
          icon={<IconPin />}
          searchable
          {...form.getInputProps("department_name")}
          //data={departmentsListSelect}
          data={arrayDep.map((d) => {
            return { value: d.id, label: d.attributes.department_name };
          })}
        />
      <Select
      label="Area de Produccion"
      icon={<IconWorld/>}
      searchable
      {...form.getInputProps("name")}
      data={arrayProd.map((f) => {
        return { value: f.id, label: f.attributes.name }})}
      /> 
        <TextInput
          pb={20}
          label="Modelo"
          {...form.getInputProps("model")}
          icon={<IconClipboardList />}
        />
        <Center>
          <Button color="#002a5b" type="submit">
            {" "}
            Aplicar{" "}
          </Button>
        </Center>
      </form>
    </>
  );
};

export default ModalEditDevice;
