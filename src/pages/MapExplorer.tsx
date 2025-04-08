
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPinOff, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Location } from '@/types/location';
import { getLocations } from '@/utils/locationData';
import { useIsMobile } from '@/hooks/use-mobile';

const MapExplorer = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isInfoCardOpen, setIsInfoCardOpen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Handle location select
  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setIsInfoCardOpen(true);

    // Fly to the location
    if (map) {
      map.flyTo({
        center: location.coordinates,
        zoom: 8,
        duration: 1500,
        essential: true
      });
    }
  };

  // Handle closing info card
  const handleCloseInfoCard = () => {
    setIsInfoCardOpen(false);
  };

  // Handle token submission
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
      setIsTokenSet(true);
    }
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

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || !isTokenSet) return;

    const initializeMap = async () => {
      try {
        // Dynamically import mapbox-gl to ensure it only loads in the browser
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');
        
        mapboxgl.default.accessToken = mapboxToken;
        
        const newMap = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/outdoors-v12',
          center: [0, 20],
          zoom: 1.8,
          projection: 'globe',
          attributionControl: false
        });

        // Add navigation controls
        newMap.addControl(
          new mapboxgl.default.NavigationControl({
            visualizePitch: true
          }),
          'top-right'
        );

        // Add fullscreen control
        newMap.addControl(new mapboxgl.default.FullscreenControl(), 'top-right');

        // Add atmosphere styling
        newMap.on('style.load', () => {
          newMap.setFog({
            color: 'rgb(255, 255, 255)',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
          });
        });

        // Auto rotation settings
        const secondsPerRevolution = 360;
        const maxSpinZoom = 5;
        let userInteracting = false;
        let spinEnabled = true;

        function spinGlobe() {
          if (!newMap || !spinEnabled || userInteracting) return;
          
          const zoom = newMap.getZoom();
          if (zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > 3) {
              const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - 3);
              distancePerSecond *= zoomDif;
            }
            const center = newMap.getCenter();
            center.lng -= distancePerSecond / 60;
            newMap.easeTo({ center, duration: 1000, easing: (n) => n });
          }
        }

        // Start spinning animation
        const spinInterval = setInterval(spinGlobe, 1000);

        // Handle interaction with the map
        newMap.on('mousedown', () => {
          userInteracting = true;
          spinEnabled = false;
          clearInterval(spinInterval);
        });

        setMap(newMap);

        // Add markers for each location
        newMap.on('load', () => {
          addMarkersToMap(newMap, mapboxgl.default, locations);
        });

        // Cleanup
        return () => {
          clearInterval(spinInterval);
          if (newMap) {
            newMap.remove();
          }
        };
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();
  }, [mapboxToken, isTokenSet, locations]);

  // Add markers to map
  const addMarkersToMap = async (currentMap: any, mapboxgl: any, locationData: Location[]) => {
    // Clear existing markers
    markers.forEach(marker => marker.remove());
    const newMarkers: any[] = [];

    // Add markers for each location
    locationData.forEach(location => {
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'group cursor-pointer';
      markerEl.innerHTML = `
        <div class="relative transform transition-transform duration-300 hover:scale-110">
          <div class="w-6 h-6 rounded-full bg-primary/90 flex items-center justify-center shadow-md">
            <div class="w-4 h-4 rounded-full bg-white flex items-center justify-center">
              <div class="w-2 h-2 rounded-full bg-primary"></div>
            </div>
          </div>
          <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary/90 rotate-45 mb-[-4px]"></div>
        </div>
      `;
      
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white py-1 px-2 rounded shadow-md text-xs whitespace-nowrap mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20';
      tooltip.textContent = location.title;
      markerEl.appendChild(tooltip);

      // Create and add the marker to the map
      const marker = new mapboxgl.Marker({
        element: markerEl,
        anchor: 'bottom'
      })
        .setLngLat(location.coordinates)
        .addTo(currentMap);

      // Add click event to marker
      markerEl.addEventListener('click', () => {
        handleLocationSelect(location);
      });
      
      // Store reference to marker for later removal
      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  };

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
          <div className="flex-1 relative">
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full absolute inset-0" />
            
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
            
            {/* Attribution */}
            <div className="absolute bottom-0 left-0 p-2 z-10 text-xs text-muted-foreground bg-background/70 rounded-tr-md">
              <a 
                href="https://www.mapbox.com/about/maps/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                © Mapbox
              </a>
              {' | '}
              <a 
                href="https://www.openstreetmap.org/about/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                © OpenStreetMap
              </a>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MapExplorer;
