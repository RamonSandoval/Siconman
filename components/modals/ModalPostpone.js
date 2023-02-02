import React from "react";
import { TextInput, Button, Center } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Fecha} from "../../helpers";
import { useForm } from "@mantine/form";
import api from "../../services/api";
import Notifications from "../Notifications";
import "dayjs/locale/es";
const Postpone = ({ maintToPostpone, closeModal }) => {
  const id_postPone = maintToPostpone.attributes?.maintenance?.data?.id;

  /**
   * It updates the date of the maintenance of a machine.
   */
  async function updateMaintenance() {
    const body = {
      data: {
        next_maintenance: form.values.next_maintenance2,
      },
    };
    try {
      await api.updateMaintenance(id_postPone, body);
      Notifications.success(
        "Se ha cambiado la fecha de mantenimiento Correctamente"
      );
      closeModal();
    } catch (error) {
      Notifications.error("Error al cambiar la fecha de mantenimiento");
      console.log(error);
    }
  }

  /* A hook that is used to manage the form state. */
  const form = useForm({
    initialValues: {
      device_id: maintToPostpone.attributes.device_id,
      maintenance_date: Fecha(
        maintToPostpone.attributes.maintenance?.data?.attributes
          .maintenance_date
      ),
      next_maintenance: Fecha(
        maintToPostpone.attributes.maintenance?.data?.attributes
          .next_maintenance
      ),
    },
    validate: {},
  });
  /* A React component. */
  return (
    <>
      <form onSubmit={form.onSubmit(updateMaintenance)}>
        <TextInput
          disabled
          {...form.getInputProps("device_id")}
          label="ID Equipo"
        />

        {maintToPostpone.attributes.maintenance?.data?.attributes
          .maintenance_date == null ? (
          <TextInput
            disabled
            placeholder="Por asignar"
            label="Ultimo Manteniemiento"
            autosize
          />
        ) : (
          <TextInput
            disabled
            {...form.getInputProps("maintenance_date")}
            label="Ultimo Manteniemiento"
            autosize
          />
        )}
         {maintToPostpone.attributes.maintenance?.data?.attributes.next_maintenance == null ? 
          <TextInput
          disabled
          label="Próximo Manteniemiento"
          autosize
          placeholder="Por asignar"
        /> : 
        <TextInput
          disabled
          label="Próximo Manteniemiento"
          autosize
          {...form.getInputProps("next_maintenance")}
        />
         }

        <DatePicker
          placeholder="Elegir Fecha"
          locale="es"
          label="Posponer para el: "
          defaultValue={""}
          {...form.getInputProps("next_maintenance2")}
        />

        <Center pt={15}>
          <Button
            variant="gradient"
            gradient={{ from: "#00255b", to: "#00255b", deg: 75 }}
            o
            type="submit"
          >
            {" "}
            Posponer{" "}
          </Button>
        </Center>
      </form>
    </>
  );
};

export default Postpone;
