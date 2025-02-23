import { ChevronRight } from "lucide-react";
import OrderSummaryPanel from "./OrderSummary";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useAppDispatch } from "../../redux/store";




// Shipping Page Component
 const PaymentPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string>('');
  // const dispatch = useAppDispatch();

  const paymentMethods = [
    { id: 'card1', cardNumber: '****6754', expiryDate: '06/2021' },
    { id: 'card2', cardNumber: '****5643', expiryDate: '11/2025' },
  ];
  


    return (
      <div className="container mt-10 mx-auto px-4 pt-[80px] pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4  mb-12">
              <Link to={'/shop/shipping-information'} className="font-bold">Shipping</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">payment</span>
            </div>
  
            <div className="max-w-xl">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div 
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedCard === method.id ? 'border-primary-mainPink' : ''
            }`}
            onClick={() => setSelectedCard(method.id)}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                checked={selectedCard === method.id}
                onChange={() => setSelectedCard(method.id)}
                className="form-radio"
              />
              <div>
                <p className="font-medium">Card ending in {method.cardNumber.slice(-4)}</p>
                <p className="text-gray-500">Expires {method.expiryDate}</p>
              </div>
            </div>
          </div>
        ))}
        <button className="w-full bg-primary-mainPink text-white py-3 rounded-xl">
          Add Payment Method
        </button>
      </div>
            </div>
          </div>
  
          <OrderSummaryPanel
            buttonText="Continue"
          />
        </div>
      </div>
    );
  };


  export default PaymentPage