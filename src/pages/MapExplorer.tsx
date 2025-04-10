
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPinOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Location } from '@/types/location';
import { getLocations } from '@/utils/locationData';
import { useIsMobile } from '@/hooks/use-mobile';
import MapView from '@/components/MapView';

// Default public Mapbox token for demonstration purposes
const DEFAULT_MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZS1haSIsImEiOiJjbHkxbHdhNmwwNDF0MnFxaW53MXVsZ2liIn0.a5Q4EuE2EffpP2g0LiJbnA';

const MapExplorer = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>(DEFAULT_MAPBOX_TOKEN);
  const [isTokenSet, setIsTokenSet] = useState(true); // Set to true by default now
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  // Handle location select
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsInfoCardOpen(true);
  };

  // Handle closing info card
  const handleCloseInfoCard = () => {
    setIsInfoCardOpen(false);
  };

  // Handle token submission (in case user wants to use their own token)
  const handleTokenSubmit = (token: string) => {
    setMapboxToken(token);
    setIsTokenSet(true);
    localStorage.setItem('mapbox_token', token);
  };

  // Check for token in localStorage on initial load
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
    // Always set isTokenSet to true since we have a default token now
    setIsTokenSet(true);
  }, []);

  // Load locations data
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Error loading locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'historical':
        return '🏛️';
      case 'natural':
        return '🌋';
      case 'abandoned':
        return '🏚️';
      case 'architectural':
        return '🏰';
      case 'cultural':
        return '🎭';
      default:
        return '📍';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-muted/30 px-4 py-6 md:py-8 border-b border-border">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif mb-2">Map Explorer</h1>
            <p className="text-muted-foreground max-w-3xl">
              Discover fascinating locations around the world with our interactive map. 
              Click on the markers to learn more about each unique destination.
            </p>
          </div>
        </div>
        
        <div className="flex-1 relative">
          {/* Map Component */}
          <MapView 
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
            mapboxToken={mapboxToken}
          />
          
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <div className="flex flex-col items-center">
                <Loader className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          )}
          
          {/* Info Card - Mobile Dialog */}
          {isMobile && (
            <Dialog open={isInfoCardOpen} onOpenChange={setIsInfoCardOpen}>
              <DialogContent className="sm:max-w-md p-0">
                {selectedLocation && (
                  <>
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={selectedLocation.image} 
                        alt={selectedLocation.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/90 rounded-full mb-2">
                          {getCategoryIcon(selectedLocation.category)} {selectedLocation.category}
                        </span>
                        <h2 className="text-xl font-serif font-semibold">{selectedLocation.title}</h2>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-foreground leading-relaxed mb-4">
                        {selectedLocation.shortDescription}
                      </p>
                      <Button className="w-full">Read More</Button>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          )}
          
          {/* Info Card - Desktop Floating Card */}
          {!isMobile && selectedLocation && isInfoCardOpen && (
            <Card className="absolute bottom-6 right-6 w-80 shadow-lg overflow-hidden animate-fade-in z-20">
              <div className="relative h-40">
                <button 
                  className="absolute top-2 right-2 bg-black/40 text-white p-1.5 rounded-full hover:bg-black/60 transition-colors z-10"
                  onClick={handleCloseInfoCard}
                >
                  <MapPinOff className="h-4 w-4" />
                </button>
                <img 
                  src={selectedLocation.image} 
                  alt={selectedLocation.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/90 rounded-full mb-1">
                    {getCategoryIcon(selectedLocation.category)} {selectedLocation.category}
                  </span>
                  <h3 className="text-lg font-serif font-semibold">{selectedLocation.title}</h3>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-foreground leading-relaxed mb-4">
                  {selectedLocation.shortDescription}
                </p>
                <Button size="sm" className="w-full">Read More</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MapExplorer;
