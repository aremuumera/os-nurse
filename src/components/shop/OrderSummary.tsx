import { OrderSummary } from "./CartPage";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setCouponCode } from "../../redux/Order/order_api_slice";


interface OrderSummaryPanelProps {
    summary?: OrderSummary;
    buttonText: string;
    handleContinue?: () => void;
  }
  
 const OrderSummaryPanel: React.FC<OrderSummaryPanelProps> = ({  buttonText, handleContinue }) => {
    const  { couponCode } = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const { totalAmount } = useAppSelector((state) => state.order);

       const summary: OrderSummary = {
            price: totalAmount,
            discount: totalAmount * 0.1, // 10% discount
            couponApplied: 0.00,
            total: totalAmount - (totalAmount * 0.1) // Total after discount
          };

  
  
    return (
      <div className="bg-white p-6 rounded-lg border">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span>Price</span>
            <span>${summary.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>${summary.discount.toFixed(2)}</span>
          </div>
          <div className="flex pb-6  justify-between">
            <span>Coupon Applied</span>
            <span>${summary.couponApplied.toFixed(2)}</span>
          </div>
          <div className="my-16 w-full h-[2px] bg-slate-200"></div>
          <div className="flex pt-6 justify-between font-[400]">
            <span>TOTAL</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
        </div>
  
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => dispatch(setCouponCode(e.target.value))}
              placeholder="Coupon Code"
              className="w-full px-4 py-4 pr-10 rounded border focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
  
          <button type="submit" onClick={handleContinue} className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition-colors">
            {buttonText}
          </button>
        </div>
      </div>
    );
  };

  export default OrderSummaryPanel;