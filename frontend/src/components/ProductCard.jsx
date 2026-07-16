import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleWhatsAppOrder = () => {
    const message = `Hi, I want to order ${product.name} - ₹${product.price}`;
    const whatsappUrl = `https://wa.me/917877475920?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        {product.featured && (
          <div className="absolute top-2 right-2">
            <span className="bg-[#d4af37] text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          <button
            onClick={handleWhatsAppOrder}
            disabled={!product.inStock}
            className="bg-[#25D366] text-white px-4 py-2 rounded-lg hover:bg-[#20ba5a] transition-colors flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;