import "../styles/tailwind.css"
import { SessionProvider } from "next-auth/react"

import { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
          <Component {...pageProps} />
    </SessionProvider>
    ) 
}

export default MyApp
