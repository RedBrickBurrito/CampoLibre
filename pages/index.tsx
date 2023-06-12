import { useSession } from "next-auth/react"


export default function Home() {
  const {data: session} = useSession()

  return (
    <>
      <h1>Home</h1>
      <pre>{JSON.stringify(session)}</pre>
    </>
  )
}
