import "../styles/tailwind.css"
import { SessionProvider } from "next-auth/react"
import ToasterContext from "context/ToasterContext"

import { AppProps } from "next/app"
import { Session } from "next-auth"

interface MyAppProps extends AppProps {
  session: Session
}

function MyApp({ Component, pageProps, session }: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <ToasterContext />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
