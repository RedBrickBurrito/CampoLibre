import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import Navbar from "@ui/Navbar/Navbar"
import ShoppingCart from "@ui/Sideovers/ShoppingCart"
import { useState } from 'react';


export default function Home() {
  const { data: session } = useSession()
  const [cartOpen, setCartOpen] = useState(false);

  const handleCartClose = () => {
    setCartOpen(false);
  };  

  return (
    <>
      <Navbar />
      <div>
        <h1>Home</h1>
        <button onClick={() => signOut()}>Cerrar Sesión</button>
        <Image onClick={() => setCartOpen(true)} src="/tomate_saladette.jpeg" alt="tomate saladette" width="120" height="120"/>
        {cartOpen && <ShoppingCart onClose={handleCartClose}/>}
      </div>
    </>
  )
}
