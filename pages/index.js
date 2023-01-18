import React from "react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import TableDevices from "../components/TableDevices";
import SignIn from "./auth/sign-in";
import { getSession } from 'next-auth/react';
import StatsDepartments from '../components/StatsDepartments.js'
import StatsProduction from '../components/StatsProduction'
import { Center, Group } from "@mantine/core";
const Home = () => {

  const { data: session } = useSession();

  useEffect(() => {
    if (session == null) return;
    console.log('session.jwt', session.jwt);
  }, [session]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio</title>
      </Head>
      {/* <TableDevices/>  */}
      {/* <Stats/> */}
      <h1>{session ? "" : <SignIn/>}</h1>

      {session && (
        <>
        <TableDevices/>
        {/* <Center pt={30}>
          <h4>Estadisticas</h4>
        </Center>
        <div className={styles.statsContainer}>
          <Group>
          <div className={styles.statsDepartmentsContainer}>
          <StatsDepartments/>  
          </div>

          <div className={styles.statsProductionContainer}>
          <StatsProduction/>  
          </div>
          </Group>
        </div> */}
        
        
        </>
        )}
    </div>
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


export default Home;
