
import React, { useState, useEffect } from 'react';
import PlaceCard from './PlaceCard';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Search, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const placesData = [
  {
    id: "1",
    title: "The Door to Hell",
    location: "Derweze, Turkmenistan",
    category: "Natural Wonder",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "This fiery crater has been burning continuously since 1971 when Soviet scientists set it on fire to prevent the spread of natural gas."
  },
  {
    id: "2",
    title: "Glass Beach",
    location: "Fort Bragg, California",
    category: "Natural Wonder",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    description: "Formerly a garbage dump, the ocean has broken down the glass waste into colorful pebbles creating this unique beach."
  },
  {
    id: "3",
    title: "Winchester Mystery House",
    location: "San Jose, California",
    category: "Architectural Marvel",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    description: "A bizarre mansion built by the widow of the Winchester rifle magnate with staircases leading to nowhere and doors opening into walls."
  },
  {
    id: "4",
    title: "Waitomo Glowworm Caves",
    location: "Waitomo, New Zealand",
    category: "Natural Wonder",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "These caves are home to thousands of luminescent glowworms that create a stunning starry night effect on the cave ceiling."
  },
  {
    id: "5",
    title: "Crooked Forest",
    location: "Gryfino, Poland",
    category: "Natural Wonder",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "Around 400 pine trees grow with a 90-degree bend at their base, all pointing in the same direction for mysterious reasons."
  },
  {
    id: "6",
    title: "Catacombs of Paris",
    location: "Paris, France",
    category: "Historical Site",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    description: "Underground ossuaries holding the remains of more than six million people in a small part of the former mines of Paris."
  },
];

// Extract unique categories from places data
const uniqueCategories = [...new Set(placesData.map(place => place.category))];

interface PlacesGridProps {
  selectedCategory?: string | null;
}

const PlacesGrid = ({ selectedCategory }: PlacesGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState(placesData);

  // When selectedCategory prop changes, update the selectedCategories state
  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory]);
    }
  }, [selectedCategory]);
  
  // Filter places based on search query and selected categories
  useEffect(() => {
    let results = placesData;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(place => 
        place.title.toLowerCase().includes(query) || 
        place.description.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      results = results.filter(place => selectedCategories.includes(place.category));
    }
    
    setFilteredPlaces(results);
  }, [searchQuery, selectedCategories]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };

  // Handle category filter change
  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
  };

  return (
    <section id="places" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Extraordinary Places</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most unusual and awe-inspiring destinations from around the world
          </p>
        </div>
        
        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-6">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places by name, description or location..."
              className="pl-10 py-6 text-base"
            />
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-col items-center space-y-3">
            <h3 className="text-md font-medium">Filter by Category</h3>
            <div className="flex flex-wrap justify-center gap-2">
              <ToggleGroup 
                type="multiple" 
                value={selectedCategories}
                onValueChange={handleCategoryChange}
                className="justify-center"
              >
                {uniqueCategories.map((category) => (
                  <ToggleGroupItem 
                    key={category} 
                    value={category}
                    className="px-3 py-1 text-sm rounded-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {category}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            {/* Clear Filters Button - Only show when filters are active */}
            {(searchQuery || selectedCategories.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="text-gray-500 flex items-center gap-1"
              >
                <FilterX className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        
        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredPlaces.length === 0 ? (
              "No places found. Try adjusting your filters."
            ) : (
              `Showing ${filteredPlaces.length} ${filteredPlaces.length === 1 ? 'place' : 'places'}`
            )}
          </p>
        </div>
        
        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              id={place.id}
              title={place.title}
              location={place.location}
              imageUrl={place.imageUrl}
              description={place.description}
              category={place.category}
            />
          ))}
        </div>
        
        {/* Show this only when there are places and the view isn't filtered */}
        {filteredPlaces.length === placesData.length && (
          <div className="mt-12 text-center">
            <button className="inline-flex items-center text-primary font-medium hover:underline">
              View all places
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlacesGrid;
