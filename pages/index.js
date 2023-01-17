import React from "react";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import TableDevices from "../components/TableDevices";
import Stats from "../components/Stats";
import SignIn from "./auth/sign-in";
import { getSession } from 'next-auth/react';

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
        </>
        )}
     {/* {session ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <Link href="/auth/sign-in">
          <button>Sign In</button>
        </Link>
      )}
      <Link href="/protected">
        <button
          style={{
            marginTop: 10,
          }}
        >
          Protected Page
        </button>
      </Link> */}
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
