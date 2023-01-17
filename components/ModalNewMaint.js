import React from 'react'
import { TextInput, Select, Radio, Checkbox, Textarea, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import stylesModal from '../styles/ModalRegisterNewMaint.module.css'

const ModalNewMaint = () => {
  return (
    <form>
    <div className={stylesModal.modal__container}>

    <div className={stylesModal.modal__lcontainer}>
      <TextInput placeholder="IT10XXX" label="ID Equipo" withAsterisk/>
      <TextInput placeholder="HP-X" label="Modelo"/>
      <Select label="Departamento / Area" placeholder=" - " data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'vue', label: 'Vue' },
      ]}
      />

      <Select label="Motivo de Mantenimiento" placeholder=" - " data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'vue', label: 'Vue' },
      ]}
      />
      <Radio.Group name="favoriteFramework" label="Solicito Usuario?" withAsterisk >
        <Radio value="yes" label="Si" />
        <Radio value="no" label="No" />
      </Radio.Group>
    <div className={stylesModal.modal__solicitant}>
      
    <Select label="Departamento / Area" placeholder=" - " data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'vue', label: 'Vue' },
      ]}
      />
    <TextInput className={stylesModal.input__name}placeholder="Juan Perez" label="Nombre" withAsterisk/>
    
    </div>
    
    <Checkbox.Group defaultValue={['hardware']} label="Tipo de Mantenimiento" withAsterisk>
      <Checkbox value="software" label="Interno" />
      <Checkbox value="hardware" label="Externo" />
    </Checkbox.Group>
    </div>

    <div className={stylesModal.modal__rcontainer}>
      <Textarea label="Notas" withAsterisk />
      <DatePicker allowFreeInput placeholder="Elegir fecha" label="Mantenimiento Realizado el: " withAsterisk />
      <DatePicker allowFreeInput placeholder="Elegir fecha" label="Proximo Mantenimiento " withAsterisk />
      <Radio.Group name="tiempo" label="Se atendio en tiempo y forma?" withAsterisk >
        <Radio value="yes" label="Si" />
        <Radio value="no" label="No" />
      </Radio.Group>
      <Select label="Realizo Manteniemiento" placeholder=" - " data={[
        { value: 'fparra', label: 'Fernando Parra' },
        { value: 'rsandoval', label: 'Ramon Sandoval' },
        { value: 'jmancilla', label: 'Jesus Mancilla' },
      ]}
      />
      <div className={stylesModal.button} >
        <Button color="orange"> Registrar </Button>
      </div>
    </div>
  </div>
  </form>
  
  )
}

export default ModalNewMaint