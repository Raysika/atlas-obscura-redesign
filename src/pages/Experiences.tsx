
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperiencesHero from '@/components/ExperiencesHero';
import ExperiencesGrid from '@/components/ExperiencesGrid';
import ExperienceFilters from '@/components/ExperienceFilters';

const Experiences = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string | null) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <ExperiencesHero onSearch={handleSearch} />
      <ExperienceFilters 
        selectedFilter={selectedFilter} 
        onFilterChange={handleFilterChange} 
      />
      <ExperiencesGrid 
        searchQuery={searchQuery} 
        selectedFilter={selectedFilter} 
      />
      <Footer />
    </div>
  );
};

export default Experiences;
