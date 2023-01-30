import React from "react";
import api from "../services/api";
import stylesModal from "../styles/ModalRegisterNewMaint.module.css";
import {
  ScrollArea,
  Table,
  TextInput,
  Modal,
  Center,
  Loader,
  Divider,
  Button,
  Tooltip,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { ThemeIcon } from "@mantine/core";
import {
  IconAlertCircle,
  IconListDetails,
  IconRotateClockwise2,
  IconSearch,
  IconTool,
} from "@tabler/icons";
import styles from "../styles/MainTable.module.css";
import { ActionIcon } from "@mantine/core";
import Layout from "./Layout";
import { Fecha } from "../helpers";
import Postpone from "./modals/ModalPostpone";
import ModalMaint from "./modals/ModalMaint";
import { signOut, useSession } from "next-auth/react";
import { getSession } from 'next-auth/react';

const TableDevices = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [maintToPostpone, setMaintToPostPone] = useState([]);
  const [openedMaint, setOpenedMaint] = useState(false);
  const [deviceToMaint, setDeviceToMaint] = useState({});
  const { data: session} = useSession();

  /* DATE SUBSTRACTION */
  //Normal Date
  /* Creating a new date object and then converting it to a string in the Canadian format. */
  const date = new Date().toLocaleDateString("en-CA");
  // Minus 3 days
  /* Creating a new date object, setting the date to 3 days from now, and then converting it to a
  string. */
  var d3 = new Date();
  d3.setDate(d3.getDate() + 3);
  var date3 = d3.toLocaleDateString("en-CA");
  //Minus 7 days
  var d7 = new Date();
  d7.setDate(d7.getDate() + 7);
  var date7 = d7.toLocaleDateString("en-CA");
  /* */

  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
    init();
  }, [session]);

  async function init() {
    setIsLoading(true);
    const list = await api.devicesList()
    setarrayDevices(list.data);
    setarrayDataDev(list.data);
    setIsLoading(false)
    
  }

 

  /**
   * When the user clicks the close button, the modal is closed and the init function is called.
   */
  const closeModal = () => {
    setOpened(false);
    init();
  };


  const closeModal2 = () => {
    setOpenedMaint(false);
    init();
  };

  /**
   * When the user types something in the input field, the value of the input field is set to the state
   * variable 'search' and the function 'filtrar' is called with the value of the input field as an
   * argument.
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
   * @param search is the value of the input field
   */
  const filtrar = (search) => {
    var resultado = arrayDataDev.filter((e) => {
      if (
        e.attributes.device_id
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        e.attributes.department?.data?.attributes.department_name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return e;
      }
    });
    setarrayDevices(resultado);
  };

  /* Creating a new array with the same values as the original array. */
  const deviceList = arrayDevices.map((d) => {
    return d;
  });

  /**
   * If the next_maintenance date of the first object is less than the next_maintenance date of the
   * second object, return -1. If the next_maintenance date of the first object is greater than the
   * next_maintenance date of the second object, return 1. If the next_maintenance dates are equal,
   * return 0.
   *
   * @param a the first object to compare
   * @param b {
   */
  function compare_date(a, b) {
    if (
      a.attributes.maintenance.data?.attributes?.next_maintenance <
      b.attributes.maintenance.data?.attributes?.next_maintenance
    ) {
      return -1;
    }
    if (
      a.attributes.maintenance.data?.attributes?.next_maintenance >
      b.attributes.maintenance.data?.attributes?.next_maintenance
    ) {
      return 1;
    }
    return 0;
  }

  /* A React component that is rendering a table with data from an API. */
  return (
    <>
      <Center>
        <div className={styles.table}>
          <div className={styles.table__title}>
            <div className={styles.table__title2}>
              <ThemeIcon
                className={styles.icon}
                color="dark"
                variant="transparent"
              >
                <IconListDetails />
              </ThemeIcon>
              <p>Próximos Mantenimientos</p>
            
            </div>
            <div className={styles.searchBar}>
              <TextInput
                placeholder="Buscar"
                value={search}
                onChange={handleChange}
                icon={<IconSearch />}
              />
            </div>
          </div>
          <ScrollArea>
            <Divider variant="dashed" size="sm" my="sm" />
            { isLoading ? 
              <Center className={styles.loading}>
              <Loader size="xl" color="orange"/> 
              </Center>:
            <Table highlightOnHover>
              <thead className={styles.table__columns}>
                <tr>
                  <th></th>
                  <th>
                    <Center>ID Equipo</Center>
                  </th>
                  <th>
                    <Center>Departamento</Center>
                  </th>
                  <th>
                    <Center>Modelo</Center>
                  </th>
                  <th>
                    <Center>Ultimo Mantenimiento</Center>
                  </th>
                  <th>
                    <Center>Próximo Mantenimiento</Center>
                  </th>
                  <th>
                    <Center>Tipo de Mantenimiento</Center>
                  </th>
                  {session.id != 9 ? 
                  <th>
                    <Center>Acciones</Center>
                  </th> : null }
                </tr>
              </thead>
              
           
              <tbody>
                {arrayDevices &&
                  arrayDevices.map((data, index) =>
                    arrayDevices.sort(compare_date) &&
                    data.attributes.maintenance?.data?.attributes
                      .next_maintenance != null ? (
                      <tr className={styles.table__data} key={data.device_id}>
                        {data.attributes.maintenance?.data?.attributes
                          .next_maintenance < date ? (
                          <td>
                            <Tooltip label="Mantenimiento Atrasado">
                              <ThemeIcon variant="transparent">
                                <IconAlertCircle color="red" />
                              </ThemeIcon>
                            </Tooltip>
                          </td>
                        ) : data.attributes.maintenance?.data?.attributes
                            .next_maintenance < date3 ? (
                          <td>
                            <Tooltip label="Realizar Matenimiento">
                              <ThemeIcon variant="transparent">
                                <IconAlertCircle color="#ff6f00" />
                              </ThemeIcon>
                            </Tooltip>
                          </td>
                        ) : data.attributes.maintenance?.data?.attributes
                            .next_maintenance < date7 ? (
                          <td>
                            <Tooltip label="Mantenimiento Proximo">
                              <ThemeIcon variant="transparent">
                                <IconAlertCircle color="#ffbb00" />
                              </ThemeIcon>
                            </Tooltip>
                          </td>
                        ) : (
                          <td></td>
                        )}
                        <td>
                          <Center>{data.attributes.device_id}</Center>
                        </td>
                        {data.attributes.production?.data == null ? (
                          <td>
                            <Center>
                              {
                                data.attributes.department?.data?.attributes
                                  .department_name
                              }
                            </Center>
                          </td>
                        ) : (
                          <td>
                            <Center>
                              Produccion -{" "}
                              {
                                data.attributes.production?.data?.attributes
                                  .name
                              }
                            </Center>
                          </td>
                        )}
                        <td>
                          <Center>{data.attributes.model}</Center>
                        </td>
                        <td>
                          <Center>
                            {data.attributes.maintenance?.data?.attributes
                              .maintenance_date == null
                              ? " Por asignar"
                              : Fecha(
                                  data.attributes.maintenance?.data?.attributes
                                    .maintenance_date
                                )}
                          </Center>
                        </td>
                        <td>
                          {data.attributes.maintenance?.data?.attributes
                            .next_maintenance == null
                            ? " Por asignar"
                            : Fecha(
                                data.attributes.maintenance?.data?.attributes
                                  .next_maintenance
                              )}
                        </td>

                        <td>
                          {data.attributes.maintenance?.data?.attributes
                            .maintenance_type_next == null
                            ? " Por asignar"
                            : data.attributes.maintenance?.data?.attributes
                                .maintenance_type_next}
                        </td>
                        {session.id != 9 ? 
                        <td>
                          <div className={styles.icons}>
                            <Tooltip label="Registrar Mantenimiento">
                              <ActionIcon
                                color="indigo"
                                variant="transparent"
                                onClick={() => {
                                  setOpenedMaint(true);
                                  setDeviceToMaint(data);
                                }}
                              >
                                <IconTool size={18} />
                              </ActionIcon>
                            </Tooltip>

                            <Tooltip label="Posponer Fecha">
                              <ActionIcon
                                onClick={() => {
                                  setMaintToPostPone(data);
                                  setOpened(true);
                                }}
                                variant="transparent"
                              >
                                <IconRotateClockwise2 color="green" size={18} />
                              </ActionIcon>
                            </Tooltip>
                          </div>
                        </td>
                        : null }
                      </tr>
                    ) : null
                  )}
              </tbody>
            </Table>}
          </ScrollArea>
        </div>
      </Center>


      {maintToPostpone && (
        <Modal
          centered
          opened={opened}
          onClose={() => setOpened(false)}
          title="Posponer Mantenimiento"
        >
          <Postpone
            maintToPostpone={{ ...maintToPostpone }}
            closeModal={closeModal}
          />
        </Modal>
      )}

      {deviceToMaint && (
        <Modal
          centered
          className={stylesModal.modal__container}
          transition="fade"
          size={850}
          transitionDuration={400}
          transitionTimingFunction="ease"
          opened={openedMaint}
          onClose={() => setOpenedMaint(false)}
          title="Registrar Mantenimiento"
        >
          <hr />
          <ModalMaint
            deviceToMaint={{ ...deviceToMaint }}
            closeModal2={closeModal2}
          />
        </Modal>
      )}
    </>
  );
};
/* Exporting the component. */
export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  // Check if session exists or not, if not, redirect
  if (session == null || session.id === 9) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
export default TableDevices;
