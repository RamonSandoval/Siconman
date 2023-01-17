import { ActionIcon, Button, Center, Modal, Table, Text } from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons";
import React from "react";
import styles from "../styles/UserList.module.css";
//import Notifications from "../Notifications";
import { useState, useEffect } from "react";
import api from "../services/api";
import ModalEditUser from "./modals/ModalEditUser";
import ModalAddUser from "./modals/ModalAddUser";
import Notifications from './Notifications'

const UsersList = () => {
  const [arrayUsers, setarrayUsers] = useState([]);
  const [opened, setOpened] = useState(false)
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [userToEdit,setUserToEdit] = useState({});

  const user_name = userToEdit.username
  useEffect(() => {
    init();
  }, []);

  async function init() {
    const listUsers = await api.usersList(1);
    setarrayUsers(listUsers);
  }

  async function deleteUser(id) {
    try {
      await api.deleteUser(id);
      Notifications.success("Se ha eliminado el usuario " + id);
      init();
    } catch (error) {
      alert("Error al eliminar al usuario" + id)
      Notifications.error("Error al eliminar al usuario" + id);
      console.error(error);
    }
  }
  return (
    <>
    <div className={styles.iconContainer}>
              <ActionIcon
                onClick={() => {setOpened(true)}}
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
              <Center>Usuario</Center>
            </th>
            <th>
              <Center>Correo</Center>
            </th>
            <th>
              <Center>Permisos</Center>
            </th>
            <th>
              <Center>Estatus</Center>
            </th>
            <th>
              <Center>Acciones</Center>
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {arrayUsers &&
            arrayUsers.map((data) => (
              <tr key={data.id}>
                <td>
                  <Center>{data.id}</Center>
                </td>
                <td>
                  <Center>{data.username}</Center>
                </td>
                <td>
                  <Center>{data.email}</Center>
                </td>
                <td>
                  <Center>admin</Center>
                </td>
                <td>
                  <Center>{data.confirmed}</Center>
                </td>
                <td>
                  <Center>
                    <div className={styles.icons}>
                      <ActionIcon color="indigo" onClick={() => {setOpened2(true); setUserToEdit(data)}}>
                        <IconEdit size={18} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => {
                          setOpened3(true);
                          setUserToDelete(data.id);
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
      {/* MODAL EDIT USER */}      

      {userToEdit && (
      <Modal
        centered
        opened={opened2}
        onClose={() => setOpened2(false)}
        title="Editar Usuario"
      >
       <ModalEditUser userToEdit={{...userToEdit}}/>
      </Modal>
      )} 

      {/* MODAL ADD USER */}      

      
      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Editar Usuario"
      >
       <ModalAddUser/>
      </Modal>


      {/* MODAL DELETE USER */}
      <Modal
        centered
        opened={opened3}
        onClose={() => setOpened3(false)}
        title={<Text size="lg">Seguro que desea eliminar al Usuario?</Text>}
      >
        <div className={styles.modal__confirmation}>
          <Button onClick={() => setOpened3(false)} color="red">
            Cancelar
          </Button>
          <Button
            onClick={() =>
              deleteUser(userToDelete).then(() => setOpened3(false))
            }
          >
            Confirmar
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default UsersList;
