
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PlacesGrid from '@/components/PlacesGrid';
import CategorySection from '@/components/CategorySection';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <CategorySection />
      <PlacesGrid />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
