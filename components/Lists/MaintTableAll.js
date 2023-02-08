import React, { createContext } from "react";
import api from "../../services/api";
import stylesModal from "../../styles/ModalRegisterNewMaint.module.css";
import {
  ScrollArea,
  Table,
  TextInput,
  Modal,
  Center,
  Divider,
  Tooltip,
  Loader,
} from "@mantine/core";
import { useSetState } from "@mantine/hooks";

import { useState, useEffect } from "react";
import {
  IconCirclePlus,
  IconHistory,
  IconListDetails,
  IconRotateClockwise2,
  IconSearch,
  IconTool
} from "@tabler/icons";
import styles from "../../styles/TableMaint.module.css";
import { ActionIcon, ThemeIcon, createStyles } from "@mantine/core";
import { Fecha } from "../../helpers";
import Postpone from "../modals/ModalPostpone";
import ModalMaint from "../modals/ModalMaint";
import ModalMaintHistory from "../modals/ModalMaintHistory";
import ModalCreateMaint from "../modals/ModalCreateMaint";

const MaintTableAll = () => {
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [deviceToMaintNew, setDeviceToMaintNew] = useState({});
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [maintToPostpone, setMaintToPostPone] = useState([]);
  const [openedMaint, setOpenedMaint] = useState(false);
  const [openedMaintHistory, setOpenedMaintHistory] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [deviceToMaintHistory, setDeviceToMaintHistory] = useState({});
  const [deviceToMaint, setDeviceToMaint] = useState({});
  const [openedMaintNew, setOpenedMaintNew] = useState(false);
  const [maintColor, setMaintColor] = useState();
  const [maintCompare, setMaintCompare] = useSetState("");
  const [ isLoading, setIsLoading ] = useState(false);
  /* Creating a style object that will be used by the Header component. */
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

  /* Calling the init() function when the component mounts. */
  useEffect(() => {
    init();
  }, []);

  /**
   * When the page loads, get the list of devices from the API and store it in the arrayDevices
   * variable.
   */
  async function init() {
    setIsLoading(true);
    const list = await api.devicesList();
    setarrayDevices(list.data);
    setarrayDataDev(list.data);
    setIsLoading(false);
  }

  var arrayfiltrado = arrayDevices.filter(
    (data) =>
      data.attributes.maintenance?.data != null
  );
  var arrayfiltradoNull = arrayDevices.filter(
    (data) =>
      data.attributes.maintenance?.data == null
  );
  /**
   * If the date of the first object is less than the date of the second object, return -1. If the date
   * of the first object is greater than the date of the second object, return 1. If the dates are equal,
   * return 0.
   *
   * @param a The first object to be compared.
   * @param b the current item in the array
   *
   * @return the result of the comparison.
   */

  var deviceList = arrayfiltrado.sort(function (x, y) {
    // ordenar primero por el campo 'name'
    const fechaA = x.attributes.maintenance?.data?.attributes?.next_maintenance
    const fechaB = y.attributes.maintenance?.data?.attributes?.next_maintenance

    if (fechaA < fechaB) {
        return -1;
    }
 
    if (fechaA > fechaB) {
        return 1;
    }
    // si los nombres son iguales, ordenar por 'year'
    return 0;
});

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
  const closeModal3 = () => {
    setOpenedMaintNew(false);
    init();
  };

  const maintIndicator = () => {
    setMaintColor("green");
  };

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
    var resultado = arrayDataDev.filter((e) => {
      if (
        e.attributes.device_id
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        e.attributes.department?.data?.attributes.department_name
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        e.attributes.model
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        e.attributes.production?.data?.attributes.name
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        e.attributes.maintenance?.data?.attributes?.maintenance_type_next
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return e;
      }
    });
    setarrayDevices(resultado);
  };
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
              <p>Mantenimientos</p>
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
          <Divider variant="dashed" size="sm" my="sm" />
          
          
          <ScrollArea
            sx={{ height: 600 }}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            { isLoading ? 
              <Center className={styles.loading}>
              <Loader variant="bars"/> 
              </Center>:
            <Table highlightOnHover>
              <thead
                className={cx(classes.header, { [classes.scrolled]: scrolled })}
              >
                <tr>
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
                  <th>
                    <Center>Acciones</Center>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {deviceList &&
                  deviceList.concat(arrayfiltradoNull).map((data) => (
                    <tr className={styles.table__data} key={data.device_id}>
                      <td bgcolor={maintCompare}>
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
                            {data.attributes.production?.data?.attributes.name}
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
                      <td>
                        <div className={styles.icons}>
                          <Tooltip label="Registrar Mantenimiento">
                            <ActionIcon
                              color="dark"
                              variant="transparent"
                              onClick={() => {
                                setOpenedMaint(true);
                                setDeviceToMaint(data);
                              }}
                            >
                              <IconTool size={18} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Historial Mantenimiento">
                            <ActionIcon
                              color="yellow"
                              onClick={() => {
                                setOpenedMaintHistory(true);
                                setDeviceToMaintHistory(data);
                              }}
                            >
                              <IconHistory size={18} />
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

                          {data.attributes.maintenance?.data == null ? (
                            <Tooltip label="Crear Nuevo Mantenimiento">
                              <ActionIcon
                                variant="light"
                                color="red"
                                onClick={() => {
                                  setOpenedMaintNew(true);
                                  setDeviceToMaintNew(data);
                                }}
                              >
                                <IconCirclePlus size={18} />
                              </ActionIcon>
                            </Tooltip>
                          ) : (
                            <Tooltip label="Crear Nuevo Mantenimiento">
                              <ActionIcon
                                variant="light"
                                disabled
                                color="red"
                                onClick={() => {
                                  setOpenedMaintNew(true);
                                  setDeviceToMaintNew(data);
                                }}
                              >
                                <IconCirclePlus size={18} />
                              </ActionIcon>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            }
          </ScrollArea>
          
          <Center pt={30}>
           
          </Center>
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

      {deviceToMaintHistory && (
        <Modal
          centered
          className={stylesModal.modal__container}
          transition="fade"
          size={850}
          transitionDuration={400}
          transitionTimingFunction="ease"
          opened={openedMaintHistory}
          onClose={() => setOpenedMaintHistory(false)}
          title={"Historial de mantenimiento previo realizado"}
        >
          <hr />
          <ModalMaintHistory
            maintIndicator={maintIndicator}
            deviceToMaintHistory={deviceToMaintHistory}
          />
        </Modal>
      )}

      {deviceToMaintNew && (
        <Modal
          centered
          className={stylesModal.modal__container}
          transition="fade"
          size={850}
          transitionDuration={400}
          transitionTimingFunction="ease"
          opened={openedMaintNew}
          onClose={() => setOpenedMaintNew(false)}
          title={"Crear Nuevo Mantenimiento"}
        >
          <hr />
          <ModalCreateMaint
            closeModal3={closeModal3}
            deviceToMaintNew={{ ...deviceToMaintNew }}
          />
        </Modal>
      )}
    </>
  );
};

export default MaintTableAll;