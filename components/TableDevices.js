import React, { createContext } from "react";
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
} from "@mantine/core";
import { useState, useEffect } from "react";
import { ThemeIcon } from "@mantine/core";
import {
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

const TableDevices = () => {
  const [isLoading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const [arrayDataDev, setarrayDataDev] = useState([]);
  const [arrayDevices, setarrayDevices] = useState([]);
  const [maintToPostpone, setMaintToPostPone] = useState([]);
  const [openedMaint, setOpenedMaint] = useState(false);
  const [deviceToMaint, setDeviceToMaint] = useState({});

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

  const handleChange = (e) => {
    setSearch(e.target.value);
    filtrar(e.target.value);
  };

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
          .includes(search.toLowerCase()) ||
        e.attributes.model
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        return e;
      }
    });
    setarrayDevices(resultado);
  };

  const deviceList = arrayDevices.map((d) => {
    return(
      d
    );
  });

  const filterList = arrayDevices.map((d) => {
    return(
      d.attributes.maintenance?.data?.attributes?.next_maintenance
    );
  });

  function compare_date(a,b){
    if(a.attributes.maintenance?.data?.attributes?.next_maintenance < b.attributes.maintenance?.data?.attributes?.next_maintenance){
      return -1;
    }
    if(a.attributes.maintenance?.data?.attributes?.next_maintenance > b.attributes.maintenance?.data?.attributes?.next_maintenance){
      return 1;
    }
    return 0;

  }

  
  return (
    <>
      <Layout tituloPagina="Inicio" />
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
              <p>Proximos Mantenimientos</p>
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
                  <th>
                    <Center>Acciones</Center>
                  </th>
                </tr>
              </thead>
              <tbody>
                {deviceList &&
                  deviceList.sort(compare_date).map(
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
                          <td>
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
                          </td>
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

export default TableDevices;
