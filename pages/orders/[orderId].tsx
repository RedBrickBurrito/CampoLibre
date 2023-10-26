"use client"

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import OrderModal from "@ui/Modals/OrderModal";
import Layout from "components/layout";
import { ShippingAddress } from "@stripe/stripe-js";


export default function OrderDetails() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetail | null>(null);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    if (orderId && typeof orderId === "string") {
      // Make a GET request to the order API only when orderId is available
      axios.get<Order>(`http://localhost:3000/api/getOrder?id=${orderId}`)
        .then((response) => {
          setOrder(response.data);
          const parsedOrderDetails = JSON.parse(response.data.order_details[0]) as OrderDetail;
          const parsedShippingAddress = JSON.parse(response.data.shippingAddress[0]) as ShippingAddress;
          console.log(parsedShippingAddress);
          setOrderDetails(parsedOrderDetails);
          setShippingAddress(parsedShippingAddress);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
          setLoading(false);
        });
    }
  }, [orderId]);


  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(dateString));
  };

  const shippingAddressString = () => {
    return "".concat(shippingAddress?.address.line1 || "", ",", 
    shippingAddress?.address.line2 || ""," ",
    shippingAddress?.address.postal_code || "", ",", 
    shippingAddress?.address.city || "", ",",
    shippingAddress?.address.state || "")
  }

  console.log(order)

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
        <div className="flex justify-between pb-5 sm">
          <h1 className="font-bold text-2xl md:text-2xl sm:text-lg">Orden #{orderId}</h1>
          <p className="text-base md:text-base sm:text-sm">
            Pedido realizado el <span className="font-bold">{formatDate(order.createdAt)}</span>
          </p>
        </div>
      </section>
          <div className="grid grid-cols-3 gap-4 overflow-hidden border border-gray-200 rounded-lg bg-white text-slate-500 shadow shadow-slate-200 sm:flex-row pb-14 text-lg md:text-lg sm:text-base sm:grid-cols-3 mb-10">
          <div className="col-span-3 mb-20 mt-20">
                <div className="pl-8 pr-8">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-200 mb-30">
                    {order.status === "Pendiente" ? (
                      <>
                        <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                        <div className="flex justify-between mt-4 text-lg">
                        <p className="text-accent-500">Pedido realizado</p>
                        <p>En Proceso</p>
                        <p>Enviado</p>
                        <p>Entregado</p>
                        </div>
                      </>
                    ) : order?.status === "Empaquetada" ? (
                      <>
                        <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: '50%' }}></div>
                        <div className="flex justify-between mt-4 text-lg">
                        <p className="text-accent-500">Pedido realizado</p>
                        <p className="text-accent-500">En Proceso</p>
                        <p>Enviado</p>
                        <p>Entregado</p>
                        </div>
                      </>
                    ) : order?.status === "Enviado" ? (
                      <>
                        <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        <div className="flex justify-between mt-4 text-lg">
                        <p className="text-accent-500">Pedido realizado</p>
                        <p className="text-accent-500">En Proceso</p>
                        <p className="text-accent-500">Enviado</p>
                        <p>Entregado</p>
                        </div>
                      </>
                    ) : order?.status === "Completada" ? (
                      <>
                        <div className="bg-accent-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        <div className="flex justify-between mt-4 text-lg">
                        <p className="text-accent-500">Pedido realizado</p>
                        <p className="text-accent-500">En Proceso</p>
                        <p className="text-accent-500">Enviado</p>
                        <p className="text-accent-500">Entregado</p>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="pt-20 flex flex-row space-x-20">
                  <div>
                      <h2 className="font-bold text-primary-950">Cliente</h2>
                      <div className="pt-2"></div>
                      <p>{order.customerName}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-primary-950">Correo electronico</h2>
                      <div className="pt-2"></div>
                      <p>{order.customerEmail}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-primary-950">Direccion de domicilio</h2>
                      <div className="pt-2"></div>
                      <p className="line-clamp-3">{shippingAddressString()}</p>
                    </div>
                    <div>
                      <h2 className="font-bold text-primary-950">Metodo de pago</h2>
                      <div className="pt-2"></div>
                      <p>Pago con tarjeta con terminacion 0546</p>
                    </div>
                  </div>
                </div>
          </div>
          { orderDetails?.data.map((item, index, array) => (
            <>
              <div className="pl-8 pt-8 selection:h-48 w-48 flex-shrink-1 overflow-hidden md:shrink-0">
                <img className="rounded-lg" src="https://i.imgur.com/LINHjKh.png" alt="Manzana Gala" />
              </div>
              <div className="pl-8 pt-8">
                <h2 className="font-bold text-primary-950">{item.description}</h2>
                <div className="pt-2"></div>
                <p className="text-primary-950 mb-5">{`$${item.price.unit_amount / 100} ${item.currency} por pieza`}</p>
                <h3 className="font-bold text-primary-950">Subtotal</h3>
                <div className="pt-2"></div>
                <p className="text-primary-950">{`$${item.amount_total / 100} ${item.currency}`}</p>
              </div>
              <div className="pl-8 pt-8 pr-8">
                <div>
                  <h2 className="font-bold text-primary-950">Cantidad</h2>
                  <div className="pt-2"></div>
                  <p className="text-primary-950 mb-5">{item.quantity} {item.quantity > 1 ? "pzas." : "pz."}</p>
                </div>
              </div>
              <div className="col-span-3 mb-20">
              {index === array.length - 1 ? (
                <></>
              ) : (
                <hr className="mb-0 mt-10 h-0.5 border-t-0 bg-neutral-200 opacity-100 dark:opacity-50" />
              )}
              </div>
              </>
            ))}
            
             <div className="pl-8 pr-8 text-xl">
                  <h2 className="font-bold text-primary-950">Total de la orden</h2>
                  <div className="pt-2"></div>
                  <p className="text-primary-950">{`$${order.orderTotal / 100} mxn`}</p>
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
