import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { allPaths } from '../../utils/path';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { searchBooksByQuery } from '../../redux/Books/books_api_slice';

// interface NavbarProps {
//   // onCartClick: () => void;
//   cartItemsCount?: number;
// }

const ShopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
    const {  items } = useAppSelector(state => state.order);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

const { isAuth } = useAppSelector((state) => state.auth);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchBooksByQuery(searchQuery));
      navigate(`/shop/search?query=${searchQuery}`); 
    }
    setSearchQuery('');
    setIsMenuOpen(!isMenuOpen)
  };
  const getUser = localStorage.getItem('them-user');
  

  return (
    <nav className="bg-white fixed top-0 w-full z-[9000] shadow-md">
      <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/Oversabi-Nurse-logo.png"
                alt="Oversata Store"
                className="h-12 w-auto -mt-4"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-16 flex-1 justify-between ml-20">
            <Link to="/shop" className="inline-flex gap-2">
              <span className="">
                <img src="/oversabinurse/categories.svg" alt="" />
              </span>
              <p className="text-gray-700 hover:text-gray-900">
                Home
              </p>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>


            {/* Auth and Cart */}
            <div className="flex items-center space-x-16">
              <Link
                to={allPaths.auth.login}
                className="text-gray-700 hover:text-gray-900 flex items-center space-x-1"
              >
                <User className="h-5 w-5" />
                <span>{isAuth && getUser ? `Welcome back ${getUser}` :'Login/Register'}</span>
              </Link>
              <Link to={'/shop/cart'}
                className="text-gray-700  hover:text-gray-900 relative"
              >
                <ShoppingCart className="h-6 w-6 inline mr-2" />
                  <span className="absolute -top-2 right-8 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length > 0 ? items.length : 0} 
                  </span>
                Cart
              </Link>
            </div>
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link 
              to={'/shop/cart'}
              className="text-gray-700 hover:text-gray-900 relative"
            >
              <ShoppingCart className="h-6 w-6" />

                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length > 0 ?  items.length : 0}
                </span>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>



      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to={allPaths.auth.login}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
             {isAuth && getUser ?`Welcome back ${getUser}` :'Login/Register'}
            </Link>
            <form onSubmit={handleSearch} className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ShopNavbar;