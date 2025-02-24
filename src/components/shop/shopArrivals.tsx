import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../../redux/Books/books_api_slice';
import { addToCart, CartItem } from '../../redux/Order/order_api_slice';


// interface Book {
//   id: number;
//   title: string;
//   author: string;
//   price: number;
//   imageUrl: string;
// }

// interface PromoBook {
//   id: number;
//   title: string;
//   discount: number;
//   category: string;
//   imageUrl: string;
//   actionText: string;
// }

export interface Book {
  id: string;
  title: string;
  author: string;
  uuid: string;
  price: number;
  rating_score: string;
  rating_count: number;
  description: string;
  coverImage: string;
}

export const generateDummyBooks = (count: number): Book[] => {
  const descriptions = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porttitor faucibus aliquet.",
    "Fusce imperdiet porttitor erat, sit amet viverra nunc gravida quis. Curabitur sapien",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere consequat eros..."
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `book-${i + 1}`,
    title: `Natural Healing ${i + 1}`,
    author: `Dr. Author ${i + 1}`,
    price: 149.99,
    uuid: '34vjhk34gughv-345oh3v',
    rating_score: '550',
    rating_count: 4.2,
    description: descriptions[i % descriptions.length],
    coverImage: `/oversabinurse/pa-1.png`,
  }));
};


const NewArrivals: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const { books, loading, error } = useAppSelector((state) => state.books);
  const [localBooks, setLocalBooks] = useState<Book[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  
  useEffect(() => {
    dispatch(getBooks());
    setLocalBooks(generateDummyBooks(48));
  }, [dispatch]);
  


  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const checkScroll = () => {
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    };

    container.addEventListener('scroll', checkScroll);
    checkScroll(); // Initial check

    // Handle resize
    const handleResize = () => {
      checkScroll();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const displayedBooks = books.length > 0 ? books : localBooks;
   console.log('displayedBooks', displayedBooks);
  
  const handleBookClick = (bookId: string) => {
    navigate(`/shop/books/${bookId}`);
  };


  // const handleAddToCart = (e: React.MouseEvent, bookId: string) => {
  //   e.stopPropagation(); // Prevent navigation when clicking add to cart
  //   // Add your cart logic here
  //   console.log('Adding to cart:', bookId);
  // };
  console.log('localbooks', localBooks);



  if (loading) return <div className="text-center py-8"> 
  <div className="flex justify-center items-center w-full">
    <svg
      className="animate-spin h-10 w-10 text-[#380A48]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
      ></path>
    </svg>
  </div>
  </div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  

  


  // const books: Book[] = [
  //   {
  //     id: 1,
  //     title: "A God Who Hates Women",
  //     author: "Sabela Hupter",
  //     price: 120.00,
  //     imageUrl: "/oversabinurse/pa-1.png"
  //   },
  //   {
  //     id: 2,
  //     title: "Clinical Medicine Update",
  //     author: "MPS Chawla",
  //     price: 120.00,
  //     imageUrl: "/oversabinurse/pa-2.png"
  //   },
  //   {
  //     id: 3,
  //     title: "Life in Summer",
  //     author: "Marie Novele",
  //     price: 120.00,
  //     imageUrl: "/oversabinurse/pa-1.png"
  //   },
  //   {
  //     id: 4,
  //     title: "Clinical Practice",
  //     author: "Prashant Prakash",
  //     price: 120.00,
  //     imageUrl: "/oversabinurse/pa-2.png"
  //   },
  //   // Add more books to enable scrolling
  // ];

  // const promoBooks: PromoBook[] = [
  //   {
  //     id: 1,
  //     title: "Red Rising",
  //     discount: 35,
  //     category: "New Release",
  //     imageUrl: "/oversabinurse/pb-1.svg",
  //     actionText: "Shop Now"
  //   },
  //   {
  //     id: 2,
  //     title: "Jade City",
  //     discount: 35,
  //     category: "Pre Order Now",
  //     imageUrl: "/oversabinurse/pb-2.png",
  //     actionText: "Shop Now"
  //   },
  //   {
  //     id: 3,
  //     title: "Last Stand in Lychford",
  //     discount: 45,
  //     category: "Top Rated",
  //     imageUrl: "/oversabinurse/pb-3.png",
  //     actionText: "Shop Now"
  //   }
  // ];

 

  const scrollToDirection = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard = container.querySelector('.book-card');
    if (!firstCard) return;
    
    // Get the width of a single card plus gap (24px)
    const cardWidth = firstCard.clientWidth + 24;
    
    // Calculate target position - one card at a time
    const targetPosition = direction === 'left'
      ? Math.max(0, container.scrollLeft - cardWidth)
      : container.scrollLeft + cardWidth;
    
    container.scrollTo({
      left: targetPosition,
      behavior: 'smooth'
    });
  };



  
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
  };


  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* New Arrivals Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollToDirection('left')}
              className={`p-2 rounded-full transition-opacity duration-300 ${
                showLeftButton ? 'bg-gray-100 hover:bg-gray-200 opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => scrollToDirection('right')}
              className={`p-2 rounded-full transition-opacity duration-300 ${
                showRightButton ? 'bg-gray-100 hover:bg-gray-200 opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto mx-auto overflow-y-hidden scroll-smooth gap-6 snap-x snap-mandatory"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {displayedBooks.map((book) => (
            <div 
              key={book.id} 
              onClick={() => handleBookClick(book.uuid)}
              className="book-card flex-none w-full  cursor-pointer max-w-[290px] bg-white rounded-lg  snap-center"
            >
              <div className="relative">
                <img 
                  src={book.coverImage || '/oversabinurse/pa-1.png'} 
                  alt={book.title}
                  className="w-full h-[415px] object-cover rounded-t-lg"
                />
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white"
                  aria-label="Add to favorites"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <button onClick={(e) =>{e.stopPropagation(); handleAddToCart(book)}} className="bg-primary-mainPink left-0 right-0 mx-6 absolute font-[400] bottom-4 text-white px-4 py-2 rounded-md hover:bg-pink-600">
                    Add to cart
                  </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">By {book.author}</p>
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-primary-mainPink">${book.price}</span>
                  
                </div>
              </div>
            </div>
          ))}
          
          {/* Add an empty spacer element at the end to ensure last card can fully scroll into view */}
          <div className="flex-none w-6 snap-end"></div>
        </div>
      </div>

      {/* Promotional Books Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {promoBooks.map((book) => (
          <div 
            key={book.id}
            className={`relative rounded-lg overflow-hidden h-full pt-4 pb-1 gap-8 flex items-center justify-center ${
              book.id === 1 ? 'bg-red-600' :
              book.id === 2 ? 'bg-green-600' :
              'bg-blue-900'
            }`}
          >
            <div className="relative text-white text-center">
              <div className="text-lg font-bold mb-2">{book.discount}% OFF</div>
              <h3 className="text-4xl font-bold mb-4">{book.category}</h3>
              <button className=" text-white px-6 py-2 rounded-md bg-[#27272741]">
                {book.actionText}
              </button>
            </div>
            <div className="">
              <img 
                src={book.imageUrl}
                alt={book.title}
                className="w-[156px] h-[243px] object-cover "
              />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default NewArrivals;