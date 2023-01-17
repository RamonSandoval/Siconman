import React from 'react'
import Layout from '../components/Layout';
import Stats from '../components/Stats';
import TableDevices from '../components/TableDevices';
import { getSession } from 'next-auth/react';

const main = () => {
  
  return (
    <>
    <Layout tituloPagina="Inicio"/>
   <TableDevices/>
    </>
      
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // Check if session exists or not, if not, redirect
  if (session == null) {
    return {
      redirect: {
        destination: '/auth/not-authenticated',
        permanent: true,
      },
    };
  }
  return {
    props: {
    },
  };
};
export default main