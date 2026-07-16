import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../mockData';

const Home = () => {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-start bg-gradient-to-r from-black to-transparent">
        <div
          className="absolute inset-0 z-0"
          style={
            {
              backgroundImage: 'url(https://images.unsplash.com/photo-1594189741508-5212175833ad?w=1920)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }
          }
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gray-300"></div>
              <p className="text-gray-300 text-sm tracking-wider uppercase">Premium Vapes. Authentic Experience.</p>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-4">
              <span className="text-white">VAPE SHOP</span>
              <br />
              <span className="text-[#d4af37]">CHENNAI</span>
            </h1>
            <p className="text-white text-lg mb-8 max-w-xl">
              Your one-stop destination for premium vapes, authentic products and unmatched quality.
            </p>
            <Link
              to="/category/new-arrivals"
              className="inline-flex items-center gap-2 bg-[#d4af37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#c4a030] transition-colors"
            >
              Shop Now
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="bg-white p-6 rounded-lg text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/category/new-arrivals" className="hover:underline flex items-center gap-1" style={{ color: siteSettings.primaryColor }}>
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      {siteSettings.showWhatsAppButton && (
        <a
          href={`https://wa.me/${siteSettings.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all z-50 hover:scale-110 transform duration-200"
          style={{ backgroundColor: siteSettings.secondaryColor }}
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      )}

      {/* Call Button */}
      {siteSettings.showCallButton && (
        <a
          href={`tel:${siteSettings.phone}`}
          className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50 hover:scale-110 transform duration-200"
        >
          <Phone className="w-6 h-6" />
        </a>
      )}
    </div>
  );
};

export default Home;