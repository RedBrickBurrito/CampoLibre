import { useSession, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <h1>Home</h1>
      <button onClick={() => signOut()}>Cerrar Sesión</button>
    </>
  )
}
