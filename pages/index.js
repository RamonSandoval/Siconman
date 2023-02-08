import Head from "next/head";
import styles from "../styles/Home.module.css";
import TableDevices from "../components/TableDevices";
import SignIn from "./auth/sign-in";
/* Importing the components from the library @mantine/core. */
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
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { IconHelp, IconLogout } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
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

const Home = () => {
  const { data: session } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  /* A hook that allows you to use state in a functional component. */
  const [opened, setOpened] = useState(false);

  const [openedMaint, setOpenedMaint] = useState(false);

  //const { data: session } = useSession();

  useEffect(
    () => {
      /*  if (session == null) return;
    console.log("session.jwt", session.jwt); */
    } /* [session] */
  );

  /* It's a hook that is executed when the component is mounted. It's checking if the session is null
  or not. If it's null, it will return nothing. If it's not null, it will log the session.jwt. */
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
  }, [session]);

  /* Rendering the page. */
  const [active, setActive] = useState({ borderBottom: "2px solid indigo" });
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio</title>
      </Head>
      <h1>{session ? "" : <SignIn />}</h1>
      {/*It's a ternary operator. If session is true, it will render the TableDevices component. If
      not, it will render nothing. */}
      {session && (
        <>
          <>
            <Box pb={70} className={styles.headerMain}>
              <Header className={styles.header__container} height={60} px="md">
                <Group
                  className={styles.groupContainerMain}
                  sx={{ height: "100%" }}
                >
                  <div>
                    <a href="/">
                      <Image
                        className={styles.logo}
                        alt="Dialight Logo"
                        src="/assets/img/logos/logo_siconmandial.png"
                        width={200}
                      ></Image>
                    </a>
                  </div>

                  <div className={styles.groupContainer}>
                    <Group
                      sx={{ height: "100%" }}
                      spacing={30}
                      className={classes.hiddenMobile}
                    >
                      <a
                        href="/"
                        aria-current="page"
                        style={active}
                        className={styles.link}
                      >
                        Inicio
                      </a>

                      <a href="/maintenance" className={styles.link}>
                        Mantenimientos
                      </a>

                      <a href="/calendarmaintenance" className={styles.link}>
                        Calendario
                      </a>
                      <a href="/inventory" className={styles.link}>
                        Inventario
                      </a>
                      <a href="/reports" className={styles.link}>
                        Reportes
                      </a>
                      {session.id != 9 ? (
                        <a href="/config" className={styles.link}>
                          Configuración
                        </a>
                      ) : null}

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
                            Cerrar Sesión
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
                  {session.id != 9 ? (
                    <a href="/config" className={classes.link}>
                      Configuración
                    </a>
                  ) : null}

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
                      <Menu.Item
                        onClick={signOut}
                        icon={<IconLogout size={14} />}
                      >
                        Cerrar Sesión
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </ScrollArea>
              </Drawer>
            </Box>
          </>
          <TableDevices />
        </>
      )}{" "}
     
    </div>
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
  if (session == null) {
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

export default Home;
