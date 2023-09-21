"use client"

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderModal from "@ui/Modals/OrderModal";
import Layout from "components/layout";


export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (orderId && typeof orderId === "string") {
      // Make a GET request to the order API only when orderId is available
      axios.get<Order>(`http://localhost:3000/api/getOrder?id=${orderId}`)
        .then((response) => {
          setOrder(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
          setLoading(false);
        });
    }
  }, [orderId]);

  return (
    <>
    <Layout>
    <OrderModal />
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4 bg-primary-50">
      <h1 className="font-bold text-lg md:text-lg sm:text-base">Detalles del pedido</h1>
      {loading ? (
        <p>Loading...</p>
      ) : order ? (
        <div className="mt-5">
      <section>
        <div className="flex justify-between pb-5">
          <h1 className="font-bold text-2xl md:text-2xl sm:text-lg">Orden #{orderId}</h1>
          <p className="text-base md:text-base sm:text-sm">
            Pedido realizado el <span className="font-bold">23 de Marzo de 2023</span>
          </p>
        </div>
      </section>
      <div className="grid grid-cols-3 gap-4 overflow-hidden border border-gray-200 rounded-lg bg-white text-slate-500 shadow shadow-slate-200 sm:flex-row pb-14 text-lg md:text-lg sm:text-base sm:grid-cols-3">
        <div className="pl-8 pt-8 selection:h-48 w-48 flex-shrink-1 overflow-hidden">
          <img className="rounded-lg" src="https://i.imgur.com/LINHjKh.png" alt="Manzana Gala" />
        </div>
        <div className="pl-8 pt-8">
          <h2 className="font-bold text-black">Manzana Gala</h2>
          <div className="pt-2"></div>
          <p className="text-black">$32.34</p>
        </div>
        <div className="pl-8 pt-8 pr-8">
          <h2 className="font-bold text-black">Direccion de domicilio</h2>
          <div className="pt-2"></div>
          <p>Puerta de Yuba 9301, Fracc. Puerta del Valle, Chihuahua, Chihuahua</p>
        </div>
        <div className="col-span-3">
          <hr className="my-8 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
          <div className="pl-8 pr-8">
            <p className="pb-4 text-lg text-black">Preparando para su envío el 24 de Marzo de 2023</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-200 mb-4">
              <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              <div className="flex justify-between mt-4 text-lg">
                <p className="text-accent-500">Pedido realizado</p>
                <p>En Proceso</p>
                <p>Enviado</p>
                <p>Entregado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      ) : (
        <p>Order not found</p>
      )}
    </div>
    </Layout>
    </>
  )

};
