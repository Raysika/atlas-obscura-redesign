
import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PlaceCardProps {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  description: string;
  category: string;
  className?: string;
}

const PlaceCard = ({
  id,
  title,
  location,
  imageUrl,
  description,
  category,
  className,
}: PlaceCardProps) => {
  return (
    <div className={cn("place-card group", className)}>
      <div className="overflow-hidden">
        <img src={imageUrl} alt={title} className="place-card-image" />
      </div>
      
      <div className="absolute top-4 right-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
        <div className="flex items-center text-xs font-medium text-white/80 mb-1">
          <span className="bg-accent/90 text-white px-2 py-0.5 rounded-full">{category}</span>
        </div>
        
        <h3 className="text-lg font-serif font-medium line-clamp-2">{title}</h3>
        
        <div className="flex items-center mt-1 mb-2 text-sm text-white/80">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{location}</span>
        </div>
        
        <p className="text-sm text-white/70 line-clamp-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PlaceCard;
