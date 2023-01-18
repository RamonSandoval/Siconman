import React from "react";
import {
  TextInput,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Fecha } from "../../helpers";
import { useState, useEffect } from "react";
import stylesModal from "../../styles/ModalRegisterNewMaint.module.css";
import { useForm } from "@mantine/form";
import api from "../../services/api";
import Notifications from "../Notifications";
const PostponeCalendar = ({maintToPostponeC,closeModal}) => {

  const id_postPone = maintToPostponeC

  async function updateMaintenance() {
    const body = {
      data: {
        next_maintenance: form.values.next_maintenance,
        
      }
    }
    try {
      await api.updateMaintenance(id_postPone,body);
      Notifications.success("Se ha cambiado la fecha de mantenimiento Correctamente");
      closeModal()
    } catch (error) {
      Notifications.error("Error al cambiar la fecha de mantenimiento");
      console.log(error);
    }
  }

  const form = useForm({
    initialValues: {
      device_id: maintToPostponeC.attributes.device_id,
      maintenance_date: Fecha(maintToPostponeC.attributes.maintenance?.data?.attributes.maintenance_date),
      next_maintenance: maintToPostponeC.attributes.maintenance?.data?.attributes.next_maintenance
    },
    validate: {},
  });
  return (
    <>
      <form onSubmit={form.onSubmit(updateMaintenance)}>
        <TextInput
        disabled
         {...form.getInputProps("device_id")} 
         label="ID Equipo" 
         />
        <TextInput 
        disabled
        {...form.getInputProps("maintenance_date")}
        label="Ultimo Manteniemiento" 
        autosize 
        />
        <TextInput 
        disabled
        label="Proximo Manteniemiento" 
        autosize 
        {...form.getInputProps("next_maintenance")}
        />
        <TextInput
          allowFreeInput
          placeholder="Elegir fecha"
          label="Posponer Mantenimiento para el "
          withAsterisk
          {...form.getInputProps("next_maintenance")}
        />

        <div className={stylesModal.button}>
          <Button color="orange" o type="submit">
            {" "}
            Posponer{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PostponeCalendar;
