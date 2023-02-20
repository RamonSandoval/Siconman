import {
  ActionIcon,
  Button,
  Center,
  Modal,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons";
import React from "react";
import styles from "../styles/UserList.module.css";
//import Notifications from "../Notifications";
import { useState, useEffect } from "react";
import api from "../services/api";
import ModalEditUser from "./modals/ModalEditUser";
import ModalAddUser from "./modals/ModalAddUser";
import Notifications from "./Notifications";

const UsersList = () => {
  const [arrayUsers, setarrayUsers] = useState([]);
  const [opened, setOpened] = useState(false);
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [userToEdit, setUserToEdit] = useState({});

  const user_name = userToEdit.username;
  useEffect(() => {
    init();
  }, []);

  /**
   * The function init() is an asynchronous function that calls the function usersList() from the api
   * object, and then calls the function setarrayUsers() with the result of the call to usersList().
   */
  async function init() {
    const listUsers = await api.usersList();
    setarrayUsers(listUsers);
  }

  /**
   * "The function deleteUser() is an asynchronous function that calls the api.deleteUser() function,
   * which is also an asynchronous function, and then calls the init() function, which is also an
   * asynchronous function."
   * </code>
   *
   * @param id The id of the user to delete
   */
  async function deleteUser(id) {
    try {
      await api.deleteUser(id);
      Notifications.success("Se ha eliminado el usuario " + id);
      init();
    } catch (error) {
      Notifications.error("Error al eliminar al usuario" + id);
      console.error(error);
    }
  }
  /* Returning the component to be used in other files. */
  return (
    <>
      <div className={styles.iconContainer}>
        <Tooltip label="Crear Nuevo Usuario">
          <ActionIcon
            /* component="a"
            target="_blank"
            rel="noopener noreferrer"
            href="http://localhost:1337/admin/content-manager/collectionType/plugin::users-permissions.user/create" */
            onClick={() => {
              setOpened(true);
            }} 
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
              <Center>Usuario</Center>
            </th>
            <th>
              <Center>Correo</Center>
            </th>
           
            <th>
              <Center>Estatus</Center>
            </th>
           
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {arrayUsers &&
            arrayUsers.map((data) => (
              <tr key={data.id}>
                
                <td>
                  <Center>{data.username}</Center>
                </td>
                <td>
                  <Center>{data.email}</Center>
                </td>
                <td>
                  {data.blocked == true ? (
                    <Center>Deshabilitado</Center>
                  ) : (
                    <Center>Habilitado</Center>
                  )}
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
          <ModalEditUser userToEdit={{ ...userToEdit }} />
        </Modal>
      )}

      {/* MODAL ADD USER */}

      <Modal
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Crear Nuevo Usuario"
      >
        <ModalAddUser />
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

/* Exporting the component to be used in other files. */
export default UsersList;
