import React from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import TableDevices from "../components/TableDevices";
import SignIn from "./auth/sign-in";
import { getSession } from "next-auth/react";
const Home = () => {
  const { data: session } = useSession();

  /* It's a hook that is executed when the component is mounted. It's checking if the session is null
  or not. If it's null, it will return nothing. If it's not null, it will log the session.jwt. */
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
  }, [session]);

  /* Rendering the page. */
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
          <TableDevices />
        </>
      )}
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
