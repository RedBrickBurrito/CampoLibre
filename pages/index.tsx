import Image from "next/image"
import Navbar from "@ui/Navbar/Navbar"
import { useState, useEffect } from "react"
import axios from "axios"

interface Product {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  categoryId: string;
  price: number;
  description?: string;
  expirationDate?: Date;
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);
  
  async function fetchProducts() {
    try {
      const response = await axios.get('/api/products');
      const data = response.data;
      setProducts(data as Product[]);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const handleCartClose = () => {
    setCartOpen(false)
  }

  return (
    <>
      <Navbar />
      <div>
        <h1>Home</h1>
        {products.map((product) => (
        <div key={product.id}>
          <Image 
          src={product.imageSrc}
          alt={product.imageAlt}
          height={200}
          width={200}
          />
          <h2>{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))}
      </div>
    </>
  )
}
