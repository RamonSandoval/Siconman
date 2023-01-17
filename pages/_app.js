import '../styles/globals.css'
import {SessionProvider} from 'next-auth/react'
import { NotificationsProvider } from '@mantine/notifications';



function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return(
    <>
    <NotificationsProvider position="top">
    <SessionProvider session={session}>
    <Component {...pageProps} />
    </SessionProvider> 
    </NotificationsProvider>
    </>
  ); 
}

export default MyApp
