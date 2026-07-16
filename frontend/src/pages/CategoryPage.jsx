import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../mockData';

const CategoryPage = () => {
  const { slug } = useParams();
  
  const category = categories.find(c => c.slug === slug);
  
  const filteredProducts = useMemo(() => {
    if (slug === 'new-arrivals') {
      return products.filter(p => p.featured);
    }
    return products.filter(p => p.category === slug);
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{category?.name || 'Products'}</h1>
          <p className="text-gray-300">Browse our collection of premium vape products</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredProducts.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">{filteredProducts.length} products found</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;