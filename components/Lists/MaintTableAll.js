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
  Pagination,
  Button
} from "@mantine/core";
import { usePagination, useSetState } from '@mantine/hooks';

import { useState, useEffect } from "react";
import {
  IconCirclePlus,
  IconHistory,
  IconListDetails,
  IconRotateClockwise2,
  IconSearch,
  IconTool,
} from "@tabler/icons";
import styles from "../../styles/TableMaint.module.css";
import { ActionIcon, ThemeIcon, createStyles } from "@mantine/core";
import Layout from "../Layout";
import { Fecha } from "../../helpers";
import Postpone from "../modals/ModalPostpone";
import { IconList } from "@tabler/icons";
import ModalMaint from "../modals/ModalMaint";
import ModalMaintHistory from "../modals/ModalMaintHistory";
import ModalCreateMaint from "../modals/ModalCreateMaint";

const MaintTableAll = () => {
  const [isLoading, setLoading] = useState(false);
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
  const pagination = usePagination({total:10, initialPage: 1})
  const [activePage, setPage] = useState(1)
  const [maintCompare,setMaintCompare] = useSetState('')

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


  useEffect(() => {
    init();
  }, []);

  async function init() {
    const list = await api.devicesList(activePage);
    setarrayDevices(list.data);
    setarrayDataDev(list.data);
  }
  const [maintState,setMaintState] = useState(true)

  const comp = arrayDevices.map((d) => {
    if((d.attributes?.maintenance.data) === 0 ){
      setMaintState(true)
    }
    return setMaintState
    if(d.attributes?.maintenance.data != null){
     setMaintState(false)
    }
    return setMaintState

  });

  function compare_date(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  }

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
          .includes(search.toLowerCase())||
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
  function actualizar (){
    console.log(activePage+1)
    init()
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
                    <Center>Proximo Mantenimiento</Center>
                  </th>
                  <th>
                    <Center>Tipo de Manteniemiento</Center>
                  </th>
                  <th>
                    <Center>Acciones</Center>
                  </th>
                  <th>
                    <Center>
                      Manteniemiento?
                    </Center>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {arrayDevices &&
                  arrayDevices.sort(compare_date).map((data) => (
                    <tr className={styles.table__data} key={data.device_id}>
                      <td bgcolor={maintCompare}>
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
                            color="dark"
                            variant="transparent"
                            onClick={() => {
                              setOpenedMaint(true);
                              setDeviceToMaint(data);
                            }}
                          >
                            <IconTool size={18} />
                          </ActionIcon>

                          <ActionIcon
                            color="yellow"
                            onClick={() => {
                              setOpenedMaintHistory(true);
                              setDeviceToMaintHistory(data);
                            }}
                          >
                            <IconHistory size={18} />
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
                          <ActionIcon
                            variant="light"
                            color="green"
                            disabled={maintState}
                            onClick={() => {
                              setOpenedMaintNew(true);
                              setDeviceToMaintNew(data);
                            
                            }}
                          >
                            <IconCirclePlus size={18} />
                          </ActionIcon>
                        </div>
                      </td>
                      <td>{}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ScrollArea>
          <Center pt={30}>
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
