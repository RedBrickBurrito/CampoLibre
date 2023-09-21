declare interface Order {
    customerId:   string;
    customerName: string;
    status?:       Status;
    order_details: string[]; 
}

declare interface Product {
  id: string
  name: string
  price: number
  image: string
  imageAlt: string
  currency: string
  product_type: string
  is_favorite: boolean
}


enum Status {
  Pendiente,
  Empaquetada,
  Enviado,
  Completada,
  Cancelada,
  Reembolsado,
  Disputada,
}

declare const GLOBAL_CONSTANT: string;