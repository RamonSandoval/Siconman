import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from '@fullcalendar/core/locales/es';
import { Container, Modal,} from "@mantine/core";
import styles from '../styles/MaintCalendar.module.css'
import PostponeCalendar from './modals/ModalPostponeCalendar'
const MaintCalendar = () => {
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [opened,setOpened] = useState(false);
  const [color1,setColor1] = useState('')

   /* DATE SUBSTRACTION */
  //Normal Date
  const date = new Date().toLocaleDateString("en-CA");
  // Minus 3 days
  var d3 = new Date();
  d3.setDate(d3.getDate()+3);
  var date3 = d3.toLocaleDateString('en-CA')
  //Minus 7 days
  var d7 = new Date();
  d7.setDate(d7.getDate()+7);
  var date7 = d7.toLocaleDateString('en-CA')
  /* */

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
    setarrayDataDev(list.data.concat(list2.data));
  }


  const dates = arrayDevices.map((f) => {
    return {
      title: f.attributes.device_id,
      date: f.attributes.maintenance?.data?.attributes?.next_maintenance,
      color: f.attributes.maintenance?.data?.attributes?.next_maintenance < date ? 'red' : '#00255b'
    };
  })

  return (
    <>
    <Container className={styles}>
      <FullCalendar
        locale={esLocale}
        updateSize
        weekends={false}
        selectable={true}
        footerToolba
        eventColor={dates.color}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={dates}
        // eventClick={() => {setOpened(true); console.log(f.attributes.device_id)}}
      />
      </Container>
      
    
      
     
      <Modal
        opened={opened}
        centered
        size={600}
        onClose={() => setOpened(false)}
        title="Acciones para realizar a Dispositivo"
      >
        <PostponeCalendar/>
      </Modal>
    </>

    
  );
};

export default MaintCalendar;
