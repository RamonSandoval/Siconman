import { Button, Center, Select, TextInput } from '@mantine/core'
import React, { useState } from 'react'

import { useForm } from "@mantine/form";
import api from '../../services/api';

const ModalEditUser = ({userToEdit}) => {


  var blockedTextNew = ''
  var confirmedTextNew = ''

  const id_user = userToEdit.id

  if( userToEdit.blocked.toString() === "false"){
    blockedTextNew = "No"
  }
  else{
    blockedTextNew = "Si"
  }

  if(userToEdit.confirmed.toString() == "true"){
    confirmedTextNew = "Activo"
  }
  else{
    confirmedTextNew = "Inactivo"
  }


  async function updateUser(){
    const body = {
      data:{
        username: form.values.username,
        /* email: form.values.email,
        blocked: form.values.blocked,
        confirmed: form.values.confirmed, */
        
      }
    }
    try{
      await api.updateUser(id_user,body)
      alert('Usuario editado con exito')

    }
    catch(error){
      alert('Error al editar el usuario')
    }
  }

  const form = useForm({
    initialValues:{
        username:userToEdit.username,
        email:userToEdit.email,
        blocked:blockedTextNew,
        confirmed:confirmedTextNew,
    },
    validate:{
      
    }
  })

  const user_edit = userToEdit.id
  return (
      <form onSubmit={form.onSubmit(updateUser)}>
        <TextInput label="Usuario" {...form.getInputProps("username")}/>
        <TextInput label="Correo"  {...form.getInputProps("email")}/>
        <TextInput label="Permisos" />
        <TextInput label="Estatus"  {...form.getInputProps("confirmed")}/>
        <TextInput label="Bloqueado"  {...form.getInputProps("blocked")}/>
        
        <Center pt={10}><Button type='submit' >{" "}Aplicar{""}</Button></Center>
      </form>
  )
}

export default ModalEditUser