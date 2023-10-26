declare interface Order {
    createdAt:    ?string;
    customerId:   string;
    customerName: string;
    internalCustomerId: string;
    customerEmail: string;
    status?:       string;
    orderTotal:    number;
    shippingAddress: string[];
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

type OrderDetail = {
  object: string;
  data: {
    id: string;
    object: string;
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    price: {
      id: string;
      unit_amount: number;
    };
    quantity: number;
  }[];
  has_more: boolean;
  url: string;
};

type ShippingAddress = {
  address: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
  }[];
  name: string;

}

declare const GLOBAL_CONSTANT: string;