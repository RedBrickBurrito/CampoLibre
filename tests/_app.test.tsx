import { render } from "@testing-library/react"
import { Session } from "next-auth"
import dynamic from "next/dynamic"
import { SessionProvider } from "next-auth/react"
import MyApp from "../pages/_app"
import { Router } from "next/router";

jest.mock('next/router', () => require('../../utils/nextRouterMock'));

jest.mock("next-auth/react", () => ({
  SessionProvider: jest.fn(({ children }) => children),
}))

jest.mock("next/dynamic", () => jest.fn((importFn) => {
  const DynamicComponent = () => null
  DynamicComponent.displayName = "LoadableComponent"
  return DynamicComponent
}))

interface MyAppProps {
    Component: React.FC;
    pageProps: Record<string, unknown>;
    session: Session;
    router: Router; // Add the router property to satisfy the type requirements
}


describe("MyApp", () => {
  test("renders MyApp component with session provider", () => {
    const session: Session = {
        user: {
            name: "John Doe",
            email: "john.doe@example.com",
            // Add any other relevant user properties
          },
          expires: "2023-06-30T12:00:00.000Z",
          // Add any other relevant session properties
    }

    const props: MyAppProps = {
        Component: () => null,
        pageProps: {},
        session,
        router: {} as Router, // Provide a dummy object for the router
      }

    render(
    <SessionProvider session={session}>
        <MyApp {...props} />
      </SessionProvider>
    )

    expect(SessionProvider).toHaveBeenCalledWith(expect.anything(), expect.anything());
  })

  test("renders MyApp component with dynamic ToastComponent", () => {
    const session: Session = {
        user: {
            name: "John Doe",
            email: "john.doe@example.com",
            // Add any other relevant user properties
          },
          expires: "2023-06-30T12:00:00.000Z",
          // Add any other relevant session properties
    }

    const props: MyAppProps = {
        Component: () => null,
        pageProps: {},
        session,
        router: {} as Router, // Provide a dummy object for the router
      }

    render(
        <SessionProvider session={session}>
        <MyApp {...props} />
      </SessionProvider>
    )

    expect(dynamic).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ ssr: false }));
    expect(dynamic).toHaveBeenLastCalledWith(expect.anything(), expect.objectContaining({ ssr: false }));
  })
})
