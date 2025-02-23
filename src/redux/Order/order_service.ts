import axios from "axios";
import { API_HOSTNAME } from "../../utils/config";
// import { CartItem } from "../../components/shop/CartPage";
// import Payment from '../../pages/shop/Payment';

export interface PaymentItem {
  id: string;
  quantity: number;
}


// order_service.ts
export const orderService = {
    getOrder: (orderId: string) =>
      axios.get(`${API_HOSTNAME}/transaction/${orderId}`),
    
    initiatePayment: (items: PaymentItem[]) =>
      axios.post(`${API_HOSTNAME}/payments/initiate/`, items),
    
    // createOrder: (email: string, items: CartItem[]) =>
    //   axios.post(`${API_HOSTNAME}/orders`, { email, items }),
  };