import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { Container, Modal } from "@mantine/core";
import styles from "../styles/MaintCalendar.module.css";
import PostponeCalendar from "./modals/ModalPostponeCalendar";
const MaintCalendar = () => {
  const [arrayDevices, setarrayDevices] = useState([]);
  const [opened, setOpened] = useState(false);

  /* DATE SUBSTRACTION */
  //Normal Date
  /* Getting the current date and converting it to a string. */
  const date = new Date().toLocaleDateString("en-CA");
  // Minus 3 days
  var d3 = new Date();
  d3.setDate(d3.getDate() + 3);
  var date3 = d3.toLocaleDateString("en-CA");
  //Minus 7 days
  /* Subtracting 7 days from the current date. */
  var d7 = new Date();
  d7.setDate(d7.getDate() + 7);
  var date7 = d7.toLocaleDateString("en-CA");
  /* */

  useEffect(() => {
    init();
  }, []);

  /**
   * I'm going to call the api.devicesList function twice, once with a parameter of 1 and once with a
   * parameter of 2, and then I'm going to concatenate the results of those two calls and assign them
   * to the arrayDevices variable.
   */
  async function init() {
    const list = await api.devicesList();
    setarrayDevices(list.data);
  }

  /* It's mapping the arrayDevices array and returning an object with the title, date and color
  properties. */
  const dates = arrayDevices.map((f) => {
    return {
      title: f.attributes.device_id,
      date: f.attributes.maintenance?.data?.attributes?.next_maintenance,
      color:
        f.attributes.maintenance?.data?.attributes?.next_maintenance < date
          ? "red"
          : "#00255b",
    };
  });

  /* It's returning a JSX element. */
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
        <PostponeCalendar />
      </Modal>
    </>
  );
};

export default MaintCalendar;
