import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allPaths } from '../../utils/path';

interface NavbarProps {
  onCartClick: () => void;
  cartItemsCount?: number;
}

const ShopNavbar = ({ onCartClick, cartItemsCount = 0 }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
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
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
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
                <span>Login/Register</span>
              </Link>
              <button
                onClick={onCartClick}
                className="text-gray-700 hover:text-gray-900 relative"
              >
                <ShoppingCart className="h-6 w-6 inline mr-2" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount} 
                  </span>
                )}
                Cart
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="text-gray-700 hover:text-gray-900 relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
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
              to="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to={allPaths.auth.login}
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Login/Register
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