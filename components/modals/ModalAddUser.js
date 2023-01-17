import { Button, Center, PasswordInput, Select, TextInput } from '@mantine/core'
import React from 'react'
import { useForm } from "@mantine/form";
import api from '../../services/api';
import Notifications from "../Notifications";



const ModalAddUser = () => {

  async function createUser(){
    const body = {
      data:{
        username: form.values.username,
        /* email: form.values.email,
        password: form.values.password,
        confirmed: form.values.confirmed,
        blocked: form.values.blocked  */
      },
    };
    try{
      await api.addUser(body)
      Notifications.success("Se ha agregado al usuario " );
    }
    catch(error){
      Notifications.error("Error");
    }
  }

  const form = useForm ({
    initialValues:{
      username: "",
      password: "",
      email: "",
      confirmed: "true",
      blocked: "false"
    },
    
    /* validate:{
      username: (value) => username.length === 0 ? "Ingrese un nombre de Usuario" : null,
      email: (value) => email.length === 0  ? "Ingrese un correo" : null,
      confirmed: (value) => username.length === 0 ? "Ingrese el Estatus del nuevo usuario" + username : null,
      blocked: (value) => username.length === 0 ? "Usuario bloqueado?" : null,
    }  */

  })
  return (
    <form onSubmit={form.onSubmit(createUser)}>
        <TextInput label="Usuario" {...form.getInputProps("username")}/>
        <TextInput label="Correo"  {...form.getInputProps("email")}/>
        <PasswordInput label="Contraseña" {...form.getInputProps("password")}/>
        <Select label="Estatus" data={[{value:'true',label: 'Activo'},{value:'false', label: 'Inactivo'}]} {...form.getInputProps("confirmed")}/>
        <Select label="Bloqueado" data={[{value:'true', label: 'Si'},{value:'false',label: 'No'}]} {...form.getInputProps("blocked")}/>
       
        
        <Center pt={10}><Button type='submit' >{" "}Agregar{""}</Button></Center>
      </form>
  )
}

export default ModalAddUser