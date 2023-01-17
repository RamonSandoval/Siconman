import {React,useState} from 'react'
import Link from 'next/link';
import { TextInput, ActionIcon, Stack, Button, PasswordInput,Modal, Group, Image, Center } from '@mantine/core';
import { IconUser,IconLock, IconHelp } from '@tabler/icons';
import styles from '../styles/Login.module.css'


const login = () => {
  /* A React Hook that is used to create a reference to the Autoplay component. */
  const [opened, setOpened] = useState(false);


  return (
    
    <Center className={styles.center}>
      <div className={styles.loginContainer}>
        <Group spacing="xs">
          <div className={styles.form}>
            <div className={styles.helpIcon}>
              <ActionIcon  color="lime" onClick={() => setOpened(true)}>
                <IconHelp size={25} />
               </ActionIcon>
             </div>
             
             <Stack className={styles.stack} align="center" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], height: 330, width: 400 })}>
                <Image pt={50}width={180} src="/assets/img/logos/dialight_logo.png"></Image>
                  <div className={styles.text}>
                    <h2 >Iniciar Sesion</h2>
                    <p>Consulta informacion acerca del mantenimiento a equipo de computo</p>
                  </div>
                
                <TextInput className={styles.inputs} label="Correo electronico" placeholder="ejemplo@gmail.com" icon={<IconUser size={14} />} description="Ingrese su correo electronico" />
                <PasswordInput className={styles.inputs}placeholder="" label="Contraseña" description="Ingrese su contraseña" withAsterisk icon={<IconLock size={16} />} />
                <Link href="http://localhost:3000/main"><Button className={styles.login__button} radius="md">Iniciar Sesion</Button></Link>
                  
                  
                <a className={styles.recover} href='https://ui.mantine.dev/component/server-error'>Recuperar Contraseña</a>
              </Stack>
            </div>
            <Modal withinPortal opened={opened} onClose={() => setOpened(false)} title="Introduce yourself!" transition="fade" transitionDuration={600}  transitionTimingFunction="ease">
              <p>Prubea</p>
            </Modal>
          </Group>
        </div>
    </Center> 
  )
}

export default login