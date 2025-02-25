import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Receipt, 
  BookOpen, 
  Home 
} from 'lucide-react';

// Define TypeScript interface for payment details
interface PaymentDetails {
  orderNumber: string;
  amount: string;
  date: string;
  item: string;
  email: string;
}

// Assuming you have a service to get payment details
// import { getPaymentDetails } from '../services/paymentService';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Animation timing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Get payment session ID from URL if needed
    // const queryParams = new URLSearchParams(location.search);
    // const sessionId = queryParams.get('session_id');

    // Here you would fetch payment details with the session ID
    // If you have this implemented, uncomment and use the below
    /*
    const fetchPaymentDetails = async () => {
      try {
        const details = await getPaymentDetails(sessionId);
        setPaymentDetails(details);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchPaymentDetails();
    } else {
      setLoading(false);
    }
    */

    // For now, let's use mock data
    setPaymentDetails({
      orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      amount: '$29.99',
      date: new Date().toLocaleDateString(),
      item: 'Advanced Web Development Book',
      email: 'customer@example.com'
    });

    return () => clearTimeout(timer);
  }, [location]);

  const handleViewBook = () => {
    navigate('/library');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 bg-gradient-to-br from-blue-100 to-white">
      <div className="container max-w-3xl mx-auto px-4">
        {!loading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 md:p-8 shadow-xl relative overflow-hidden"
            >
              {/* Success Icon & Header */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col items-center mb-6"
              >
                <CheckCircle 
                  className="w-24 h-24 text-green-500 mb-4" 
                />
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
                  Payment Successful!
                </h1>
                <p className="text-gray-600 text-center max-w-md mb-4">
                  Thank you for your purchase. Your book is now available in your library.
                </p>
              </motion.div>

              <div className="border-t border-gray-200 my-6"></div>

              {/* Order Details */}
              {paymentDetails && (
                <motion.div variants={itemVariants}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <h2 className="text-lg font-semibold flex items-center">
                        <Receipt className="mr-2 h-5 w-5" />
                        Order Details
                      </h2>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Order Number</p>
                      <p className="font-medium">{paymentDetails.orderNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{paymentDetails.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium">{paymentDetails.amount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{paymentDetails.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Item</p>
                      <p className="font-medium">{paymentDetails.item}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="border-t border-gray-200 my-6"></div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                  <button
                    onClick={handleViewBook}
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg 
                             shadow-lg hover:translate-y-1 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    View Your Book
                  </button>
                  <button
                    onClick={handleGoToHome}
                    className="flex items-center justify-center px-6 py-3 border-2 border-blue-600 
                             text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 w-full sm:w-auto"
                  >
                    <Home className="mr-2 h-5 w-5" />
                    Back to Home
                  </button>
                </div>
              </motion.div>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-green-100 opacity-20 rounded-bl-full"></div>
            </motion.div>

            {/* Support or Receipt Link */}
            <motion.div variants={itemVariants} className="text-center mt-4">
              <p className="text-sm text-gray-600">
                A receipt has been sent to your email. Having issues with your order?{' '}
                <span
                  className="text-blue-600 cursor-pointer underline hover:text-blue-800"
                  onClick={() => navigate('/support')}
                >
                  Contact support
                </span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;