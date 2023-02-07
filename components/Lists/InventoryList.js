import { ActionIcon, Center, ThemeIcon,TextInput,Tooltip,Divider,Table,ScrollArea,
    Container,
    Pagination,
    Modal,
    Button,
    Text,
    Loader, } from '@mantine/core';
import React, { useEffect } from 'react'
import styles from "../../styles/Inventory.module.css";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import {  createStyles } from "@mantine/core";
import ModalAddDevice from "../../components/modals/ModalAddDevice";
import api from "../../services/api";
import ModalEditDevice from "../../components/modals/ModalEditDevice";
import Notifications from "../../components/Notifications";

import {
    IconEdit,
    IconList,
    IconPlus,
    IconSearch,
    IconTrash,
  } from "@tabler/icons";
const InventoryList = () => {
    const [opened, setOpened] = useState();
  const [deviceToDelete, setDeviceToDelete] = useState({});
  const [deviceToEdit, setDeviceToEdit] = useState({});
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [search, setSearch] = useState("");
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const { data: session } = useSession();

    useEffect(() => {
        if (session == null) return;
        init();
      }, [session]);
    
      const [activePage, setPage] = useState(1);
    
      /**
       * When the page loads, get the list of devices from the API and store it in the arrayDevices
       * variable.
       */
      async function init() {
        setIsLoading(true);
        const list = await api.devicesList(activePage);
        setarrayDevices(list.data);
        setarrayDataDev(list.data);
        setIsLoading(false)
      }
    
      /**
       * The function is called when the user clicks the button. It then calls the init() function, which
       * is the function that creates the pagination.
       */
      function actualizar() {
        console.log(activePage + 1);
        init();
      }

      const closeModal = () => {
        setOpened(false);
        init();
      };
    
      /**
       * When the user clicks the close button, the modal is closed and the init function is called.
       */
      const closeModal2 = () => {
        setOpened2(false);
        init();
      };
    
      /* Returning the current date in the format of "Month Day, Year" */
      new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });
    
      /**
       * When the input value changes, set the search state to the input value and call the filtrar
       * function with the input value as an argument.
       * 
       * @param e the event object
       */
      const handleChange = (e) => {
        setSearch(e.target.value);
        filtrar(e.target.value);
      };
    
      /**
       * It filters the arrayDataDev array and returns the result to the setarrayDevices function.
       * 
       * @param search is the value of the input
       */
      const filtrar = (search) => {
        var resultado = arrayDataDev.filter((elemento) => {
          if (
            elemento.attributes.device_id
              ?.toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            elemento.attributes.department?.data?.attributes.department_name
              .toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            elemento.attributes.model
              ?.toString()
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            elemento.attributes.production?.data?.attributes.name
              ?.toString()
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return elemento;
          }
        });
        setarrayDevices(resultado);
      };
    
      /* Creating a style object that will be used by the component. */
      const useStyles = createStyles((theme) => ({
        header: {
          position: "sticky",
          top: 0,
          backgroundColor: theme.white,
          transition: "box-shadow 150ms ease",
    
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
              theme.colorScheme === "dark"
                ? theme.colors.dark[3]
                : theme.colors.gray[2]
            }`,
          },
        },
    
        scrolled: {
          boxShadow: theme.shadows.sm,
        },
      }));
      const { classes, cx } = useStyles();
    
      /**
       * The function deleteDevice() is an async function that takes an id as a parameter. It then calls
       * the api.deleteDevice() function, which returns a promise. If the promise is resolved, the function
       * displays an alert and calls the init() function. If the promise is rejected, the function displays
       * an alert and logs the error to the console.
       *
       * @param id The id of the device to delete.
       */
      async function deleteDevice(id) {
        try {
          await api.deleteDevice(id);
          Notifications.success("Se ha eliminado el dispositivo correctamente ");
          init();
        } catch (error) {
          Notifications.error("Error al eliminar el dispositivo" + id);
          console.error(error);
        }
      }
    
      function compare_name(a, b) {
        if (a.attributes.device_id.toLowerCase() < b.attributes.device_id.toLowerCase()) {
          return -1;
        }
        if (a.attributes.device_id.toLowerCase() > b.attributes.device_id.toLowerCase()) {
          return 1;
        }
        return 0;
      }
      /* A React component that is rendering a table with data from an API. */
  return (
    <Center>
    <div className={styles.table}>
      <div className={styles.table__title}>
        <div className={styles.table__title2}>
          <ThemeIcon
            className={styles.icon}
            color="#002A5B"
            variant="transparent"
          >
            <IconList />
          </ThemeIcon>
          <h3>Inventario</h3>
        </div>

        <TextInput
          placeholder="Buscar"
          value={search}
          onChange={handleChange}
          icon={<IconSearch />}
        />
        {session.id != 9 ?
        <Tooltip label="Agregar">
          <ActionIcon
            onClick={() => setOpened(true)}
            className={styles.add__icon}
            variant="filled"
          >
            <IconPlus size={30} />
          </ActionIcon>
        </Tooltip>: null }
      </div>
      <Divider variant="dashed" size="sm" my="sm" />
      <ScrollArea
        sx={{ height: 710 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        { isLoading ? 
              <Center pt={200} className={styles.loading}>
              <Loader size="xl" color="orange" /> 
              </Center>:
        <Table highlightOnHover>
          <thead
            className={cx(classes.header, {
              [classes.scrolled]: scrolled,
            })}
          >
            <tr className={styles.table__titles}>
              {/* <th>
              <Center>#</Center>
            </th> */}
              <th>
                <Center>ID Equipo</Center>
              </th>
              <th>
                <Center>Departamento</Center>
              </th>
              <th>
                <Center>Modelo</Center>
              </th>
              {session.id != 9 ?
              <th>
                <Center>Acciones</Center>
              </th> : null }
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {arrayDevices &&
              arrayDevices.sort(compare_name).map((data) => (
                <tr key={data.device_id}>
                  {/* <td>
                  <Center>{data.id}</Center>
                </td> */}
                  <td>
                    <Center>{data.attributes.device_id}</Center>
                  </td>

                  {data.attributes.production?.data == null ? 
                  <td>
                    <Center>
                      {
                        data.attributes.department?.data?.attributes
                          .department_name
                      }
                    </Center>
                  </td> :
                  <td>
                  <Center>
                  Produccion - {data.attributes.production?.data?.attributes.name}
                    
                  </Center>
                </td>}
                  <td>
                    <Center>{data.attributes.model}</Center>
                  </td>
                  {session.id != 9 ?
                  <td>
                    <Center>
                      <div className={styles.icons}>
                        <Tooltip label="Editar">
                          <ActionIcon
                            color="indigo"
                            onClick={() => {
                              setDeviceToEdit(data);
                              setOpened2(true);
                              console.log(data);
                            }}
                          >
                            <IconEdit size={18} />
                          </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Eliminar">
                          <ActionIcon
                            color="red"
                            onClick={() => {
                              setOpened3(true);
                              setDeviceToDelete(data.id);
                            }}
                          >
                            <IconTrash size={18} />
                          </ActionIcon>
                        </Tooltip>
                      </div>
                    </Center>
                  </td> : null}
                </tr>
              ))}
          </tbody>
        </Table>
}
      </ScrollArea>
      {/* <Center>
        <Pagination
          grow
          page={activePage}
          initialPage={1}
          onChange={setPage}
          onClick={() => actualizar()}
          total={7}
        />
      </Center> */}
    </div>
    {/*-----------------MODAL's ADD AND EDIT DEVICES--------------*/}
    <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Agregar Equipo"
      >
        {/* <ModalAddDeviceSteps/> */}
        <ModalAddDevice closeModal={closeModal} />
      </Modal>
      {deviceToEdit && (
        <Modal
          centered
          title={"Editar Equipo"}
          opened={opened2}
          onClose={() => setOpened2(false)}
        >
          <ModalEditDevice
            closeModal2={closeModal2}
            deviceToEdit={{ ...deviceToEdit }}
          />
        </Modal>
      )}
      {/*-----------------MODAL's CONFIRMATIONS--------------*/}
      <Modal
        centered
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={<Text size="lg">Seguro que desea eliminar el equipo?</Text>}
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened3(false)} color="red">
            Cancelar
          </Button>
          <Button
            onClick={() =>
              deleteDevice(deviceToDelete).then(() => setOpened3(false))
            }
          >
            Confirmar
          </Button>
        </div>
      </Modal>
  </Center>
  
  )
}

export default InventoryList