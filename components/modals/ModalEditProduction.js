import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { Button, Center, TextInput } from "@mantine/core";
import { IconId } from "@tabler/icons";
import Notifications from "../Notifications";
import api from "../../services/api";

const ModalEditProduction = ({ productionToEdit,closeModal4}) => {
  const id_production = productionToEdit.id
  const production_name = productionToEdit.attributes.name
  useEffect(() => {
    init();
  }, []);

  async function init(){}
  
  async function updateProduction(){
    const body = {
        data:{
            name: form.values.name
        }
    }
    try{
        await api.updateProduction(id_production,body)
        Notifications.success("Se ha editado el area de Produccion " + production_name +" con exito")
        closeModal4()
    }catch(error){
        Notifications.error("Error al editar el area de Produccion " + id_production)

    }
  }

  
  const form = useForm({
    initialValues: {
      name: productionToEdit.attributes.name,
    },
    validate: {},
  });


  return (
    <form onSubmit={form.onSubmit(updateProduction)}>
      <TextInput
        label="Area de Produccion"
        {...form.getInputProps("name")}
        icon={<IconId />}
      />
      <Center pt={12}>
        <Button color="#002a5b" type="submit">
          {" "}
          Aplicar{" "}
        </Button>
      </Center>
    </form>
  );
};

export default ModalEditProduction;
