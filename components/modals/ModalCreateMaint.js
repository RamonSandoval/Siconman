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
import stylesModal from "../../styles/ModalCreateMaint.module.css";
import api from "../../services/api";
import Notifications from '../Notifications';
const ModalCreateMaint = ({deviceToMaintNew,closeModal3,maintIndicator}) => {
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayUsers,setarrayUsers] = useState([]);
  const [arrayDataDev,setArrayDataDev] = useState([]);
  const [arrayDep, setarrayDep] = useState([]);
  const [active, setActive] = useState(true)

  const id_maint = deviceToMaintNew.id

  useEffect(() => {
    if(deviceToMaintNew.attributes?.maintenance?.data === null){
  
      //Notifications.error("No se ha creado el mantenimiento");
    } 
    else{
      Notifications.error("Ya se ha creado un mantenimiento");
      closeModal3()
    } 
    init()
  }, []);


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
   
  

  var devicesListSelect = arrayDataDev.map((d) => {
    return d.attributes.device_id;
  });

  var usersList = arrayUsers.map((d) => {
    return d.username
  })

  async function addMaintenance(){
    
    const body = {
      data:{
        motive: form.values.motive,
        user_request: form.values.user_request,
        user_maintenance: null,/* form.values.user_maintenance, */
        maintenance_type: form.values.maintenance_type,
        notes: form.values.notes,
        maintenance_date: null, /* form.values.maintenance_date, */
        next_maintenance: form.values.next_maintenance,
        maintenance_eval: null, /* form.values.maintenance_eval, */
        maintenance_type_next: form.values.maintenance_type_next,
        user_request_name: form.values.user_request_name,
        user_request_department: form.values.user_request_department,
        device: id_maint

      }
    }
    try{
        console.log('Estas por crear un nuevo mantenimiento')
      await api.addMaintenance(body)
      Notifications.success("Se ha realizado el mantenimiento con exito");
      closeModal3()
      
    }catch(error){
      Notifications.error("Error al realizar el Mantenimiento");
      console.log(id_maint)
      console.log(error)
    
  }
  }

  const form = useForm({
    initialValues:{
      device_id: deviceToMaintNew.attributes.device_id,
      department_name: deviceToMaintNew.attributes?.department?.data?.attributes.department_name,
      name: deviceToMaintNew.attributes?.production?.data?.attributes.name,
      model: deviceToMaintNew.attributes.model,
      maintenance_type:deviceToMaintNew.attributes?.maintenance?.data?.attributes.maintenance_type,
    },
    validate:{
      department_name: (value) => 
      value === null ? console.log('No tiene departamento'): null
    }

  })
  var departmentsListSelect = arrayDep.map((d) => {
    return d.attributes.department_name;
  });

  
  return (
    <form onSubmit={form.onSubmit(addMaintenance)}>
    <div className={stylesModal.modal__container}>
      <div className={stylesModal.modal__lcontainer}>
        <TextInput
        disabled
        searchable
        limit={8}
        label="ID Equipo"
        {...form.getInputProps("device_id")}
        withAsterisk />

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
          <TextInput 
            disabled
            label="Area" 
            {...form.getInputProps("name")} 
          />
          </Group>
         <Select
        label="Tipo de Mantenimiento a realizar"
        searchable
        data={['Hardware','Software','Hardware/Software']}
        {...form.getInputProps("maintenance_type")}
        />

        <TextInput
          label="Motivo de Mantenimiento"
          {...form.getInputProps("motive")}
          data={[
            
          ]}
        />
         <div className={stylesModal.modal__solicitant}>
        <Radio.Group pr={20}
          label="Solicito Usuario?"
          
          {...form.getInputProps("user_request".valueOf(Checkbox.valueOf(Radio)))}
        >
          <Radio onClick={()=> setActive(false)} value="yes" label="Si" />
          <Radio onClick={()=> setActive(true)}value="no" label="No" />
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
        <Textarea 
        label="Notas"
        {...form.getInputProps("notes")}
        withAsterisk />
        {/* <DatePicker
          allowFreeInput
          placeholder="Elegir fecha"
          label="Mantenimiento Realizado el: "
          withAsterisk
          {...form.getInputProps("maintenance_date")}
        /> */}
        <Select
        label="Tipo de Mantenimiento proximo"
        searchable
        data={['Hardware','Software','Hardware/Software']}
        {...form.getInputProps("maintenance_type_next")}
        />
        
        <DatePicker
          allowFreeInput
          placeholder="Elegir fecha"
          label="Proximo Mantenimiento "
          {...form.getInputProps("next_maintenance")}
          withAsterisk
        />
        {/* <Radio.Group
          name="tiempo"
          label="Se atendio en tiempo y forma?"
          {...form.getInputProps("maintenance_eval".valueOf(Radio))}
          withAsterisk
        >
          <Radio value="yes" label="Si" />
          <Radio value="no" label="No"/>
        </Radio.Group> */}
        {/* <Select
            label="Realizo Manteniemiento"
            {...form.getInputProps("user_maintenance")}
            data={usersList}
          /> */}
       
        <div className={stylesModal.button}>
          
          <Button variant="gradient" gradient={{ from: '#00255b', to: '#00255b', deg:75 }} type="submit">
          {" "}
          Registrar{" "}
          
          </Button>
        </div>
      </div>
    </div>
    </form>
  );
};

export default ModalCreateMaint;
