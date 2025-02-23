import { ChevronRight } from "lucide-react";
import OrderSummaryPanel from "./OrderSummary";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";




// Shipping Page Component
export const ShippingPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const { couponCode } = useAppSelector(state => state.order);
    const navigate = useNavigate()
  

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const payload = {
        email,
        couponCode
      }
      
      console.log('couponCode', couponCode, payload);
      navigate('/shop/payment');
      console.log(email);
    };

 

    return (
      <div className="container mt-10 mx-auto px-4 pt-[80px] lg:pt-[120px] pb-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4  mb-12">
              <Link to={'/shop/cart'} className="font-bold">Shipping</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">shipping-info</span>
            </div>
  
            <div className="max-w-xl">
              <h2 className="text-xl font-bold mb-4">Enter Your Email Address</h2>
              <p className="text-gray-400 my-8">
                We will email the Ebook to you on this email address your provided so make sure you input an active email address
              </p>
  
              <div className="space-y-4">
                <label className="block">
                  <span className="block mb-3">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Input Email"
                    className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </label>
              </div>
            </div>
          </div>
  
          <OrderSummaryPanel
            buttonText="Continue"
          />
        </form>
      </div>
    );
  };
  