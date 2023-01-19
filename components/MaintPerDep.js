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
} from "@mantine/core";
import { useState, useEffect } from "react";
import { ThemeIcon } from "@mantine/core";
import {
  IconCalendar,
  IconCalendarDue,
  IconDatabase,
  IconFilter,
  IconListDetails,
  IconRotateClockwise2,
  IconSearch,
  IconTool,
} from "@tabler/icons";
import styles from "../styles/StatsByDateRange.module.css";
import { ActionIcon } from "@mantine/core";
import Layout from "./Layout";
import { Fecha } from "../helpers";
import Postpone from "./modals/ModalPostpone";
import ModalMaint from "./modals/ModalMaint";
import { DatePicker, DateRangePicker } from "@mantine/dates";

const MaintPerDep = () => {
  const [isLoading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [search3, setSearch3] = useState("");
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [maintToPostpone, setMaintToPostPone] = useState([]);
  const [openedMaint, setOpenedMaint] = useState(false);
  const [deviceToMaint, setDeviceToMaint] = useState({});
  const [errorDateNull, setErrorDateNull] = useState("");

  useEffect(() => {
    init();
  }, []);

  async function init() {
    setLoading(true);
    const list = await api.devicesList(1);
    const list2 = await api.devicesList(2);
    setarrayDevices(list.data.concat(list2.data));
    setarrayDataDev(list.data.concat(list2.data));
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

  const filtrar = () => {
    if (search != "" && search2 != "") {
      setErrorDateNull("");
      const resultado = arrayDataDev.filter(
        (f) =>
          f.attributes.maintenance?.data?.attributes.maintenance_date >=
            search &&
          f.attributes.maintenance?.data?.attributes.maintenance_date <= search2 &&

          f.attributes.department?.data?.attributes.department_name
          .toString()
          .toLowerCase()
          .includes(search3.toLowerCase()) 

      );
      setarrayDevices(resultado);
    } else {
      setErrorDateNull("Ingrese valores correctos");
    }
  };

  function compare_date(a, b) {
    if (
      a.attributes.maintenance?.data?.attributes?.next_maintenance <
      b.attributes.maintenance?.data?.attributes?.next_maintenance
    ) {
      return -1;
    }
    if (
      a.attributes.maintenance?.data?.attributes?.next_maintenance >
      b.attributes.maintenance?.data?.attributes?.next_maintenance
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
              <TextInput pr={10}
                placeholder="Buscar"
                value={search3}
                onChange={dep}
                icon={<IconSearch />}
              />
              </Center>
              <Center pr={5}>Desde:</Center>
              <input title="ss" type="date" value={search} onChange={min} />
              <Center pl={2} pr={5}>al: </Center>
              <input type="date" value={search2} onChange={max} />
              <Button
                onClick={() => filtrar()}
                leftIcon={<IconFilter />}
                color="blue"
              >
                Filtrar
              </Button>

              {errorDateNull != "" && <Text color="red">{errorDateNull}</Text>}
            </div>
          </div>
          <ScrollArea>
            <Divider variant="dashed" size="sm" my="sm" />

            <Table highlightOnHover>
              <thead className={styles.table__columns}>
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
                    <Center>Proximo Mantenimiento</Center>
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
                      index < 10 && (
                        <tr className={styles.table__data} key={data.device_id}>
                          <td>
                            <Center>{data.attributes.device_id}</Center>
                          </td>
                          <td>
                            <Center>
                              {
                                data.attributes.department?.data?.attributes
                                  .department_name
                              }
                              {
                                data.attributes.production?.data?.attributes
                                  .name
                              }
                            </Center>
                          </td>
                          <td>
                            <Center>{data.attributes.model}</Center>
                          </td>
                          <td>
                            <Center>
                              {Fecha(
                                data.attributes.maintenance?.data?.attributes
                                  .maintenance_date
                              )}
                            </Center>
                          </td>
                          <td>
                            {Fecha(
                              data.attributes.maintenance?.data?.attributes
                                .next_maintenance
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

export default MaintPerDep;
