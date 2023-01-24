import React from "react";
import Notifications from "../components/Notifications";
import { Loader, Pagination, Tooltip } from "@mantine/core";
import { signOut, useSession } from "next-auth/react";
import { getSession } from 'next-auth/react';
import SignIn from "./auth/sign-in";

import { usePagination } from '@mantine/hooks';
import {
  Modal,
  
  Table,
  Divider,
  ThemeIcon,
  TextInput,
  Text,
  Button,
  ScrollArea,
  Container,
} from "@mantine/core";
import { Center, createStyles } from "@mantine/core";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Inventory.module.css";
import { ActionIcon } from "@mantine/core";
import {
  IconEdit,
  IconList,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons";
import ModalAddDevice from "../components/modals/ModalAddDevice";
import api from "../services/api";
import ModalEditDevice from "../components/modals/ModalEditDevice";
import Head from "next/head";

const inventory = () => {
  const [opened, setOpened] = useState();
  const [deviceToDelete, setDeviceToDelete] = useState({});
  const [deviceToEdit, setDeviceToEdit] = useState({});
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [search, setSearch] = useState("");
  const [arrayDevices, setarrayDevices] = useState([]);
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();

  const pagination = usePagination({total:10, initialPage: 1})


  const devicesLength = arrayDevices.length;

  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
    init();
  }, [session]);
  
  const [activePage, setPage] = useState(1)

  async function init() {
    
    const list = await api.devicesList(activePage);
    setarrayDevices(list.data);
    setarrayDataDev(list.data);
  }

  function actualizar (){
    console.log(activePage+1)
    init()
  }
  
  if (isLoading)
  return (
    console.log('cargando'),
    <Center>
      <Loader />
    </Center>
  );

  const closeModal = () => {
    setOpened(false);
    init();
  };

  const closeModal2 = () => {
    setOpened2(false);
    init();
  };

  new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

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
  return (
    <>
      <Layout />
      <Head>
        <title>Inventario</title>
      </Head>
      <h1>{session ? "" : <SignIn/>}</h1>

      {session && (
      <Center >
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
            <Tooltip label="Agregar">
            <ActionIcon
              onClick={() => setOpened(true)}
              className={styles.add__icon}
              variant="filled"
            >
              <IconPlus size={30} />
            </ActionIcon>
            </Tooltip>
          </div>
          <Divider variant="dashed" size="sm" my="sm" />
          <ScrollArea
            sx={{ height: 700 }}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            <Table highlightOnHover>
              <thead
                className={cx(classes.header, { [classes.scrolled]: scrolled })}
              >
                <tr className={styles.table__titles}>
                  {/* <th>
                    <Center>#</Center>
                  </th> */}
                  <th>
                    <Center>ID Equipo</Center>
                  </th>
                  <th>
                    <Center>Departamento / Área</Center>
                  </th>
                  <th>
                    <Center>Modelo</Center>
                  </th>
                  <th>
                    <Center>Acciones</Center>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {arrayDevices &&
                  arrayDevices.map((data) => (
                    <tr key={data.device_id}>
                      {/* <td>
                        <Center>{data.id}</Center>
                      </td> */}
                      <td>
                        <Center>{data.attributes.device_id}</Center>
                      </td>
                      <td>
                        <Center>
                          {
                            data.attributes.department?.data?.attributes
                              .department_name
                          } 
                          {data.attributes.production?.data?.attributes.name}
                        </Center>
                      </td>
                      <td>
                        <Center>{data.attributes.model}</Center>
                      </td>
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
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ScrollArea>
          <Center>
         <Pagination
          grow
            page={activePage}
            initialPage={1}
            onChange={setPage}
            onClick={()=> actualizar()} 
            total={7}
            />
            </Center>
        </div>
      </Center>
)};

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
        title={<Text size="lg">Seguro que desea eliminar el Dispositivo?</Text>}
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
    </>
  );
};
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // Check if session exists or not, if not, redirect
  if (session == null) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: true,
      },
    };
  }
  return {
    props: {
    },
  };
};

export default inventory;
