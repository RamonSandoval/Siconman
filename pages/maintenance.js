import React from "react";
import Layout from "../components/Layout";
import MaintTableAll from "../components/Lists/MaintTableAll";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SignIn from "./auth/sign-in";

const maintenance = () => {
  /* Getting the session data from the useSession() hook. */
  const { data: session } = useSession();

  /* Checking if the session is null, if it is, it returns. If it is not, it logs the session.jwt and
 calls init(). */
  useEffect(() => {
    if (session == null) return;
    console.log("session.jwt", session.jwt);
    init();
  }, [session]);

  async function init() {}
  /* Rendering the page. */
  return (
    <div>
      <h1>{session ? "" : <SignIn />}</h1>
      <Layout tituloPagina="Mantenimientos" />
      {session && <MaintTableAll />}
    </div>
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

export default maintenance;
