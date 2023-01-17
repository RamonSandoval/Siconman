import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import TableDevices from '../components/TableDevices';
import styles from '../styles/Home.module.css';

export default function Protected() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Strapi - Next - NextAuth</title>
      </Head>
      <TableDevices/>
      <Link href="/">
        <button>Back to home page</button>
      </Link>
    </div>
  );
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