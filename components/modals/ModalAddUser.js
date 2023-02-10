import {
  Button,
  Center,
  PasswordInput,
  Select,
  TextInput,
} from "@mantine/core";
import React, {useState} from "react";
import { useForm } from "@mantine/form";
import api from "../../services/api";
import Notifications from "../Notifications";
import createUser from './createUser';
const ModalAddUser = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await createUser(formData);
      console.log(user)
      Notifications.success('Se ha agregado al usuario')
    } catch (error) {
      console.error(error);
      Notifications.error('Error 403')
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Usuario" name="username"  onChange={handleChange}/>
      <TextInput label="Correo"  name="email" onChange={handleChange} />
      <TextInput label="Contraseña" name="password" onChange={handleChange}/>
      
      <Center pt={10}>
        <Button type="submit"> Agregar{""}</Button>
      </Center>
    </form>
  );
};

export default ModalAddUser;
