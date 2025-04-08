
import React, { useState } from 'react';
import { X, MapPin, Calendar, Star } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Location } from '@/types/location';

interface LocationInfoCardProps {
  location: Location | null;
  isOpen: boolean;
  onClose: () => void;
}

const LocationInfoCard = ({ location, isOpen, onClose }: LocationInfoCardProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!location) return null;

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

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
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md p-0 overflow-y-auto">
        <div className="relative h-60 overflow-hidden">
          {isImageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img 
            src={location.image} 
            alt={location.title} 
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button 
            className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-accent/90 rounded-full mb-2">
              {getCategoryIcon(location.category)} {location.category}
            </span>
            <h2 className="text-2xl font-serif font-semibold mb-1">{location.title}</h2>
            <div className="flex items-center text-sm text-white/80">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="capitalize">{location.region.replace('-', ' ')}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Added April 2025</span>
            </div>
            <div className="flex items-center">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.round(location.popularity/2) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                />
              ))}
            </div>
          </div>
          
          <p className="text-foreground leading-relaxed mb-6">
            {location.description}
          </p>
          
          <div className="border-t pt-4 pb-2">
            <div className="grid grid-cols-2 gap-4">
              <Button className="w-full">Visit Website</Button>
              <Button variant="outline" className="w-full">Save Location</Button>
            </div>
            <div className="mt-4">
              <Button variant="secondary" className="w-full" onClick={onClose}>
                Back to Map
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LocationInfoCard;
