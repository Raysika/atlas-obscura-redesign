
import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Compass, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { getLocations } from '@/utils/locationData';
import { Location, LocationCategory, Region } from '@/types/location';

interface LocationsSidebarProps {
  onLocationSelect: (location: Location) => void;
}

const LocationsSidebar = ({ onLocationSelect }: LocationsSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<Region | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'popularity'>('name');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredLocations = locations
    .filter(location => 
      location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(location => selectedCategory === 'all' || location.category === selectedCategory)
    .filter(location => selectedRegion === 'all' || location.region === selectedRegion)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else {
        return b.popularity - a.popularity;
      }
    });

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden absolute top-4 left-4 z-20 bg-white rounded-full p-2 shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <MapPin size={24} className="text-primary" />
      </button>

      {/* Sidebar */}
      <aside className={`
        bg-card border-r w-full md:w-80 h-full z-10 transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        fixed md:relative top-0 left-0
      `}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-serif mb-4 flex items-center">
            <Compass className="mr-2 text-primary" />
            Explore Locations
          </h2>
          
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 mb-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as LocationCategory | 'all')}>
                  <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="historical">Historical</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="natural">Natural Wonders</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="abandoned">Abandoned Places</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="architectural">Architectural</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="cultural">Cultural</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <MapPin className="mr-2 h-4 w-4" />
                  {selectedRegion === 'all' ? 'All Regions' : selectedRegion.replace('-', ' ')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Filter by Region</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={selectedRegion} onValueChange={(v) => setSelectedRegion(v as Region | 'all')}>
                  <DropdownMenuRadioItem value="all">All Regions</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="north-america">North America</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="south-america">South America</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="europe">Europe</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="africa">Africa</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="asia">Asia</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="oceania">Oceania</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="antarctica">Antarctica</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {sortBy === 'name' ? 
                    <span className="flex items-center">#</span> : 
                    <Star className="h-4 w-4" />
                  }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as 'name' | 'popularity')}>
                  <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="popularity">Popularity</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-230px)]">
          <div className="p-4">
            {isLoading ? (
              // Loading state
              Array(5).fill(0).map((_, index) => (
                <div key={index} className="mb-4">
                  <Skeleton className="h-24 mb-2 rounded-md" />
                </div>
              ))
            ) : filteredLocations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No locations found.</p>
                <p>Try adjusting your filters.</p>
              </div>
            ) : (
              filteredLocations.map(location => (
                <div 
                  key={location.id}
                  className="mb-4 bg-card rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => onLocationSelect(location)}
                >
                  <div className="flex h-24">
                    <div className="w-1/3 overflow-hidden">
                      <img 
                        src={location.image} 
                        alt={location.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="w-2/3 p-3">
                      <h3 className="font-serif font-medium text-sm mb-1 line-clamp-1">{location.title}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="capitalize">{location.region.replace('-', ' ')}</span>
                      </div>
                      <p className="text-xs line-clamp-2 text-gray-600">{location.shortDescription}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default LocationsSidebar;
