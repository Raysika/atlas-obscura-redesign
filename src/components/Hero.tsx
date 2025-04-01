
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onCategorySelect: (category: string) => void;
}

const Hero = ({ onCategorySelect }: HeroProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Scroll to places section with search query
      const placesSection = document.getElementById('places');
      if (placesSection) {
        placesSection.scrollIntoView({ behavior: 'smooth' });
      }
      // We'll implement this in PlacesGrid component
    }
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
          alt="Mountain landscape with sun rays"
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative pt-20">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Discover the World's Hidden Wonders
          </h1>
          <p className="text-xl text-white/90 md:pr-12">
            Unusual destinations, incredible stories, and hidden gems from around the world
          </p>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a destination or wonder..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
              />
            </div>
            <Button type="submit" className="rounded-full text-white" size="lg">
              Explore Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
          
          {/* Quick Links */}
          <div className="flex flex-wrap gap-4 pt-4">
            <span className="text-white font-medium">Popular:</span>
            <a 
              href="#places" 
              onClick={(e) => {
                e.preventDefault();
                onCategorySelect("Natural Wonder");
              }}
              className="text-white/80 hover:text-white hover:underline transition"
            >
              Natural Wonders
            </a>
            <a 
              href="#places" 
              onClick={(e) => {
                e.preventDefault();
                onCategorySelect("Architectural Marvel");
              }}
              className="text-white/80 hover:text-white hover:underline transition"
            >
              Architectural Marvels
            </a>
            <a 
              href="#places" 
              onClick={(e) => {
                e.preventDefault();
                onCategorySelect("Historical Site");
              }}
              className="text-white/80 hover:text-white hover:underline transition"
            >
              Historical Sites
            </a>
            <a 
              href="#places" 
              onClick={(e) => {
                e.preventDefault();
                onCategorySelect("Hidden Gem");
              }}
              className="text-white/80 hover:text-white hover:underline transition"
            >
              Hidden Gems
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
