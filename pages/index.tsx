import Image from "next/image";
import Navbar from "@ui/Navbar/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { PlusSmallIcon, MinusSmallIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCartItems, incrementQuantity} from '../libs/Store/store';

interface Product {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  categoryId: string;
  price: number;
  description?: string;
  expirationDate?: Date;
  quantity?: number;
}

interface RootState {
  cart: Product[]
}


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: { cart: Product[] }) => state.cart);


  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem("cart");
    console.log("Cart items from storage:", cartItemsFromStorage);
    if (cartItemsFromStorage !== undefined) {
      try {
        const parsedCartItems = JSON.parse(cartItemsFromStorage || '[]');
        console.log("Parsed cart items:", parsedCartItems);
        if (Array.isArray(parsedCartItems)) {
          dispatch(setCartItems(parsedCartItems as Product[]));
        }
      } catch (error) {
        console.error("Error parsing cart items:", error);
      }
    }
  }, [dispatch]);

  async function fetchProducts() {
    try {
      const response = await axios.get("/api/products");
      const data = response.data;
      setProducts(data as Product[]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  const handleAddToCart = (product: Product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      // Product already exists in the cart, increment the quantity by 1
      dispatch(incrementQuantity(product.id));
    } else {
      // Product doesn't exist in the cart, add it with quantity 1
      dispatch(addToCart({ ...product, quantity: 1 }));
    }

    toast.success(`Haz añadido ${product.name} al carrito!!`);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <Navbar/>
      <div>
        <h1>Home</h1>
        {products.map((product) => (
          <div key={product.id}>
            <Image src={product.imageSrc} alt={product.imageAlt} height={200} width={200} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}