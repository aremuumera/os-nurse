import axios from "axios";
import { API_HOSTNAME } from "../../utils/config";
// import { CartItem } from "../../components/shop/CartPage";


// order_service.ts
export const orderService = {
    getOrder: (orderId: string) =>
      axios.get(`${API_HOSTNAME}/transaction/${orderId}`),
    
    initiatePayment: (paymentId: string, quantity: number) =>
      axios.post(`${API_HOSTNAME}/payments/initiate/${paymentId}`, { quantity }),
    
    // createOrder: (email: string, items: CartItem[]) =>
    //   axios.post(`${API_HOSTNAME}/orders`, { email, items }),
  };