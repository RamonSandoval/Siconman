import React from "react";
import { Button, TextInput, Center, Select, Radio } from "@mantine/core";
import api from "../../services/api";
import { useState, useEffect } from "react";
import {
  IconBuildingCommunity,
  IconClipboardList,
  IconId,
  IconPin,
  IconWorld,
} from "@tabler/icons";
import { useForm } from "@mantine/form";
import Notifications from "../Notifications";
const ModalAddDevice = ({ closeModal }) => {
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setarrayProd] = useState([]);
  const [activeProd, setActiveProd] = useState(true);
  const [activeDep, setActiveDep] = useState(true);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listDepartment = await api.departmentsList(1);
    setarrayDep(listDepartment.data);
    const listProd = await api.productionList(1);
    setarrayProd(listProd.data);
  }

  /**
   * It creates a device with the data from the form.
   * </code>
   */

  async function createDevice() {
    const body = {
      data: {
        device_id: form.values.device_id.replace(/ /g, ""),
        model: form.values.model.replace(/ /g, ""),
        department: form.values.department_name,
        production: form.values.name,
      },
    };

    try {
      await api.addDevice(body);
      Notifications.success("Se ha agregado el dispositivo Correctamente");
      closeModal();
      init();
    } catch (error) {
      Notifications.error("Error");
      console.error(error);
    }
  }
  const form = useForm({
    initialValues: {
      device_id: "",
      model: "",
      department_name: null,
      name: null,
    },
    validate: {
      device_id: (value) =>
        value.length === 0 ? "Ingrese el Identificador del Dispositivo" : null,
      /* department_name: (value) =>
        value.length === 0
          ? "Ingrese el departamento donde se encuentra el dispositivo"
          : null,  */
      model: (value) =>
        value.length === 0 ? "Ingrese el modelo o marca del dispositivo" : null,
    },
  });

    function departmentAdd() {
      setActiveDep(false);
      setActiveProd(true);
    }
    function productionAdd() {
      setActiveProd(false);
      setActiveDep(true);
    }

  return (
    <form onSubmit={form.onSubmit(createDevice)}>
      <TextInput
        label="ID del Dispositivo"
        placeholder="IT10XXX"
        icon={<IconId />}
        {...form.getInputProps("device_id")}
      />
      <TextInput
        label="Modelo"
        placeholder=""
        icon={<IconClipboardList />}
        {...form.getInputProps("model")}
      />

      <Center>
        <Radio.Group
          pt={12}
          label="Selecciona la ubicacion del equipo"
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
        icon={<IconBuildingCommunity />}
        disabled={activeDep}
        searchable
        {...form.getInputProps("department_name")}
        data={arrayDep.map((d) => {
          return { value: d.id, label: d.attributes.department_name };
        })}
      />

      <Select
        label="Area de Produccion"
        icon={<IconWorld />}
        disabled={activeProd}
        searchable
        {...form.getInputProps("name")}
        data={arrayProd.map((f) => {
          return { value: f.id, label: f.attributes.name };
        })}
      />

      <Center pt={20}>
        <Button color="#002a5b" type="submit">
          Agregar
        </Button>
      </Center>
    </form>
  );
};

export default ModalAddDevice;
