
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ExperiencesHeroProps {
  onSearch: (query: string) => void;
}

const ExperiencesHero = ({ onSearch }: ExperiencesHeroProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="relative bg-cover bg-center pt-32 pb-20 text-center" 
         style={{ 
           backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' 
         }}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Extraordinary Experiences
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Discover unique adventures and immersive cultural experiences curated by experts and local guides.
        </p>
        
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative">
          <Input
            type="text"
            placeholder="Search experiences..."
            className="pl-10 pr-4 py-3 rounded-full bg-white/90 backdrop-blur-sm text-black placeholder:text-gray-500 h-12"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExperiencesHero;
