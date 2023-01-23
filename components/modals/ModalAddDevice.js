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

/* A function that receives a parameter called closeModal. */
const ModalAddDevice = ({ closeModal }) => {
  /* A state. */
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setarrayProd] = useState([]);
  const [activeProd, setActiveProd] = useState(true);
  const [activeDep, setActiveDep] = useState(true);

  /* A hook that is called when the component is mounted. */
  useEffect(() => {
    init();
  }, []);

  /**
   * When the page loads, get the list of departments and the list of productions from the API, and
   * store them in the state variables arrayDep and arrayProd.
   */
  async function init() {
    const listDepartment = await api.departmentsList(1);
    setarrayDep(listDepartment.data);
    const listProd = await api.productionList(1);
    setarrayProd(listProd.data);
  }

  /**
   * It creates a device.
   * </code>
   */
  async function createDevice() {
    const body = {
      data: {
        /* Replacing the spaces in the values of the form with nothing. */
        device_id: form.values.device_id.replace(/ /g, ""),
        model: form.values.model.replace(/ /g, ""),
        department: form.values.department_name,
        production: form.values.name,
      },
    };

    try {
     /* Calling the api.addDevice function, which is an asynchronous function. It is waiting for the
     function to finish, and then it is calling the Notifications.success function, which is a
     function that displays a notification. Then it is calling the closeModal function, which is a
     function that closes the modal. Finally, it is calling the init function, which is a function
     that gets the list of departments and the list of productions from the API, and stores them in
     the state variables arrayDep and arrayProd. */
      await api.addDevice(body);
      Notifications.success("Se ha agregado el dispositivo Correctamente");
      closeModal();
      init();
    } catch (error) {
      Notifications.error("Error");
      console.error(error);
    }
  }
  /* A hook that is used to create forms. */
  const form = useForm({
    initialValues: {
      device_id: "",
      model: "",
      department_name: null,
      name: null,
    },
    validate: {
      device_id: (value) =>
        /^\s+/.test(value) === true || value.length === 0
          ? "Ingrese el Identificador del Dispositivo"
          : null,
      /* department_name: (value) =>
        value.length === 0
          ? "Ingrese el departamento donde se encuentra el dispositivo"
          : null,  */
      model: (value) =>
        value.length === 0 ? "Ingrese el modelo o marca del dispositivo" : null,
    },
  });

  /**
   * If the department is not active, then set the product to active.
   */
  function departmentAdd() {
    setActiveDep(false);
    setActiveProd(true);
  }
  /**
   * When the user clicks the button, the function will set the activeProd state to false and the
   * activeDep state to true.
   */
  function productionAdd() {
    setActiveProd(false);
    setActiveDep(true);
  }

  /**
   * If the department name of the first object is less than the department name of the second object,
   * return -1. If the department name of the first object is greater than the department name of the
   * second object, return 1. If the department names are equal, return 0.
   * 
   * @param a the first object to compare
   * @param b the second object to compare
   * 
   * @return a number.
   */
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

  /**
   * It takes two objects, compares their name attributes, and returns a value based on the result.
   * 
   * @param a The first object to compare.
   * @param b the second object to compare
   * 
   * @return a number.
   */
  function compare_nameProd(a, b) {
    if (a.attributes.name.toLowerCase() < b.attributes.name.toLowerCase()) {
      return -1;
    }
    if (a.attributes.name.toLowerCase() > b.attributes.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  /* Returning a form. */
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
        data={
          arrayDep &&
          arrayDep.sort(compare_nameDep).map((d) => {
            return { value: d.id, label: d.attributes.department_name };
          })
        }
      />

      <Select
        label="Area de Produccion"
        icon={<IconWorld />}
        disabled={activeProd}
        searchable
        {...form.getInputProps("name")}
        data={
          arrayProd &&
          arrayProd.sort(compare_nameProd).map((f) => {
            return { value: f.id, label: f.attributes.name };
          })
        }
      />

      <Center pt={20}>
        <Button color="#002a5b" type="submit">
          Agregar
        </Button>
      </Center>
    </form>
  );
};

/* Exporting the component. */
export default ModalAddDevice;
