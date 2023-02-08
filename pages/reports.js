import { Center,Tabs, Tooltip } from "@mantine/core";
import styles from "../styles/Tabs.module.css";
import {
  IconCalendarEvent,
  IconBuilding,
  IconStatusChange,
  IconHelp,
} from "@tabler/icons";
import DepartmentAreaStats from "../components/Lists/DepartmentAreaStats";
import SignIn from "./auth/sign-in";
import StatsDepartments from "../components/StatsDepartments";
import ProductionAreaStats from "../components/Lists/ProductionAreaStats";
import StatsProduction from "../components/StatsProduction";
import StatsByDateRange from "../components/StatsByDateRange";
import QualityStats from "../components/QualityStats";
import MaintStat from "../components/MaintStat";

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
import {
  IconLogout,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import styles2 from "../styles/NavBar.module.css";
import { signOut, useSession } from "next-auth/react";
import { getSession } from 'next-auth/react';
import Head from "next/head";

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
/**
 * If the session is null, return. Otherwise, log the session.jwt.
 */
const reports = () => {
  const { data: session } = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  /* A hook that allows you to use state in a functional component. */
  const [opened, setOpened] = useState(false);

  const [openedMaint, setOpenedMaint] = useState(false);
const [active, setActive] = useState({ borderBottom: '2px solid indigo' });
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
  }, [session]);

  /* Rendering the page. */
  return (
    <>
    <Head>
        <title>Reportes</title>
      </Head>
      <h1>{session ? "" : <SignIn />}</h1>
      {session && 
     <Box pb={70}>
        <Header className={styles2.header__container} height={60} px="md">
          <Group className={styles2.groupContainerMain} sx={{ height: "100%" }}>
            <div>
              <a href="/">
              <Image className={styles2.logo}
                alt="Dialight Logo"
                src="/assets/img/logos/logo_siconmandial.png"
                width={200}
              ></Image>
              </a>
            </div>

            <div className={styles2.groupContainer} >
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
              <a href="/reports" style={active}  className={styles2.link}>
                Reportes
              </a>
              {session.id != 9 ?
              <a href="/config" className={styles2.link}>
              Configuración
              </a> : null }
             
              <Menu shadow="md" width={290}>
                <Menu.Target>
                    <ActionIcon>
                      <IconLogout color="black"/>
                    </ActionIcon>
                    
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Opciones</Menu.Label>
                  <Menu.Item onClick={signOut} icon={<IconLogout size={14} />}>
                    Cerrar Sesión
                  </Menu.Item>
                  
                </Menu.Dropdown>
              </Menu>
            </Group>
            </div>
            <Group className={classes.hiddenMobile}>
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
            {session.id != 9 ? 
            <a href="/config" className={classes.link}>
            Configuración
            </a> : null }

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
                    Cerrar Sesión
                  </Menu.Item>
                  
                </Menu.Dropdown>
              </Menu>
          </ScrollArea>
        </Drawer>
      </Box>}

      {session && (
        <Tabs defaultValue="mantMes" className={styles.tabs__container}>
          <Tabs.List>
            <Tabs.Tab icon={<IconCalendarEvent size={14} />} value="mantMes">
              Mantenimientos Realizados
            </Tabs.Tab>

            <Tabs.Tab icon={<IconBuilding size={14} />} value="mantDep">
              Equipos por Departamento
            </Tabs.Tab>
            <Tabs.Tab icon={<IconBuilding size={14} />} value="mantProd">
              Equipos por Área de Producción
            </Tabs.Tab>

            <Tabs.Tab icon={<IconStatusChange size={14} />} value="quality">
              Calidad de Atención
            </Tabs.Tab>

            <Tabs.Tab icon={<IconStatusChange size={14} />} value="maintType">
              Tipos de Mantenimientos
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel pt={20} value="mantMes">
            <StatsByDateRange />
          </Tabs.Panel>

          <Tabs.Panel
            pt={20}
            value="mantDep"
            className={styles.DepartmentAreaStats}
          >
            <StatsDepartments />
            <Center pt={50}>
              <h4>Listado de Equipos por Departamento</h4>
            </Center>
            <DepartmentAreaStats />
          </Tabs.Panel>

          <Tabs.Panel
            pt={20}
            value="mantProd"
            className={styles.DepartmentAreaStats}
          >
            <StatsProduction />
            <Center pt={50}>
              <h4>Listado de Equipos por Área de Producción</h4>
            </Center>
            <ProductionAreaStats />
          </Tabs.Panel>

          <Tabs.Panel pt={20} value="quality">
            <QualityStats />
          </Tabs.Panel>

          <Tabs.Panel pt={20} value="maintType">
            <MaintStat />
          </Tabs.Panel>
        </Tabs>
      )}
      
    </>
  );
};

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

export default reports;
