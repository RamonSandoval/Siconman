import React from "react";
import Layout from "../components/Layout";
import MaintCalendar from "../components/MaintCalendar";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import SignIn from "./auth/sign-in";

/**
 * If the session is null, then display the SignIn component, otherwise display the MaintCalendar
 * component.
 * 
 * @return The session is being returned.
 */
const CalendarMaint = () => {
  const { data: session } = useSession();
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
  }, [session]);

  return (
    <>
      <h1>{session ? "" : <SignIn />}</h1>
      <Layout tituloPagina="Calendario" />
      {session && (
        <>
          <MaintCalendar/>
        </>
      )}
    </>
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

export default CalendarMaint;
