
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface StoriesHeroProps {
  onSearch: (query: string) => void;
}

const StoriesHero = ({ onSearch }: StoriesHeroProps) => {
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
           backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)' 
         }}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Stories from the Atlas
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Dive into captivating tales of exploration, discovery, and wonder from every corner of the world.
        </p>
        
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative">
          <Input
            type="text"
            placeholder="Search stories..."
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

export default StoriesHero;
