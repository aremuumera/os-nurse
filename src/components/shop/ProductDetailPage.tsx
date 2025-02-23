  // pages/BookDetails.tsx
  import React, { useEffect } from 'react';
  import { useParams, useNavigate, Link } from 'react-router-dom';
  import { Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getBookDetails } from '../../redux/Books/books_api_slice';
import { FaArrowLeft } from "react-icons/fa6";
import { addToCart, CartItem } from '../../redux/Order/order_api_slice';
import { Book } from './shopArrivals';


  


   const BookDetails: React.FC = () => {
    const { productDetail } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { bookDetails, loading, error } = useAppSelector((state) => state.books);
    console.log('Adding to cart:', bookDetails, productDetail);



    useEffect(() => {
      const fetchBookDetails = async () => {
        if (!productDetail) return;
        try {
          await dispatch(getBookDetails(productDetail)).unwrap();
        } catch (err) {
          console.error('Failed to fetch book details:', err);
        }
      };
  
      fetchBookDetails();
    }, [dispatch, productDetail]);
  
    

     const handleAddToCart = (book: Book) => {
        const cartItem: CartItem = {
          id: book.uuid,
          title: book.title,
          color: 'Gunnared biege',
          price: book.price,
          quantity: 1,
          coverImage: book.coverImage
        };
        dispatch(addToCart(cartItem));
        navigate('/shop/cart');
      };
  
    const renderContent = () => {
      if (loading) {
        return (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        );
      }
  
      if (error || !bookDetails) {
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              {error || 'Book not found'}
            </h3>
            <button 
              onClick={() => navigate(-1)}
              className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
              Go Back
            </button>
          </div>
        );
      }
  
      return (
        <div className="grid justify-items-start place-items-center  md:grid-cols-2 gap-20">
          <div className='w-full'>
                <Link  to={'/shop'}> <FaArrowLeft width={100} /> </Link>
                <div className="flex items-center gap-2 pb-16 pt-6 font-[300] text-sm text-gray-600 ">
                    <Link className='text-gray-300' to="/shop">Shop</Link>
                    <span>/</span>
                    <Link to="/shop">Books</Link>
                    <span>/</span>
                    <span>{bookDetails?.title || 'Book Details'}</span>
                </div>
            <h1 className="text-4xl font-[600] mb-2">{bookDetails.title}</h1>
            {/* <p className="text-xl text-gray-600 mb-4">By {bookDetails.author}</p> */}
            
            <div className="flex sm:gap-36 gap-10 items-center pt-3  mb-6">
                <div className="text-2xl font-[400]  text-black ">
                ${bookDetails.price}
                </div>
              <div className="flex gap-2 items-center">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-[400]">{bookDetails.rating_score || '4.5'} / 5.0</span>
                <span className="text-gray-400">({bookDetails.rating_count || '1000'})</span>
              </div>
            </div>
            <p className="text-xl text-gray-600 mb-4">By {bookDetails?.description}</p>

            <button
              onClick={() => handleAddToCart(bookDetails)}
              className="w-full md:w-auto px-16 mt-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors mb-8"
            >
              Purchase
            </button>
          </div>
         

         {/* the images */}
          <div className="relative">
            <img
              src={bookDetails.coverImage ||  '/oversabinurse/home-book-11.svg'}
              alt={bookDetails.title}
              className=""
            />
          </div>
        </div>
      );
    };
  
    return (
      <div className=" mx-auto px-6 max-w-6xl sm:px-4 pt-[80px] pb-8 ">
       <div className="sm:mb-16 mb-4"></div>
        {renderContent()}
      </div>
    );
  };

  export default BookDetails