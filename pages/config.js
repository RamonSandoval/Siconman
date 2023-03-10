import { Modal, Tooltip } from "@mantine/core";
import styles from "../styles/Config.module.css";
import SignIn from "./auth/sign-in";
import api from "../services/api";
import Notifications from "../components/Notifications";
import { Tabs, Table, Center } from "@mantine/core";
import {
  IconSettings,
  IconUsers,
  IconPin,
  IconEdit,
  IconTrash,
  IconPlus,
  IconWorld,
  IconHelp,
} from "@tabler/icons";
import ModalAddDepartment from "../components/modals/ModalAddDepartment";
import UsersList from "../components/UsersList";
import ModalEditDeparment from "../components/modals/ModalEditDeparment";
import ModalAddProduction from "../components/modals/ModalAddProduction";
import ModalEditProduction from "../components/modals/ModalEditProduction";
import {
  createStyles,
  Header,
  Menu,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Image,
  Text,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { IconLogout } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import styles2 from "../styles/NavBar.module.css";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Help from "./Help";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: 42,
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: -theme.spacing.md,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md}px ${theme.spacing.md * 2}px`,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("lg")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("lg")]: {
      display: "none",
    },
  },
}));
const config = () => {
  const { data: session } = useSession();
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setArrayProd] = useState([]);
  const [opened, setOpened] = useState();
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [opened4, setOpened4] = useState(false);
  const [opened5, setOpened5] = useState(false);
  const [opened6, setOpened6] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState({});
  const [departmentToEdit, setDepartmentToEdit] = useState({});
  const [productionToDelete, setProductionToDelete] = useState({});
  const [productionToEdit, setProductionToEdit] = useState({});
  const [productionName, setProductionName] = useState({});
  const [openedHelp, setOpenedHelp] = useState(false);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  /* A hook that allows you to use state in a functional component. */

  const [openedMaint, setOpenedMaint] = useState(false);
  const [active, setActive] = useState({ borderBottom: "2px solid indigo" });

  const info = departmentToEdit.attributes?.department_name;

  /* Checking if the session is null, if it is, it returns. If it is not null, it logs the session.jwt
  and calls the init function. */
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);

    init();
  }, [session]);

  const closeModal = () => {
    setOpened2(false);
    init();
  };

  const closeModal2 = () => {
    setOpened(false);
    init();
  };
  const closeModal3 = () => {
    setOpened5(false);
    init();
  };
  /**
   * When the user clicks the close button, the modal is closed and the init() function is called.
   */
  const closeModal4 = () => {
    setOpened6(false);
    init();
  };

  /**
   * When the page loads, get the list of departments and productions from the API and store them in
   * the state variables arrayDep and arrayProd.
   */
  async function init() {
    const listDepartment = await api.departmentsList(1);
    const listProduction = await api.productionList(1);
    setArrayProd(listProduction.data);
    setarrayDep(listDepartment.data);
  }
  /**
   * It's an async function that calls the api.deleteDepartment function, which is an async function
   * that returns a promise.
   * If the promise is resolved, it calls the Notifications.success function, which is a function that
   * takes a string as an argument.
   * If the promise is rejected, it calls the Notifications.error function, which is a function that
   * takes a string as an argument.
   * It also calls the init function, which is a function that takes no arguments.
   *
   * @param id the id of the department to be deleted
   */
  async function deleteDepartment(id) {
    try {
      await api.deleteDepartment(id);
      Notifications.success("Se ha eliminado el departamento correctamente ");
      init();
    } catch (error) {
      Notifications.error("Error al eliminar el departamento");
      console.error(error);
    }
  }

  /**
   * Await api.deleteProduction(id);
   *
   * @param id the id of the production to be deleted
   */
  async function deleteProduction(id) {
    try {
      await api.deleteProduction(id);
      Notifications.success(
        "Se ha eliminado el ??rea de Producci??n " +
          productionName +
          " correctamente"
      );
      init();
    } catch (error) {
      Notifications.error("Error al eliminar el ??rea de Producci??n" + id);
    }
  }

  /**
   * If the department name of the first object is less than the department name of the second object,
   * return -1. If the department name of the first object is greater than the department name of the
   * second object, return 1. If the department names are equal, return 0.
   *
   * @param a the first object to compare
   * @param b the second object to compare
   *
   * @return the sorted array.
   */
  function compare_nameDep(a, b) {
    if (
      a.attributes.department_name.toLowerCase() <
      b.attributes.department_name.toLowerCase()
    ) {
      return -1;
    }
    if (
      a.attributes.department_name.toLowerCase() >
      b.attributes.department_name.toLowerCase()
    ) {
      return 1;
    }
    return 0;
  }

  /**
   * It takes two objects, compares their name attributes, and returns a value based on the result of
   * the comparison.
   *
   * @param a The first object to compare.
   * @param b the second object to compare
   *
   * @return a number.
   */
  function compare_nameProd(a, b) {
    if (a.attributes.name.toLowerCase() < b.attributes.name.toLowerCase()) {
      return -1;
    }
    if (a.attributes.name.toLowerCase() > b.attributes.name.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  /* A React component that is rendering a modal. */
  return (
    <>
      <Head>
        <title>Configuracion</title>
      </Head>
      <h1>{session ? "" : <SignIn />}</h1>

      {session && (
        <Box pb={70}>
          <Header className={styles2.header__container} height={60} px="md">
            <Group
              className={styles2.groupContainerMain}
              sx={{ height: "100%" }}
            >
              <div>
                <a href="/">
                  <Image
                    className={styles2.logo}
                    alt="Dialight Logo"
                    src="/assets/img/logos/logo_siconmandial.png"
                    width={200}
                  ></Image>
                </a>
              </div>

              <div className={styles2.groupContainer}>
                <Group
                  sx={{ height: "100%" }}
                  spacing={30}
                  className={classes.hiddenMobile}
                >
                  <a href="/" aria-current="page" className={styles2.link}>
                    Inicio
                  </a>

                  <a href="/maintenance" className={styles2.link}>
                    Mantenimientos
                  </a>

                  <a href="/calendarmaintenance" className={styles2.link}>
                    Calendario
                  </a>
                  <a href="/inventory" className={styles2.link}>
                    Inventario
                  </a>
                  <a href="/reports" className={styles2.link}>
                    Reportes
                  </a>
                  <a href="/config" style={active} className={styles2.link}>
                    Configuraci??n
                  </a>

                  <Menu shadow="md" width={290}>
                    <Menu.Target>
                      <ActionIcon>
                        <IconLogout color="black" />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>Opciones</Menu.Label>
                      <Menu.Item
                        onClick={signOut}
                        icon={<IconLogout size={14} />}
                      >
                        Cerrar Sesi??n
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </div>
              <Group className={classes.hiddenMobile}></Group>

              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                className={classes.hiddenDesktop}
              />
            </Group>
          </Header>

          <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            title="Opciones"
            className={classes.hiddenDesktop}
            zIndex={1000000}
          >
            <ScrollArea sx={{ height: "calc(100vh - 60px)" }} mx="-md">
              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />

              <a href="/" className={classes.link}>
                Inicio
              </a>
              <a href="/maintenance" className={classes.link}>
                Mantenimientos
              </a>

              <a href="/calendarmaintenance" className={classes.link}>
                <Box component="span" mr={5}>
                  Calendario
                </Box>
              </a>
              <a href="/inventory" className={classes.link}>
                Inventario
              </a>
              <a href="reports" className={classes.link}>
                Reportes
              </a>
              <a href="/config" className={classes.link}>
                Configuraci??n
              </a>

              <Divider
                my="sm"
                color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
              />
              <Menu shadow="md" width={290}>
                <Menu.Target>
                  <Button color="dark" variant="transparent">
                    {/* {session.user.email}  */}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Opciones</Menu.Label>
                  <Menu.Item onClick={signOut} icon={<IconLogout size={14} />}>
                    Cerrar Sesi??n
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </ScrollArea>
          </Drawer>
        </Box>
      )}

      <div className={styles.mainContainer}>
        <Tabs defaultValue="users" className={styles.tabsContainer}>
          <Tabs.List>
            <Tabs.Tab value="users" icon={<IconUsers size={14} />}>
              Usuarios
            </Tabs.Tab>
            <Tabs.Tab value="departments" icon={<IconPin size={14} />}>
              Departamentos
            </Tabs.Tab>
            <Tabs.Tab value="production" icon={<IconWorld size={14} />}>
              Producci??n
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="users" pt="xs">
            <UsersList />
          </Tabs.Panel>

          <Tabs.Panel value="departments" pt="xs">
            <div className={styles.iconContainer}>
              <Tooltip label="Crear nuevo Departamento">
                <ActionIcon
                  onClick={() => setOpened(true)}
                  className={styles.add__icon}
                  variant="filled"
                >
                  <IconPlus size={30} />
                </ActionIcon>
              </Tooltip>
            </div>
            <Table highlightOnHover>
              <thead>
                <tr className={styles.table__titles}>
                  <th>
                    <Center>ID</Center>
                  </th>
                  <th>
                    <Center>Departamento</Center>
                  </th>
                  <th>
                    <Center>Acciones</Center>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {arrayDep &&
                  arrayDep.sort(compare_nameDep).map((data) => (
                    <tr key={data.department_name}>
                      <td>
                        <Center>{data.id}</Center>
                      </td>
                      <td>
                        <Center>{data.attributes.department_name}</Center>
                      </td>
                      <td>
                        <Center>
                          <div className={styles.icons}>
                            <Tooltip label="Editar">
                              <ActionIcon
                                color="indigo"
                                onClick={() => {
                                  setOpened2(true);
                                  setDepartmentToEdit(data);
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
                                  setDepartmentToDelete(data.id);
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
          </Tabs.Panel>

          <Tabs.Panel value="production" pt="xs">
            <div className={styles.iconContainer}>
              <Tooltip label="Crear nueva ??rea de Producci??n">
                <ActionIcon
                  onClick={() => setOpened5(true)}
                  className={styles.add__icon}
                  variant="filled"
                >
                  <IconPlus size={30} />
                </ActionIcon>
              </Tooltip>
            </div>
            <Table highlightOnHover>
              <thead>
                <tr className={styles.table__titles}>
                  <th>
                    <Center>ID</Center>
                  </th>
                  <th>
                    <Center> ??rea de Producci??n</Center>
                  </th>
                  <th>
                    <Center>Acciones</Center>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {arrayProd &&
                  arrayProd.sort(compare_nameProd).map((data) => (
                    <tr key={data.department_name}>
                      <td>
                        <Center>{data.id}</Center>
                      </td>
                      <td>
                        <Center>{data.attributes.name}</Center>
                      </td>
                      <td>
                        <Center>
                          <div className={styles.icons}>
                            <Tooltip label="Editar">
                              <ActionIcon
                                color="indigo"
                                onClick={() => {
                                  setOpened6(true);
                                  setProductionToEdit(data);
                                }}
                              >
                                <IconEdit size={18} />
                              </ActionIcon>
                            </Tooltip>

                            <Tooltip label="Eliminar">
                              <ActionIcon
                                color="red"
                                onClick={() => {
                                  setOpened4(true);
                                  setProductionToDelete(data.id);
                                  setProductionName(data.attributes.name);
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
          </Tabs.Panel>
        </Tabs>
      </div>
      
      {/* MODAL ADD DEPARTMENT */}
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Agregar departamento"
      >
        <ModalAddDepartment closeModal2={closeModal2} />
      </Modal>

      {/* MODAL ADD PRODUCTION */}
      <Modal
        centered
        opened={opened5}
        onClose={() => setOpened5(false)}
        title="Agregar ??rea de Producci??n"
      >
        <ModalAddProduction closeModal3={closeModal3} />
      </Modal>

      {/* MODAL EDIT DEPARTMENT */}
      {departmentToEdit && (
        <Modal
          centered
          title={"Editar Departamento"}
          opened={opened2}
          onClose={() => setOpened2(false)}
        >
          <ModalEditDeparment
            closeModal={closeModal}
            departmentToEdit={{ ...departmentToEdit }}
          />
        </Modal>
      )}

      {/* MODAL EDIT PRODUCTION */}
      {productionToEdit && (
        <Modal
          centered
          title={"Editar ??rea de Producci??n"}
          opened={opened6}
          onClose={() => setOpened6(false)}
        >
          <ModalEditProduction
            closeModal4={closeModal4}
            productionToEdit={{ ...productionToEdit }}
          />
        </Modal>
      )}

      {/* MODAL DELETE DEPARTMENT */}
      <Modal
        centered
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={
          <Text size="lg">Seguro que desea eliminar el departamento?</Text>
        }
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened3(false)} color="red">
            Cancelar
          </Button>
          <Button variant="gradient"
              gradient={{ from: "#00255b", to: "#00255b", deg: 75 }}
            onClick={() =>
              deleteDepartment(departmentToDelete).then(() => setOpened3(false))
            }
          >
            Confirmar
          </Button>
        </div>
      </Modal>

      {/* MODAL DELETE PRODUCTION */}
      <Modal
        centered
        opened={opened4}
        onClose={() => setOpened4(false)}
        title={
          <Text size="lg">
            Seguro que desea eliminar el ??rea de Producci??n "{productionName}"{" "}
          </Text>
        }
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened4(false)} color="red">
            Cancelar
          </Button>
          <Button
          variant="gradient"
          gradient={{ from: "#00255b", to: "#00255b", deg: 75 }} type="submit"
            onClick={() =>
              deleteProduction(productionToDelete).then(() => setOpened4(false))
            }
          >
            Confirmar
          </Button>
        </div>
      </Modal>
      {/* MODAL MANUAL DE USUARIO */}
      <Modal
        className={styles.helpModal}
        opened={openedHelp}
        centered
        onClose={() => setOpenedHelp(false)}
        title="Manual de Usuario"
      >
        <Help />
      </Modal>
    </>
  );
};
/**
 * If the user is not logged in, redirect them to the sign-in page
 *
 * @param context The context object that Next.js provides to getInitialProps.
 *
 * @return The return value is an object with a redirect property.
 */
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
/* Exporting the config object. */
export default config;
