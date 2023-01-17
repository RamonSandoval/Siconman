import React from 'react'
import Head from 'next/head'
import { Nav } from '../components/Header'
import MainHeader from './MainHeader'
const Layout = ({tituloPagina}) => {
  return (
    <>
    <Head>
      <title>{tituloPagina}</title>
      <link rel="shortcut icon" href="https://tematicos.plataformadetransparencia.org.mx/o/sisai-theme/images/logoheader.png"/>
    </Head>
    <Nav/>
    </>
  )
}

export default Layout