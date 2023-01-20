import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from '@fullcalendar/core/locales/es';
import { Button, Container, Modal, Text } from "@mantine/core";
import styles from '../styles/MaintCalendar.module.css'
import MaintCalendarOptions from '../components/modals/ModalCalendarOptions'
import PostponeCalendar from './modals/ModalPostponeCalendar'
const MaintCalendar = () => {
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [arrayDevices, setarrayDevices] = useState([]);
  const calendarRef = useRef(null);
  const [opened,setOpened] = useState(false);
  const [maintToPostpone, setMaintToPostPone] = useState();
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
    setarrayDataDev(list.data.concat(list2.data));
  }


  const handleEventClick = (clickInfo) => {
    setMaintToPostPone(clickInfo.event.id)
    setOpened(true)
    /* if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    } */
  }
  const dates = arrayDevices.map((f) => {
    return {
      title: f.attributes.device_id,
      date: f.attributes.maintenance?.data?.attributes?.next_maintenance,
      id: f.attributes,
      groupId: f.attributes.maintenance?.data?.attributes?.next_maintenance,
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
        footerToolbar
        eventColor="green"
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={dates}
        eventClick={handleEventClick}
        // eventClick={() => {setOpened(true); console.log(f.attributes.device_id)}}
      />
      </Container>
      
      
      {maintToPostpone &&  (
      <Modal
        opened={opened}
        centered
        size={600}
        onClose={() => setOpened(false)}
        title="Acciones para realizar a Dispositivo"
      >
        <PostponeCalendar maintToPostpone={maintToPostpone}/>
      </Modal>
      )}
    </>

    
  );
};

export default MaintCalendar;
