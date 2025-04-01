
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlacesGrid from '@/components/PlacesGrid';
import CategorySection from '@/components/CategorySection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    // Scroll to places section when a category is selected
    const placesSection = document.getElementById('places');
    if (placesSection) {
      placesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero onCategorySelect={handleCategorySelect} />
      <CategorySection onCategorySelect={handleCategorySelect} />
      <PlacesGrid selectedCategory={selectedCategory} />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
