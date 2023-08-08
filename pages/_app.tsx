import "../styles/tailwind.css" // Import Tailwind CSS for styling
import { AppProps } from "next/app" // Import Next.js types for the app component
import { Session } from "next-auth" // Import NextAuth Session type
import { SessionProvider } from "next-auth/react" // Import NextAuth SessionProvider for session management
import { CartProvider } from "use-shopping-cart" // Import CartProvider from use-shopping-cart library
import { CURRENCY } from "../config/index" // Import CURRENCY constant from config/index
import type { ReactElement, ReactNode } from "react" // Import React types for type annotations
import type { NextPage } from "next" // Import NextPage type from Next.js for type annotations
import ToasterContext from "context/ToasterContext" // Import the ToasterContext component

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  session: Session
}

/**
 * The main component for the Next.js app.
 *
 * @param Component - The current page component.
 * @param pageProps - The props for the current page.
 * @param session - The session object containing user authentication information.
 * @returns The rendered app component with the layout props
 */
function MyApp({ Component, pageProps, session }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={session}>
      <CartProvider
        cartMode="checkout-session"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
        currency={CURRENCY}
        shouldPersist={true}
      >
        {getLayout(
          <>
            <ToasterContext />
            <Component {...pageProps} />
          </>
        )}
      </CartProvider>
    </SessionProvider>
  )
}

export default MyApp
