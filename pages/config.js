import React from "react";
import Layout from "../components/Layout";
import { Button, Modal, Select, Text } from "@mantine/core";
import styles from "../styles/Config.module.css";
import { signOut, useSession } from "next-auth/react";
import { getSession } from 'next-auth/react';
import { useState, useEffect } from "react";
import SignIn from "./auth/sign-in";import api from "../services/api";
import Notifications from "../components/Notifications";
import { Tabs, Table, ActionIcon, Center } from "@mantine/core";
import {
  IconSettings,
  IconUsers,
  IconPin,
  IconEdit,
  IconTrash,
  IconPlus,
  IconWorld,
} from "@tabler/icons";
import ModalAddDepartment from "../components/modals/ModalAddDepartment";
import UsersList from "../components/UsersList";
import ModalEditDeparment from "../components/modals/ModalEditDeparment";
import ModalAddProduction from "../components/modals/ModalAddProduction";
import ModalEditProduction from "../components/modals/ModalEditProduction";
const config = () => {
  const { data: session } = useSession();
  const [arrayDep, setarrayDep] = useState([]);
  const [arrayProd, setArrayProd] = useState([])
  const [opened, setOpened] = useState();
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [opened4, setOpened4] = useState(false);
  const [opened5, setOpened5] = useState(false);
  const [opened6, setOpened6] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState({});
  const [departmentToEdit,setDepartmentToEdit] = useState({})
  const [productionToDelete, setProductionToDelete] = useState({})
  const [productionToEdit, setProductionToEdit] = useState({})
  const [productionName,setProductionName] = useState({})
  
  const info = departmentToEdit.attributes?.department_name


  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
    init();
  }, [session]);

  const closeModal = () =>{
    setOpened2(false);
    init();
  }

  const closeModal2 = () =>{
    setOpened(false);
    init();
  }
  const closeModal3 = () =>{
    setOpened5(false);
    init();
  }
  const closeModal4 = () =>{
    setOpened6(false);
    init();
  }

  async function init() {
    const listDepartment = await api.departmentsList(1);
    const listProduction = await api.productionList(1)
    setArrayProd(listProduction.data)
    setarrayDep(listDepartment.data);
  }
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

  async function deleteProduction(id){
    try{
      await api.deleteProduction(id);
      Notifications.success("Se ha eliminado el area de Produccion " + productionName + " correctamente");
      init();
    }catch(error){
      Notifications.error("Error al eliminar el area de Produccion"+ id);
    }
  }

  /*LISTS*/
  var departmentsListSelect = arrayDep.map((d) => {
    return d.attributes.department_name;
  });

    var remove0  = arrayProd.map((a) => {
      return 
})
      

  return (
    <>
    <h1>{session ? "" : <SignIn/>}</h1>
      <Layout tituloPagina="Configuracion" />
      {session && (
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
              Produccion
            </Tabs.Tab>
           
          </Tabs.List>

          <Tabs.Panel value="users" pt="xs">
            <UsersList />
          </Tabs.Panel>

          <Tabs.Panel value="departments" pt="xs">
            <div className={styles.iconContainer}>
              <ActionIcon
                onClick={() => setOpened(true)}
                className={styles.add__icon}
                variant="filled"
              >
                <IconPlus size={30} />
              </ActionIcon>
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
                  arrayDep.map((data) => (
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
                            <ActionIcon 
                            color="indigo" 
                            onClick={() => {
                              setOpened2(true); 
                              setDepartmentToEdit(data)
                              }}>
                              <IconEdit size={18} />
                            </ActionIcon>
                            <ActionIcon
                              color="red"
                              onClick={() => {
                                setOpened3(true);
                                setDepartmentToDelete(data.id);
                              }}
                            >
                              <IconTrash size={18} />
                            </ActionIcon>
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
              <ActionIcon
                onClick={() => setOpened5(true)}
                className={styles.add__icon}
                variant="filled"
              >
                <IconPlus size={30} />
              </ActionIcon>
            </div>
            <Table highlightOnHover>
              <thead>
                <tr className={styles.table__titles}>
                  <th>
                    <Center>ID</Center>
                  </th>
                  <th>
                    <Center>Area de Produccion</Center>
                  </th>
                  <th>
                    <Center>Acciones</Center>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {arrayProd && 
                  arrayProd.map((data) => (
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
                            <ActionIcon 
                            color="indigo" 
                            onClick={() => {
                              setOpened6(true); 
                              setProductionToEdit(data)
                              }}>
                              <IconEdit size={18} />
                            </ActionIcon>
                            <ActionIcon
                              color="red"
                              onClick={() => {
                                setOpened4(true);
                                setProductionToDelete(data.id);
                                setProductionName(data.attributes.name)
                              }}
                            >
                              <IconTrash size={18} />
                            </ActionIcon>
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
      )}
     {/* MODAL ADD DEPARTMENT */}
      <Modal
      centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Agregar departamento"
      >
        <ModalAddDepartment closeModal2={closeModal2}/>
      </Modal>

      {/* MODAL ADD PRODUCTION */}
      <Modal
      centered
        opened={opened5}
        onClose={() => setOpened5(false)}
        title="Agregar area de Produccion"
      >
        <ModalAddProduction closeModal3={closeModal3} />
      </Modal>


      {/* MODAL EDIT DEPARTMENT */} 
      {departmentToEdit && (
        <Modal
        centered
          title={"Editar Departamento " + info}
          opened={opened2}
          onClose={() => setOpened2(false)}
        >
          <ModalEditDeparment closeModal={closeModal} departmentToEdit={{ ...departmentToEdit }} />
        </Modal>
      )}
      
      {/* MODAL EDIT PRODUCTION */} 
      {productionToEdit && (
        <Modal
        centered
          title={"Editar Departamento " + info}
          opened={opened6}
          onClose={() => setOpened6(false)}
        >
          <ModalEditProduction closeModal4={closeModal4} productionToEdit={{ ...productionToEdit }} />
        </Modal>
      )}

      {/* MODAL DELETE DEPARTMENT */}
      <Modal
      centered
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={
          <Text size="lg">Seguro que desea eliminar el Departamento?</Text>
        }
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened3(false)} color="red">
            Cancelar
          </Button>
          <Button
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
          <Text size="lg">Seguro que desea eliminar el area de Produccion "{productionName}" </Text>
        }
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened4(false)} color="red">
            Cancelar
          </Button>
          <Button
            onClick={() =>
              deleteProduction(productionToDelete).then(() => setOpened4(false))
            }
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </>
  );
};
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  
  // Check if session exists or not, if not, redirect
  if (session == null) {
    return {
      redirect: {
        destination: '/auth/sign-in',
        permanent: true,
      },
    };
  }
  return {
    props: {
    },
  };
};
export default config;
