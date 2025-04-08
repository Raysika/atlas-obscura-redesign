
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';
import { Location } from '@/types/location';
import { getLocations } from '@/utils/locationData';

interface MapViewProps {
  onLocationSelect: (location: Location) => void;
  selectedLocation: Location | null;
  mapboxToken: string;
}

const MapView = ({ onLocationSelect, selectedLocation, mapboxToken }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await getLocations();
        setLocations(data);
      } catch (error) {
        console.error('Error loading locations:', error);
      }
    };
    
    loadLocations();
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    const initializeMap = async () => {
      setIsLoading(true);
      
      try {
        // Dynamically import mapbox-gl to ensure it only loads in the browser
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');
        
        mapboxgl.default.accessToken = mapboxToken;
        
        if (map.current) return;
        
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/outdoors-v12',
          center: [0, 20],
          zoom: 1.5,
          projection: 'globe',
          attributionControl: false
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.default.NavigationControl({
            visualizePitch: true
          }),
          'top-right'
        );

        // Add fullscreen control
        map.current.addControl(new mapboxgl.default.FullscreenControl(), 'top-right');

        // Add atmosphere styling
        map.current.on('style.load', () => {
          map.current.setFog({
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
          if (!map.current || !spinEnabled || userInteracting) return;
          
          const zoom = map.current.getZoom();
          if (zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > 3) {
              const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - 3);
              distancePerSecond *= zoomDif;
            }
            const center = map.current.getCenter();
            center.lng -= distancePerSecond / 60;
            map.current.easeTo({ center, duration: 1000, easing: (n: number) => n });
          }
        }

        // Start spinning animation
        const spinInterval = setInterval(spinGlobe, 1000);

        // Handle interaction with the map
        map.current.on('mousedown', () => {
          userInteracting = true;
          spinEnabled = false;
          clearInterval(spinInterval);
        });

        map.current.on('load', () => {
          setIsLoading(false);
        });

        // Clean up
        return () => {
          clearInterval(spinInterval);
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
        };
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
      }
    };

    initializeMap();
  }, [mapboxToken]);

  // Add location markers to the map
  useEffect(() => {
    if (!map.current || !locations.length || isLoading) return;

    const addMarkers = async () => {
      try {
        // Clear existing markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Import mapbox-gl
        const mapboxgl = await import('mapbox-gl');

        // Add markers for each location
        locations.forEach(location => {
          // Create custom marker element
          const markerEl = document.createElement('div');
          markerEl.className = 'group';
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
          tooltip.className = 'absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white py-1 px-2 rounded shadow-md text-xs whitespace-nowrap mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300';
          tooltip.textContent = location.title;
          markerEl.appendChild(tooltip);

          // Create and add the marker to the map
          const marker = new mapboxgl.default.Marker({
            element: markerEl,
            anchor: 'bottom'
          })
            .setLngLat(location.coordinates)
            .addTo(map.current);

          // Add click event to marker
          markerEl.addEventListener('click', () => {
            onLocationSelect(location);
          });
          
          // Store reference to marker for later removal
          markersRef.current.push(marker);
        });
      } catch (error) {
        console.error('Error adding markers:', error);
      }
    };

    addMarkers();
  }, [locations, isLoading, onLocationSelect]);

  // Fly to selected location
  useEffect(() => {
    if (!map.current || !selectedLocation) return;

    try {
      map.current.flyTo({
        center: selectedLocation.coordinates,
        zoom: 10,
        speed: 1.2,
        curve: 1.42,
        essential: true
      });
    } catch (error) {
      console.error('Error flying to location:', error);
    }
  }, [selectedLocation]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      
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
  );
};

export default MapView;
