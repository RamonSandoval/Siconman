import React from "react";
import { Button, TextInput, Center, Select, Radio, Text } from "@mantine/core";
import { IconClipboardList, IconId, IconPin, IconWorld } from "@tabler/icons";
import api from "../../services/api";
import { useForm } from "@mantine/form";
import Notifications from "../Notifications";
import { useState, useEffect } from "react";
import { useSetState } from "@mantine/hooks";

const ModalEditDevice = ({ deviceToEdit, closeModal2 }) => {
  const id_edit = deviceToEdit.id;
  const pcEdit = deviceToEdit.attributes.device_id
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setarrayProd] = useState([]);
  const [activeProd, setActiveProd] = useState(true);
  const [activeDep, setActiveDep] = useState(true);
  const [depValue, setDepValue] = useState(
    deviceToEdit.attributes.department.data?.id
  );
  const [prodValue, setProdValue] = useState(
    deviceToEdit.attributes.production.data?.id
  );

  useEffect(() => {
    init();
  }, [deviceToEdit.attributes]);

  /**
   * When the page loads, get the list of departments and the list of productions from the API, and
   * then set the state of the arrayDep and arrayProd variables to the data returned from the API.
   */
  async function init() {
    const listDepartment = await api.departmentsList();
    setarrayDep(listDepartment.data);
    const listProd = await api.productionList();
    setarrayProd(listProd.data);
  }

  /**
   * It takes the values from the form and sends them to the API to update the device.
   * </code>
   */
  async function updateDevice() {
    const body = {
      data: {
        device_id: form.values.device_id,
        department: form.values.department_name,
        model: form.values.model.replace(/ /g, ""),
        production: form.values.name,
      },
    };

    try {
      await api.updateDevice(id_edit, body);
      Notifications.success("Se ha editado el equipo " +pcEdit+" correcatamente ");
      closeModal2();
      init();
    } catch (error) {
      Notifications.error("Error al editar el equipo");
      console.log(error);
    }
  }

  /* A form that is being created with the initial values of the device to be edited. */
  const form = useForm({
    initialValues: {
      device_id: deviceToEdit.attributes.device_id,
      department_name: depValue,
      model: deviceToEdit.attributes.model,
      name: prodValue,
    },
    validate: {
      /* device_id: (value) => 
      value.length === 0 ? "Escriba el ID del Dispositivo" : null, */
    },
  });

  function departmentAdd() {
    setActiveDep(false);
    setActiveProd(true);
    setProdValue(deviceToEdit.attributes);
  }
  /**
   * If the user clicks the add button, the production input field is disabled, the department input
   * field is enabled, and the department input field is cleared.
   */
  function productionAdd() {
    setActiveProd(false);
    setActiveDep(true);
    setDepValue(null);
  }

  function compare_nameDep(a, b) {
    if (
      a.attributes.department_name.toLowerCase() <
      b.attributes.department_name.toLowerCase()
    ) {
      return -1;
    }
    if (
      a.attributes.department_name.toLowerCase() >
      b.attributes.department_name.toLowerCase()
    ) {
      return 1;
    }
    return 0;
  }

  function compare_nameProd(a, b) {
    if (a.attributes.name.toLowerCase() < b.attributes.name.toLowerCase()) {
      return -1;
    }
    if (a.attributes.name.toLowerCase() > b.attributes.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  /* Returning a form with a submit button. */
  return (
    <>
      <form onSubmit={form.onSubmit(updateDevice)}>
        <TextInput
          disabled
          label="ID del Equipo"
          {...form.getInputProps("device_id")}
          icon={<IconId />}
        />
        <TextInput
          pb={20}
          label="Modelo"
          {...form.getInputProps("model")}
          icon={<IconClipboardList />}
        />
        <Center>
          <Radio.Group
            pt={12}
            label="Seleccione la nueva ubicacion del equipo"
            {...form.getInputProps("user_request".valueOf(Radio))}
          >
            <Radio
              onClick={() => departmentAdd()}
              value="yes"
              label="Departamento"
            />
            <Radio
              onClick={() => productionAdd()}
              value="no"
              label="Produccion"
            />
          </Radio.Group>
        </Center>
        <Select
          label="Departamento / Area"
          icon={<IconPin />}
          disabled={activeDep}
          clearable
          searchable
          {...form.getInputProps("department_name")}
          //data={departmentsListSelect}
          data={arrayDep.sort(compare_nameDep)&&arrayDep.map((d) => {
            return { value: d.id, label: d.attributes.department_name };
          })}
        />
        <Select
          label="Area de Produccion"
          icon={<IconWorld />}
          disabled={activeProd}
          clearable
          searchable
          {...form.getInputProps("name")}
          data={arrayProd.sort(compare_nameProd)&&arrayProd.map((f) => {
            return { value: f.id, label: f.attributes.name };
          })}
        />
        
        <Center pt={15}>
          <Button variant="gradient"
              gradient={{ from: "#00255b", to: "#00255b", deg: 75 }}type="submit"
          
          >
            {" "}
            Aplicar{" "}
          </Button>
        </Center>
      </form>
    </>
  );
};

export default ModalEditDevice;
