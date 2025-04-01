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
    title: "Waitomo Glowworm Caves",
    location: "Waitomo, New Zealand",
    category: "Natural Wonder",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "These caves are home to thousands of luminescent glowworms that create a stunning starry night effect on the cave ceiling."
  },
  {
    id: "4",
    title: "Crooked Forest",
    location: "Gryfino, Poland",
    category: "Natural Wonder",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    description: "Around 400 pine trees grow with a 90-degree bend at their base, all pointing in the same direction for mysterious reasons."
  },
  {
    id: "5",
    title: "Pamukkale Thermal Pools",
    location: "Denizli, Turkey",
    category: "Natural Wonder",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    description: "Stunning white travertine terraces filled with mineral-rich thermal waters that have been used for bathing since Roman times."
  },
  
  {
    id: "6",
    title: "Winchester Mystery House",
    location: "San Jose, California",
    category: "Architectural Marvel",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
    description: "A bizarre mansion built by the widow of the Winchester rifle magnate with staircases leading to nowhere and doors opening into walls."
  },
  {
    id: "7",
    title: "Sagrada Familia",
    location: "Barcelona, Spain",
    category: "Architectural Marvel",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "Antoni Gaudí's unfinished masterpiece combining Gothic and Art Nouveau styles, under construction since 1882."
  },
  {
    id: "8",
    title: "Fallingwater",
    location: "Pennsylvania, USA",
    category: "Architectural Marvel",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "Frank Lloyd Wright's masterpiece built over a waterfall, perfectly integrating the building with its natural surroundings."
  },
  {
    id: "9",
    title: "The Crooked House",
    location: "Sopot, Poland",
    category: "Architectural Marvel",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "A bizarrely distorted building inspired by the fairy tale illustrations of Jan Marcin Szancer, appearing as if warped by a funhouse mirror."
  },
  {
    id: "10",
    title: "The Basket Building",
    location: "Ohio, USA",
    category: "Architectural Marvel",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "A seven-story office building shaped exactly like a giant picnic basket, complete with handles."
  },
  
  {
    id: "11",
    title: "Catacombs of Paris",
    location: "Paris, France",
    category: "Historical Site",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
    description: "Underground ossuaries holding the remains of more than six million people in a small part of the former mines of Paris."
  },
  {
    id: "12",
    title: "Pompeii",
    location: "Naples, Italy",
    category: "Historical Site",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    description: "Ancient Roman city buried under volcanic ash following the eruption of Mount Vesuvius in 79 CE, preserved in remarkable detail."
  },
  {
    id: "13",
    title: "Göbekli Tepe",
    location: "Şanlıurfa, Turkey",
    category: "Historical Site",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    description: "The world's oldest known megalithic structure, dating back to 9500 BCE, predating Stonehenge by 6,000 years."
  },
  {
    id: "14",
    title: "Hatra",
    location: "Iraq",
    category: "Historical Site",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    description: "Ancient city that withstood Roman invasions thanks to its thick walls reinforced by towers, dating back to the 2nd century BCE."
  },
  {
    id: "15",
    title: "Newgrange",
    location: "County Meath, Ireland",
    category: "Historical Site",
    imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
    description: "A prehistoric monument built around 3200 BCE, older than Stonehenge and the Egyptian pyramids, aligned with the winter solstice sunrise."
  },
  
  {
    id: "16",
    title: "Marble Caves",
    location: "Chile Chico, Chile",
    category: "Hidden Gem",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    description: "Stunning marble formations reflected in the turquoise waters of General Carrera Lake, accessible only by boat."
  },
  {
    id: "17",
    title: "Quinta da Regaleira",
    location: "Sintra, Portugal",
    category: "Hidden Gem",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    description: "A mysterious estate with symbolic structures including an inverted tower that represents Dante's Inferno, connected by underground tunnels."
  },
  {
    id: "18",
    title: "Devetashka Cave",
    location: "Lovech, Bulgaria",
    category: "Hidden Gem",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    description: "A massive karst cave with seven huge holes in its ceiling allowing sunlight to beam through, inhabited by 30,000 bats."
  },
  {
    id: "19",
    title: "Lake Hillier",
    location: "Western Australia",
    category: "Hidden Gem",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    description: "A bright pink lake whose color, unlike other pink lakes, doesn't change when its water is contained. Scientists are still not entirely sure why it's pink."
  },
  {
    id: "20",
    title: "Hang Son Doong",
    location: "Quang Binh, Vietnam",
    category: "Hidden Gem",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    description: "The world's largest cave passage by volume, so enormous it has its own weather system and could fit an entire Manhattan city block inside it."
  },
  
  {
    id: "21",
    title: "Tsukiji Fish Market",
    location: "Tokyo, Japan",
    category: "Food & Drink",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "The world's largest fish market and a culinary landmark where visitors can witness tuna auctions and enjoy the freshest sushi for breakfast."
  },
  {
    id: "22",
    title: "La Tomatina Festival",
    location: "Buñol, Spain",
    category: "Food & Drink",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "An annual festival where participants engage in a massive tomato fight, using over 140 tons of overripe tomatoes."
  },
  
  {
    id: "23",
    title: "Pripyat",
    location: "Ukraine",
    category: "Abandoned Places",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "Ghost town abandoned after the 1986 Chernobyl disaster, frozen in time with Soviet-era artifacts still in place."
  },
  {
    id: "24",
    title: "Hashima Island",
    location: "Japan",
    category: "Abandoned Places",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    description: "Once the most densely populated place on Earth, this former coal mining facility was abandoned in 1974 and is now a crumbling concrete jungle."
  }
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

  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory]);
    }
  }, [selectedCategory]);
  
  useEffect(() => {
    let results = placesData;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(place => 
        place.title.toLowerCase().includes(query) || 
        place.description.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategories.length > 0) {
      results = results.filter(place => selectedCategories.includes(place.category));
    }
    
    setFilteredPlaces(results);
  }, [searchQuery, selectedCategories]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };

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
        
        <div className="mb-8 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search places by name, description or location..."
              className="pl-10 py-6 text-base"
            />
          </div>
          
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
        
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {filteredPlaces.length === 0 ? (
              "No places found. Try adjusting your filters."
            ) : (
              `Showing ${filteredPlaces.length} ${filteredPlaces.length === 1 ? 'place' : 'places'}`
            )}
          </p>
        </div>
        
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
