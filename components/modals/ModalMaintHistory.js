import React from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  Select,
  Radio,
  Textarea,
  Button,
  Checkbox,
  Group,
} from "@mantine/core";
import { Fecha } from "../../helpers";
import { DatePicker } from "@mantine/dates";
import { useState, useEffect } from "react";
import stylesModal from "../../styles/ModalRegisterNewMaint.module.css";
import api from "../../services/api";
import Notifications from "../Notifications";

const ModalMaintHistory = ({ deviceToMaintHistory }) => {
  const [opened, setOpened] = useState(false);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayDataDev, setArrayDataDev] = useState([]);

  const id_maint = deviceToMaintHistory?.attributes?.maintenance?.data?.id;
  const faults = deviceToMaintHistory?.attributes?.maintenance?.data?.fault;
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
    setArrayDataDev(list.data.concat(list2.data));
  }

  var devicesListSelect = arrayDataDev.map((d) => {
    return d.attributes.device_id;
  });

  /**
   * "This function updates the maintenance with the data from the form"
   * </code>
   */
 

  /* A form that is being created with the initial values of the maintenance that is being updated. */
  const form = useForm({
    initialValues: {
      device_id: deviceToMaintHistory.attributes.device_id,
      department_name:
        deviceToMaintHistory.attributes?.department?.data?.attributes
          .department_name,
      model: deviceToMaintHistory.attributes.model,
      maintenance_type:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .maintenance_type,
      motive:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes.motive,
      user_request:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .user_request,
      notes:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes.notes,
      maintenance_date: Fecha(
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .maintenance_date
      ),
      next_maintenance: Fecha(
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .next_maintenance
      ),
      maintenance_eval:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .maintenance_eval,
      maintenance_type_next:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .maintenance_type_next,
      user_request_name:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .user_request_name,
      user_request_department:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .user_request_department,
      user_maintenance:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .user_maintenance,
      fault: deviceToMaintHistory.attributes?.maintenance?.data?.fault,
      name: deviceToMaintHistory.attributes?.production?.data?.attributes.name,
      type_maint:
        deviceToMaintHistory.attributes?.maintenance?.data?.attributes
          .type_maint,
    },
    validate: {},
  });
  
  return (
    <form>
      <div className={stylesModal.modal__container}>
        <div className={stylesModal.modal__lcontainer}>
          <TextInput
            readOnly
            label="ID Equipo"
            {...form.getInputProps("device_id")}
          />

          <TextInput
            disabled
            placeholder="HP-X"
            label="Modelo"
            {...form.getInputProps("model")}
          />
          <Group>
            <TextInput
              disabled
              label="Departamento"
              {...form.getInputProps("department_name")}
            />
            <TextInput disabled label="Area" {...form.getInputProps("name")} />
          </Group>

          <TextInput
            readOnly
            label="Tipo de mantenimiento previo realizado"
            {...form.getInputProps("maintenance_type")}
          />

          <TextInput
            readOnly
            label="Motivo de Mantenimiento"
            {...form.getInputProps("motive")}
            data={[]}
          />
          <Radio.Group
            {...form.getInputProps("type_maint".valueOf(Radio))}
          >
            <Radio disabled value="Correctivo" label="Correctivo" />
            <Radio disabled  value="Preventivo" label="Preventivo" />
          </Radio.Group>
          <div className={stylesModal.modal__solicitant}>
            <Radio.Group
              disabled
              label="Solicito Usuario?"
              {...form.getInputProps("user_request".valueOf(Radio))}
            >
              <Radio readOnly disabled value="yes" label="Si" />
              <Radio readOnly disabled value="no" label="No" />
            </Radio.Group>
            <TextInput
              readOnly
              className={stylesModal.input__name}
              label="Nombre"
              {...form.getInputProps("user_request_name")}
            />
          </div>
        </div>

        <div className={stylesModal.modal__rcontainer}>
          <Textarea readOnly label="Notas" {...form.getInputProps("notes")} />

          {deviceToMaintHistory.attributes.maintenance?.data?.attributes
            .maintenance_date == null ? (
            <TextInput
              label="Mantenimiento Realizado el: "
              readOnly
              placeholder="Por asignar"
            ></TextInput>
          ) : (
            <TextInput
              readOnly
              label="Mantenimiento Realizado el: "
              {...form.getInputProps("maintenance_date")}
            />
          )}

          <TextInput
            label="Tipo de Mantenimiento próximo"
            readOnly
            {...form.getInputProps("maintenance_type_next")}
          />
          <TextInput
            readOnly
            label="Próximo Mantenimiento"
            {...form.getInputProps("next_maintenance")}
          />
          {/* <DatePicker
          allowFreeInput
          label="Proximo Mantenimiento "
          {...form.getInputProps("next_maintenance")}
        /> */}

          <Radio.Group
            label="Se atendio en tiempo y forma?"
            {...form.getInputProps("maintenance_eval".valueOf(Radio))}
          >
            <Radio readOnly disabled value="yes" label="Si" />
            <Radio readOnly disabled value="no" label="No" />
          </Radio.Group>

          <TextInput
            readOnly
            label="Realizo Manteniemiento"
            {...form.getInputProps("user_maintenance")}
          />
        </div>
      </div>
    </form>
  );
};

export default ModalMaintHistory;
