
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapView from '@/components/MapView';
import LocationsSidebar from '@/components/LocationsSidebar';
import LocationInfoCard from '@/components/LocationInfoCard';
import { Location } from '@/types/location';

const MapExplorer = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsInfoCardOpen(true);
  };

  const handleCloseInfoCard = () => {
    setIsInfoCardOpen(false);
  };

  const handleTokenSubmit = (token: string) => {
    setMapboxToken(token);
    setIsTokenSet(true);
    localStorage.setItem('mapbox_token', token);
  };

  // Check for token in localStorage on initial load
  React.useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setIsTokenSet(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {!isTokenSet ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif mb-4">Enter Mapbox Access Token</h2>
            <p className="text-muted-foreground mb-4">
              To use the map explorer, you need a Mapbox access token. 
              Get yours at <a href="https://www.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
            </p>
            <div className="space-y-4">
              <input 
                type="text" 
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="Enter your Mapbox public token"
                className="w-full border rounded-md p-2"
              />
              <button 
                onClick={() => handleTokenSubmit(mapboxToken)}
                className="w-full bg-primary text-white rounded-md p-2"
                disabled={!mapboxToken}
              >
                Set Token
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="bg-muted/30 px-4 py-6 md:py-8 border-b border-border">
            <div className="container mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif mb-2">Map Explorer</h1>
              <p className="text-muted-foreground max-w-3xl">
                I've designed a sleek Map Explorer tab with an interactive world map, searchable location list, and detailed info cards. 
                The interface includes a side panel with filtering options, a Mapbox-powered map with markers, and smooth transitions. 
                Users can set their Mapbox token for security, and the implementation features responsive design with mobile support.
              </p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <LocationsSidebar onLocationSelect={handleLocationSelect} />
            <main className="flex-1 relative overflow-hidden">
              <MapView 
                onLocationSelect={handleLocationSelect} 
                selectedLocation={selectedLocation}
                mapboxToken={mapboxToken}
              />
              <LocationInfoCard 
                location={selectedLocation} 
                isOpen={isInfoCardOpen} 
                onClose={handleCloseInfoCard}
              />
            </main>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default MapExplorer;
