import Image from "next/image"
import Navbar from "@ui/Navbar/Navbar"
import { useState } from "react"

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)

  const handleCartClose = () => {
    setCartOpen(false)
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>Home</h1>
        <Image
          src="/tomate_saladette.jpeg"
          alt="tomate saladette"
          width="120"
          height="120"
        />
      </div>
    </>
  )
}
