import { useState } from 'react';
import { ExternalLink, Heart } from 'lucide-react';
import Footer from '../components/Footer';

const categories = ['All', 'Wellness', 'Books', 'Kitchen', 'Fitness', 'Self-Care'];

const favoriteItems = [
  {
    id: 1,
    name: 'FASTer Way to Fat Loss',
    description: 'A comprehensive nutrition and fitness program that has transformed my approach to health and wellness. Perfect for sustainable lifestyle changes.',
    category: 'Fitness',
    store: 'FASTer Way',
    storeUrl: 'https://www.fasterwaycoach.com/?aid=Kristicatt',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80',
  },
  {
    id: 2,
    name: 'Olivetree People',
    description: 'Premium wellness products that support overall health and vitality. Natural, effective solutions I trust and recommend.',
    category: 'Wellness',
    store: 'Olivetree People',
    storeUrl: 'https://us.olivetreepeople.com/?referral=kristicatt',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&q=80',
  },
  {
    id: 3,
    name: 'LifeWave Patches',
    description: 'Innovative wellness technology that supports energy, recovery, and overall well-being. A game-changer in my daily routine.',
    category: 'Wellness',
    store: 'LifeWave',
    storeUrl: 'https://www.lifewave.com/kristicatt',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&q=80',
  },
  {
    id: 4,
    name: 'Apollo Neuro',
    description: 'Wearable wellness technology that helps improve sleep, focus, and stress management. Use code KRISTICATT for $99 off!',
    category: 'Wellness',
    store: 'Apollo Neuro',
    storeUrl: 'https://apolloneuro.com/kristicatt',
    promoCode: 'KRISTICATT',
    promoDetails: '$99.00 off',
    image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=500&q=80',
  },
];

export default function FavoriteThings() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = activeCategory === 'All' 
    ? favoriteItems 
    : favoriteItems.filter(item => item.category === activeCategory);

  return (
    <>
      <div className="min-h-screen bg-neutral-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-neutral-50 pt-24 pb-16 sm:pt-32 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              <span className="text-sm font-medium text-neutral-700">Curated Recommendations</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 mb-6">
              My Favorite Things
            </h1>
            <p className="text-lg sm:text-xl text-neutral-700 max-w-2xl mx-auto leading-relaxed">
              Tools, resources, and products that support my wellness journey and help me live intentionally
            </p>
          </div>
        </section>

        {/* Category Filters */}
        <section className="bg-white border-b border-neutral-200 sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-accent text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="inline-block bg-accent/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-neutral-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Store Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="text-sm text-neutral-500">
                        Available at <span className="font-semibold text-neutral-700">{item.store}</span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    {item.promoCode && (
                      <div className="mt-3 p-3 bg-accent/10 border border-accent/20 rounded-lg">
                        <div className="text-xs text-neutral-600 mb-1">Use code:</div>
                        <div className="flex items-center justify-between">
                          <code className="text-sm font-bold text-primary">{item.promoCode}</code>
                          <span className="text-xs text-accent font-medium">{item.promoDetails}</span>
                        </div>
                      </div>
                    )}

                    {/* CTA Button */}
                    <a
                      href={item.storeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors no-underline shadow-sm"
                    >
                      Shop Now
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-neutral-500 text-lg">No items found in this category.</p>
              </div>
            )}
          </div>
        </section>

        {/* Decorative Elements */}
        <div className="fixed top-1/4 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
        <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      </div>

      <Footer />
    </>
  );
}
