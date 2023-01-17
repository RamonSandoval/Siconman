import { Center } from "@mantine/core";
import React from "react";
import Layout from "../components/Layout";
import MaintCalendar from "../components/MaintCalendar";
import { signOut, useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SignIn from "./auth/sign-in";

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
