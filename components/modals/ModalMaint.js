import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Select,
  Radio,
  Checkbox,
  Textarea,
  Button,
  Text,
  Group,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import stylesModal from "../../styles/ModalRegisterNewMaint.module.css";
import api from "../../services/api";
import Notifications from "../Notifications";
const ModalMaint = ({ deviceToMaint, closeModal2 }) => {
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayDataDev, setArrayDataDev] = useState([]);
  const [arrayDep, setarrayDep] = useState([]);
  const [active, setActive] = useState(true);
  const [arrayUsers, setarrayUsers] = useState([]);
  const id_maint = deviceToMaint.attributes?.maintenance?.data?.id;
  const dateToday = new Date();
  const pc = deviceToMaint.attributes.device_id;

  useEffect(() => {
    init();
  }, []);

  async function init() {}

  /**
   * When the page loads, get the list of devices from the API, then get the list of departments from
   * the API, then get the list of users from the API, then set the state of the array of users, then
   * set the state of the array of departments, then set the state of the array of devices, then set
   * the state of the array of data devices.
   */
  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    const listDepartment = await api.departmentsList(1);
    const listUsers = await api.usersList(1);
    setarrayUsers(listUsers);
    setarrayDep(listDepartment.data);
    setarrayDevices(list.data.concat(list2.data));
    setArrayDataDev(list.data.concat(list2.data));
  }

 /**
  * It's an async function that updates a maintenance record in a database.
  */
  async function updateMaintenance() {
    const body = {
      data: {
        motive: form.values.motive,
        user_request: form.values.user_request,
        user_maintenance: form.values.user_maintenance,
        maintenance_type: form.values.maintenance_type,
        notes: form.values.notes,
        maintenance_date: form.values.maintenance_date,
        next_maintenance: form.values.next_maintenance,
        maintenance_eval: form.values.maintenance_eval,
        maintenance_type_next: form.values.maintenance_type_next,
        user_request_name: form.values.user_request_name,
        user_request_department: form.values.user_request_department,
        type_maint: form.values.type_maint,
      },
    };
    try {
      await api.updateMaintenance(id_maint, body);
      Notifications.success(
        "Se ha realizado el mantenimiento con éxito al equipo " + pc
      );
      init();
      closeModal2();
    } catch (error) {
      Notifications.error("Error al realizar el Mantenimiento al equipo " + pc);
      console.log(error);
    }
  }

  /* A form that is being created. */
  const form = useForm({
    initialValues: {
      device_id: deviceToMaint.attributes.device_id,
      department_name:
        deviceToMaint.attributes?.department?.data?.attributes.department_name,
      model: deviceToMaint.attributes.model,
      name:
        "Produccion - " +
        deviceToMaint.attributes?.production?.data?.attributes.name,
    },
    validate: {
      department_name: (value) =>
        value === null ? console.log("No tiene departamento") : null,
    },
  });

 /* Mapping the array of users and returning the username. */
  var usersListP = arrayUsers.map((d) => {
    return d.username;
  });

  /* A form that is being created. */
  return (
    <form onSubmit={form.onSubmit(updateMaintenance)}>
      <div className={stylesModal.modal__container}>
        <div className={stylesModal.modal__lcontainer}>
          <TextInput
            readOnly
            searchable
            label="ID Equipo"
            {...form.getInputProps("device_id")}
          />
          <TextInput
            readOnly
            placeholder="HP-X"
            label="Modelo"
            {...form.getInputProps("model")}
          />
          <Group>
            {deviceToMaint.attributes.production?.data?.attributes.name ==
            null ? (
              <TextInput
                readOnly
                autosize
                label="Departamento"
                {...form.getInputProps("department_name")}
              />
            ) : (
              <TextInput
                readOnly
                label="Departamento"
                {...form.getInputProps("name")}
              />
            )}
          </Group>
          <Select
            data={["Hardware", "Software", "Hardware/Software"]}
            {...form.getInputProps("maintenance_type")}
            label="Tipo de mantenimiento a realizar"
          />
          <Radio.Group
            {...form.getInputProps("type_maint".valueOf(Radio))}
            withAsterisk
          >
            <Radio value="Correctivo" label="Correctivo" />
            <Radio value="Preventivo" label="Preventivo" />
          </Radio.Group>
          <TextInput
            label="Motivo de Mantenimiento"
            {...form.getInputProps("motive")}
            data={[]}
          />
          <div className={stylesModal.modal__solicitant}>
            <Radio.Group
              pr={20}
              label="Solicito Usuario?"
              {...form.getInputProps("user_request".valueOf(Radio))}
            >
              <Radio onClick={() => setActive(false)} value="yes" label="Si" />
              <Radio onClick={() => setActive(true)} value="no" label="No" />
            </Radio.Group>

            <TextInput
              disabled={active}
              className={stylesModal.input__name}
              label="Nombre"
              {...form.getInputProps("user_request_name")}
            />
          </div>
        </div>

        <div className={stylesModal.modal__rcontainer}>
          <Textarea label="Notas" {...form.getInputProps("notes")} />

          <DatePicker
            allowFreeInput
            placeholder="Elegir fecha"
            locale="es"
            label="Mantenimiento Realizado el: "
            defaultValue={dateToday}
            withAsterisk
            {...form.getInputProps("maintenance_date")}
          />
          <Radio.Group
            name="tiempo"
            label="Se atendio en tiempo y forma?"
            {...form.getInputProps("maintenance_eval".valueOf(Radio))}
            withAsterisk
          >
            <Radio value="yes" label="Si" />
            <Radio value="no" label="No" />
          </Radio.Group>
          <Select
            label="Realizo Mantenimiento"
            {...form.getInputProps("user_maintenance")}
            data={usersListP}
          />

          <Select
            label="Tipo de Mantenimiento proximo"
            searchable
            data={["Hardware", "Software", "Hardware/Software"]}
            {...form.getInputProps("maintenance_type_next")}
          />

          <DatePicker
            allowFreeInput
            placeholder="Elegir fecha"
            label="Proximo Mantenimiento "
            {...form.getInputProps("next_maintenance")}
            withAsterisk
          />

          <div className={stylesModal.button}>
            <Button className={stylesModal.hiddenButton} />
            <Button
              variant="gradient"
              gradient={{ from: "#00255b", to: "#00255b", deg: 75 }}
              type="submit"
            >
              {" "}
              Registrar{" "}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ModalMaint;
