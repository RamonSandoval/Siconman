/* Importing the components from the library @mantine/core. */
import {
  createStyles,
  Header,
  Menu,
  Group,
  Button,
  UnstyledButton,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  Image,
  Collapse,
  Modal,
  Text,
  ActionIcon,
} from "@mantine/core";
/* Importing the hook useDisclosure from the library @mantine/hooks. */
import { useDisclosure } from "@mantine/hooks";
/* Importing the Link component from the next/link package. */
import Link from "next/link";
/* Importing the icon from the library @tabler/icons. */
import {
  IconChevronDown,
  IconClipboard,
  IconInfoCircle,
  IconLogout,
} from "@tabler/icons";
/* Importing the useEffect and useState hooks from the react library. */
import React, { useEffect, useState } from "react";
/* Importing the styles for the modal. */
import stylesModal from "../styles/ModalRegisterNewMaint.module.css";
/* Importing the styles for the navbar. */
import styles from "../styles/NavBar.module.css";
/* Importing the component ModalNewMaint from the file ModalNewMaint.js. */
import ModalNewMaint from "./ModalNewMaint";
/* Importing the component ModalMaint from the file ModalMaint.js. */
import ModalMaint from "./modals/ModalMaint";
import {
  IconSettings,
} from "@tabler/icons";
import { signOut, useSession } from "next-auth/react";

/* A function that returns a hook that alldows you to use styles in a functional component. */
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

export function Nav() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  /* A hook that allows you to use state in a functional component. */
  const [opened, setOpened] = useState(false);

  const [openedMaint, setOpenedMaint] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
  }, [session]); 
  return (
    <>
      <Box pb={70}>
        <Header className={styles.header__container} height={60} px="md">
          <Group className={styles.groupContainerMain} sx={{ height: "100%" }}>
            <div>
              <a href="/">
              <Image className={styles.logo}
                alt="Dialight Logo"
                src="/assets/img/logos/dialight_logo.png"
                width={200}
              ></Image>
              </a>
            </div>

            <div className={styles.groupContainer} >
            <Group
              sx={{ height: "100%" }}
              spacing={30}
              className={classes.hiddenMobile}
            >
              <Link href="/" className={classes.link}>
                Inicio
              </Link>
              
              <Link href="/maintenance" className={classes.link}>
                Mantenimientos
              </Link>

              <Link href="/calendarmaintenance" className={classes.link}>
                Calendario
              </Link>
              <Link href="/inventory" className={classes.link}>
                Inventario
              </Link>
              <Link href="/reports" className={classes.link}>
                Reportes
              </Link>
              <Link href="/config" className={classes.link}>
                Configuracion
              </Link>
              <Menu shadow="md" width={290}>
                <Menu.Target>
                  <Button color="dark" variant="transparent">
                    <ActionIcon>
                      <IconLogout color="black"/>
                    </ActionIcon>
                    {/* {session.user.email} */}
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Opciones</Menu.Label>
                  <Menu.Item onClick={signOut} icon={<IconLogout size={14} />}>
                    Cerrar Sesion
                  </Menu.Item>
                  
                </Menu.Dropdown>
              </Menu>
            </Group>
            </div>
            <Group className={classes.hiddenMobile}>
              <p></p>
            </Group>

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
              Configuracion
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
                    Cerrar Sesion
                  </Menu.Item>
                  
                </Menu.Dropdown>
              </Menu>

            
          </ScrollArea>
        </Drawer>
      </Box>
      <Modal
        className={stylesModal.modal__container}
        transition="fade"
        size={850}
        transitionDuration={400}
        transitionTimingFunction="ease"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Registrar Nuevo Mantenimiento"
      >
        <hr />
        <ModalNewMaint />
      </Modal>

      <Modal
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
        <ModalMaint />
      </Modal>
    </>
  );
}
