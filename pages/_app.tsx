import "../styles/tailwind.css"
import { SessionProvider } from "next-auth/react"

import { AppProps } from "next/app"
import { Session } from "next-auth"
import dynamic from "next/dynamic"

interface MyAppProps extends AppProps {
  session: Session
}

function MyApp({ Component, pageProps, session }: MyAppProps) {
  const ToastComponent = dynamic(() => import("context/ToasterContext"), { ssr: false })

  return (
    <SessionProvider session={session}>
      <ToastComponent />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
