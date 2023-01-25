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
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setarrayProd] = useState([])
  const [activeProd, setActiveProd] = useState(true);
  const [activeDep, setActiveDep] = useState(true);
  const [depValue,setDepValue] = useState(deviceToEdit.attributes.department.data?.id)
  const [prodValue,setProdValue] = useState(deviceToEdit.attributes.production.data?.id)
  const [test1,setTest1] = useState('')

  
  useEffect(() => {
    
    init();
  }, [deviceToEdit.attributes]);

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
        model: form.values.model.replace(/ /g,''),
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
      department_name: depValue,
      model: deviceToEdit.attributes.model,
      name:  prodValue,
    },
    validate: {
      /* device_id: (value) => 
      value.length === 0 ? "Escriba el ID del Dispositivo" : null, */
    },
  });

  function departmentAdd() {
    setActiveDep(false);
    setActiveProd(true);
    setProdValue(deviceToEdit.attributes)
    
  }
  function productionAdd() {
    setActiveProd(false);
    setActiveDep(true);
    setDepValue(null)    
    
   
  }

  return (
    <>
      <form onSubmit={form.onSubmit(updateDevice)}>
        <TextInput
          disabled
          label="ID del Dispositivo"
          {...form.getInputProps("device_id")}
          icon={<IconId />}
        />
        <Center>
       
        <Radio.Group
          pt={12}
          label="Selecciona la nueva ubicacion del equipo"
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
          data={arrayDep.map((d) => {
            return { value: d.id, label: d.attributes.department_name };
          })}
        />
        <Select
        label="Area de Produccion"
        icon={<IconWorld/>}
        disabled={activeProd}
        clearable
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
