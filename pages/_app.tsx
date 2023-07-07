import "../styles/tailwind.css" // Import Tailwind CSS for styling

import { AppProps } from "next/app" // Import Next.js types for the app component
import dynamic from "next/dynamic" // Import dynamic from Next.js for dynamic component import
import { Session } from "next-auth" // Import NextAuth Session type
import { SessionProvider } from "next-auth/react" // Import NextAuth SessionProvider for session management
import { Provider } from "react-redux"
import store from "../libs/Store/store"

interface MyAppProps extends AppProps {
  session: Session // Define the session property in MyAppProps
}

/**
 * The main component for the Next.js app.
 *
 * @param Component - The current page component.
 * @param pageProps - The props for the current page.
 * @param session - The session object containing user authentication information.
 * @returns The rendered app component with session provider and dynamic ToastComponent.
 */
function MyApp({ Component, pageProps, session }: MyAppProps) {
  const ToastComponent = dynamic(() => import("context/ToasterContext"), { ssr: false })

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ToastComponent />
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
