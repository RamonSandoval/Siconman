/**
 * It's a function that takes a prop called tituloPagina and returns a Head component with a title tag
 * that has the value of tituloPagina and a link tag with a rel attribute of shortcut icon and a href
 * attribute of https://tematicos.plataformadetransparencia.org.mx/o/sisai-theme/images/logoheader.png.
 * It also returns a Nav component.
 * 
 * @return The return is a component that is being exported.
 */
import React from 'react'
import Head from 'next/head'
import { Nav } from '../components/Header'
import styles from "../styles/NavBar.module.css";

const Layout = ({tituloPagina}) => {
  return (
    <>
    <Head>
      <title>{tituloPagina}</title>
    </Head>
    <Nav/>
    </>
  )
}

export default Layout