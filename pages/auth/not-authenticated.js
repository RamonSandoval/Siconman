
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import SignIn from './sign-in';

export default function NotAuthenticated() {
  const router = useRouter();

  /* Redirecting the user to the sign-in page after 2 seconds. */
  useEffect(() => {
    setTimeout(() => {
      router.replace('/auth/sign-in');
    }, 2000);
  }, []);

  /* Returning the SignIn component. */
  return (
    <div className={styles.container}>
      <Head>
        <title>Iniciar Sesion - Sistema</title>
      </Head>
      <SignIn/>
    </div>
  );
}