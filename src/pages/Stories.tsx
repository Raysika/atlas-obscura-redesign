
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoriesHero from '@/components/StoriesHero';
import StoriesGrid from '@/components/StoriesGrid';
import StoriesFilter from '@/components/StoriesFilter';
import StoryDialog from '@/components/StoryDialog';
import { StoryData } from '@/components/StoryCard';

const Stories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleSelectStory = (story: StoryData) => {
    setSelectedStory(story);
    setDialogOpen(true);
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
        onSelectStory={handleSelectStory}
      />
      <StoryDialog 
        story={selectedStory}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <Footer />
    </div>
  );
};

export default Stories;
