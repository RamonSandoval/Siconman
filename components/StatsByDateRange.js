import React, { createContext } from "react";
import api from "../services/api";
import stylesModal from "../styles/ModalRegisterNewMaint.module.css";
import Notifications from "./Notifications";

import {
  ScrollArea,
  Table,
  TextInput,
  Modal,
  Center,
  Loader,
  Divider,
  Button,
  Text,
  Tooltip,
  createStyles
} from "@mantine/core";
import { useState, useEffect } from "react";
import { ThemeIcon } from "@mantine/core";
import { IconFilter, IconRefresh, IconSearch } from "@tabler/icons";
import styles from "../styles/StatsByDateRange.module.css";
import { ActionIcon } from "@mantine/core";
import { Fecha } from "../helpers";
import Postpone from "./modals/ModalPostpone";
import ModalMaint from "./modals/ModalMaint";

const Stats = () => {
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [search3, setSearch3] = useState("");
  const [search4, setSearch4] = useState("");
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [maintToPostpone, setMaintToPostPone] = useState([]);
  const [openedMaint, setOpenedMaint] = useState(false);
  const [deviceToMaint, setDeviceToMaint] = useState({});
  const [errorDateNull, setErrorDateNull] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    init();
  }, []);
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

  async function init() {
    setIsLoading(true);
    const list = await api.devicesList();
    setarrayDevices(list.data);
    setarrayDataDev(list.data);
    setIsLoading(false);
  }

  const closeModal = () => {
    setOpened(false);
    init();
  };

  const closeModal2 = () => {
    setOpenedMaint(false);
    init();
  };

  const min = (e) => {
    setSearch(e.target.value);
  };

  const max = (e) => {
    setSearch2(e.target.value);
  };

  const dep = (e) => {
    setSearch3(e.target.value);
  };

  const prod = (e) => {
    setSearch4(e.target.value);
  };

  const filtrar = () => {
    if (search != "" && search2 != "") {
      setErrorDateNull("");
      const resultado = arrayDataDev.filter(
        (f) =>
          (f.attributes.maintenance?.data?.attributes.maintenance_date >=
            search &&
            f.attributes.maintenance?.data?.attributes.maintenance_date <=
              search2 &&
            f.attributes.department?.data?.attributes.department_name
              .toString()
              .toLowerCase()
              .includes(search3.toLowerCase())) ||
          f.attributes.production?.data?.attributes.name
            .toString()
            .toLowerCase()
            .includes(search3.toLowerCase())
      );
      setarrayDevices(resultado);
    } else {
      Notifications.error("Ingrese un rango de fecha ");
    }
  };

  function compare_date(a, b) {
    if (
      a.attributes.maintenance?.data?.attributes?.maintenance_date <
      b.attributes.maintenance?.data?.attributes?.maintenance_date
    ) {
      return -1;
    }
    if (
      a.attributes.maintenance?.data?.attributes?.maintenance_date >
      b.attributes.maintenance?.data?.attributes?.maintenance_date
    ) {
      return 1;
    }
    return 0;
  }

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
                <IconFilter />
              </ThemeIcon>
              <p>Filtrar mantenimientos por rango de fechas</p>
            </div>
            <div className={styles.searchBar}>
              <Center>
                <TextInput
                  pr={10}
                  placeholder="Nombre Deparamento"
                  value={search3}
                  onChange={dep}
                  icon={<IconSearch />}
                />
                {/* <TextInput
                label="Area de Produccion"
                placeholder="Buscar"
                value={search4}
                onChange={prod}
                icon={<IconSearch />}
              /> */}
              </Center>
              <Center pr={5}>Desde:</Center>
              <input type="date" value={search} onChange={min} />
              <Center pl={2} pr={5}>
                al:{" "}
              </Center>
              <input type="date" value={search2} onChange={max} />
              <Tooltip label="Filtrar Mantenimientos">
                <Button
                  onClick={() => filtrar()}
                  leftIcon={<IconFilter />}
                  variant="gradient"
                  gradient={{ from: "#00255b", to: "#00255b", deg: 75 }}
                >
                  Filtrar
                </Button>
              </Tooltip>
              <Center>
                <Tooltip label="Refrescar lista">
                  <ActionIcon
                    onClick={() => init()}
                    className={styles.refresh__icon}
                    variant="filled"
                  >
                    <IconRefresh size={30} />
                  </ActionIcon>
                </Tooltip>
              </Center>
              {errorDateNull != "" && <Text color="red">{errorDateNull}</Text>}
            </div>
          </div>
          <ScrollArea>
            <Divider variant="dashed" size="sm" my="sm" />
            <ScrollArea
            sx={{ height: 600 }}
            onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
          >
            {isLoading ? (
              <Center className={styles.loading}>
                <Loader variant="bars" />
              </Center>
            ) : (
              <Table highlightOnHover>
                <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
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
                    {/* <th>
                    <Center>Acciones</Center>
                  </th> */}
                  </tr>
                </thead>
                <tbody>
                  {arrayDevices &&
                    arrayDevices.sort(compare_date).map(
                      (data, index) =>
                        (
                          <tr
                            className={styles.table__data}
                            key={data.device_id}
                          >
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
                                  Producción -{" "}
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
                                      data.attributes.maintenance?.data
                                        ?.attributes.maintenance_date
                                    )}
                              </Center>
                            </td>
                            <td>
                              {data.attributes.maintenance?.data?.attributes
                                .next_maintenance == null
                                ? " Por asignar"
                                : Fecha(
                                    data.attributes.maintenance?.data
                                      ?.attributes.next_maintenance
                                  )}
                            </td>
                            <td>
                              {
                                data.attributes.maintenance?.data?.attributes
                                  .maintenance_type_next
                              }
                            </td>
                            {/* <td>
                            <div className={styles.icons}>
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
                              <ActionIcon
                                onClick={() => {
                                  setMaintToPostPone(data);
                                  setOpened(true);
                                }}
                                variant="transparent"
                              >
                                <IconRotateClockwise2 color="green" size={18} />
                              </ActionIcon>
                            </div>
                          </td> */}
                          </tr>
                        )
                    )}
                </tbody>
                
              </Table>
              
            )}
            </ScrollArea>
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
          title="Realizar Mantenimiento"
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

export default Stats;
