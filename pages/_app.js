import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import { NotificationsProvider } from '@mantine/notifications';
import Layout from '../components/Layout';
import TableDevices from '../components/TableDevices';
import { Nav } from '../components/Header';

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  /* A React Fragment. It is a way to return multiple elements without a wrapper div. */
  return(
    <>
    {/* /* A component from the `@mantine/notifications` package. It is a React component that provides a
    context for the `Notification` component. */}
    <NotificationsProvider position="top">
    <SessionProvider session={session}>
    <Component {...pageProps} />
    </SessionProvider> 
    </NotificationsProvider>
    </>
  ); 
}

export default MyApp
