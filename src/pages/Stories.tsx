
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoriesHero from '@/components/StoriesHero';
import StoriesGrid from '@/components/StoriesGrid';
import StoriesFilter from '@/components/StoriesFilter';

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <StoriesHero onSearch={handleSearch} />
      <StoriesFilter 
        selectedCategory={selectedCategory} 
        onCategoryChange={handleCategoryChange} 
      />
      <StoriesGrid 
        searchQuery={searchQuery} 
        selectedCategory={selectedCategory} 
      />
      <Footer />
    </div>
  );
};

export default Stories;
