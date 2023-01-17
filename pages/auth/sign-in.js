import Head from "next/head";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.css";
import {} from "@mantine/core";
import {
  TextInput,
  Stack,
  Button,
  PasswordInput,
  Group,
  Image,
  Center,
} from "@mantine/core";
import { IconUser, IconLock } from "@tabler/icons";
import Notifications from "../../components/Notifications";
import { useForm } from '@mantine/form';
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function SignIn() {
  const router = useRouter();


  const { data: session } = useSession();
  
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
  }, [session]);

  
  const loginUser= async (e) => {
    // e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: form.values.email,
      password: form.values.password,
    });
    if (result.ok) {
      router.replace("/");
      Notifications.success("Ha iniciado sesion con exito");
      return;
    }
    Notifications.error("Correo o Contraseña incorrecta");
  };
  const form = useForm({
    initialValues:{
      email:'',
      password:'',
    },
    validate:{
      email:(value) => (/^\S+@\S+$/.test(value) ? null : 'Formato de correo no valido'),
      password: (value) =>
        value.length === 0 ? "Ingrese una contraseña" : null,
    }
  })

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Iniciar Sesion</title>
        </Head>
        <form className={styles.form} onSubmit={form.onSubmit(loginUser)}>
          <Center className={styles.center}>
            <div className={styles.loginContainer}>
              <Group spacing="xs">
                <div className={styles.form}>
                  <Stack
                    className={styles.stack}
                    align="center"
                    sx={(theme) => ({
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[8]
                          : theme.colors.gray[0],
                      height: 330,
                      width: 400,
                    })}
                  >
                     
                    <Image
                      pt={5}
                      width={300}
                      src="/assets/img/logos/logo_siconmandial.png"
                    />
                    <div className={styles.text}>
                     
                      <p>
                        Sistema de Control de Mantenimiento Preventivo y
                        Correctivo a Equipo de Computo
                      </p>
                    </div>

                    <TextInput
                      {...form.getInputProps('email')}
                      className={styles.inputs}
                      label="Correo electronico"
                      placeholder="ejemplo@gmail.com"
                      icon={<IconUser size={14} />}
                      description="Ingrese su correo electronico"
                    />
                    <PasswordInput
                      {...form.getInputProps('password')}
                      type="password"
                      className={styles.inputs}
                      label="Contraseña"
                      description="Ingrese su contraseña"
                      withAsterisk
                      icon={<IconLock size={16} />}
                    />
                    <Button
                      type="submit"
                      className={styles.login__button}
                      radius="md"
                    >
                      Iniciar Sesion
                    </Button>
                  </Stack>
                  {/* <Image
                    className={styles.siconmanLogo}
                    pt={0}
                    width={130}
                    src="/assets/img/logos/logo_siconman.png"
                  /> */}
                </div>
              </Group>
            </div>
          </Center>
        </form>
      </div>
    </>
  );
}
