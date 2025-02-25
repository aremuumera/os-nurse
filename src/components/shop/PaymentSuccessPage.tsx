import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Receipt, 
  Home 
} from 'lucide-react';

// Define TypeScript interfaces for our data
interface Book {
  id: string;
  title: string;
  quantity: number;
  unit_price: string;
  subtotal: number;
  book_uuid: string;
}

interface PaymentDetails {
  transaction_ids: string;
  amount: number;
  user_id: string;
  user_name: string;
  payment_status: string;
  books: Book[];
  date: string;
  email?: string; // Optional as it might not be in the URL
  orderNumber?: string; // We'll generate this
}

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

    // Get query parameters from URL
    const queryParams = new URLSearchParams(location.search);
    
    // Parse the books from URL parameters
    const books: Book[] = [];
    let index = 0;
    let hasMoreBooks = true;
    
    // Loop through book parameters until no more books are found
    while (hasMoreBooks) {
      const id = queryParams.get(`books[${index}][id]`);
      if (!id) {
        hasMoreBooks = false;
        break;
      }
      
      books.push({
        id: id,
        title: queryParams.get(`books[${index}][title]`) || '',
        quantity: parseInt(queryParams.get(`books[${index}][quantity]`) || '0'),
        unit_price: queryParams.get(`books[${index}][unit_price]`) || '',
        subtotal: parseInt(queryParams.get(`books[${index}][subtotal]`) || '0'),
        book_uuid: queryParams.get(`books[${index}][book_uuid]`) || ''
      });
      
      index++;
    }
    
    // Create payment details object from URL parameters
    const details: PaymentDetails = {
      transaction_ids: queryParams.get('transaction_ids') || '',
      amount: parseInt(queryParams.get('amount') || '0'),
      user_id: queryParams.get('user_id') || '',
      user_name: queryParams.get('user_name') || '',
      payment_status: queryParams.get('payment_status') || '',
      books: books,
      date: new Date().toLocaleDateString(), // Current date as we don't have it in the URL
      // Generate order number using date and random number
      orderNumber: 'ORD-' + Math.floor(100000 + Math.random() * 900000)
    };
    
    setPaymentDetails(details);

    return () => clearTimeout(timer);
  }, [location]);

  // const handleViewBook = () => {
  //   navigate('/library');
  // };

  const handleGoToHome = () => {
    navigate('/');
  };

  // Format currency function
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
        {!loading && paymentDetails && (
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
                  Thank you for your purchase, {paymentDetails.user_name}. Your {paymentDetails.books.length > 1 ? 'books are' : 'book is'} now available in your library.
                </p>
              </motion.div>

              <div className="border-t border-gray-200 my-6"></div>

              {/* Order Details */}
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
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-medium">{formatCurrency(paymentDetails.amount / 100)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-green-600">{paymentDetails.payment_status}</p>
                  </div>
                  
                  {/* User Information */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-md font-semibold">Customer Information</h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{paymentDetails.user_name}</p>
                  </div>
                  {/* <div>
                    <p className="text-sm text-gray-500">User ID</p>
                    <p className="font-medium">{paymentDetails.user_id}</p>
                  </div> */}
                  
                  {/* Books Section */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-md font-semibold mb-2">Purchased Items</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      {paymentDetails.books.map((book, index) => (
                        <div key={book.book_uuid} className={`${index > 0 ? 'border-t border-gray-200 pt-3 mt-3' : ''}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{book.title}</p>
                              <p className="text-sm text-gray-500">
                                {book.quantity} x {book.unit_price}
                              </p>
                            </div>
                            <p className="font-medium">{formatCurrency(book.subtotal / 100)}</p>
                          </div>
                        </div>
                      ))}
                      <div className="border-t border-gray-300 mt-3 pt-3 flex justify-between font-bold">
                        <span>Total</span>
                        <span>{formatCurrency(paymentDetails.amount / 100)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="border-t border-gray-200 my-6"></div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                  {/* <button
                    onClick={handleViewBook}
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg 
                             shadow-lg hover:translate-y-1 hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    View Your {paymentDetails.books.length > 1 ? 'Books' : 'Book'}
                  </button> */}
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

            {/* Support Link */}
            <motion.div variants={itemVariants} className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Having issues with your order?{' '}
                <span
                  className="text-blue-600 cursor-pointer underline hover:text-blue-800"
                  onClick={() => navigate('/contact')}
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