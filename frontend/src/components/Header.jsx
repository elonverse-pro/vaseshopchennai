import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { categories } from '../mockData';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#2d2d2d] text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          WhatsApp Order is Accepted - 7877475920
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-wide">Vape Shop</h1>
                <p className="text-xs text-gray-600 tracking-wider">Chennai</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-black transition-colors">
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-black transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => document.getElementById('search-dialog').classList.toggle('hidden')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link to="/admin" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden lg:block">
                <User className="w-5 h-5" />
              </Link>
              <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="text-gray-700 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link to="/admin" className="text-gray-700 hover:text-black" onClick={() => setIsMenuOpen(false)}>
                Admin Panel
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Search Dialog */}
      <div id="search-dialog" className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
          <form onSubmit={handleSearch}>
            <div className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-lg"
                autoFocus
              />
              <button
                type="button"
                onClick={() => document.getElementById('search-dialog').classList.add('hidden')}
                className="text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;