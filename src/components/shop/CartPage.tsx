import { useNavigate } from "react-router-dom";
import { initiatePayment, removeFromCart, updateQuantity } from "../../redux/Order/order_api_slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import  OrderSummaryPage  from "./OrderSummary";
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PaymentItem } from "../../redux/Order/order_service";



export interface OrderSummary {
  price: number;
  discount: number;
  couponApplied: number;
  total: number;
}


export const CartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { items, loading } = useAppSelector((state) => state.order);

   
//  console.log('Cart items:', items);

    const handleUpdateQuantity = (id: string, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
      };

    const handleRemoveItem = (id: string) => {
        dispatch(removeFromCart(id));
      };

      const handleContinue = async () => {
        const itemsForApi: PaymentItem[] = items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        }));
        const resultAction = await dispatch(initiatePayment(itemsForApi));
        // console.log('resultAction', itemsForApi);
        if (initiatePayment.fulfilled.match(resultAction)) {
          toast.success((resultAction.payload as any)?.message || 'Payment initiated successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          navigate('/shop/shipping-information'); 
        } else if (initiatePayment.rejected.match(resultAction)) {
          toast.error((resultAction.payload as any)?.message || 'Payment initiation failed', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      };
  
    return (
      <div className="container mx-auto  px-4 mt-4 sm:mt-14 pt-[100px] pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <h1 className="text-2xl font-bold">Cart </h1>
              <span className="text-gray-500"> {items.length}  ITEMS</span>
            </div>
  
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex gap-6 border-b pb-6">
                  <img
                  src={item.coverImage || '/oversabinurse/home-book-11.svg'}
                  alt={item.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <span className="font-semibold">${item.price}</span>
                    </div>
                    <p className="text-gray-600 mt-1">
                      Color: {item.color}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex border rounded">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 border-r"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          className="w-12 text-center"
                          readOnly
                        />
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 border-l"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ToastContainer />

          </div>
  
          <OrderSummaryPage
            buttonText={loading ? "submitting..." : "Check Out"}
            handleContinue={handleContinue}
            loading={loading}
          />
        </div>
      </div>
    );
  };
  