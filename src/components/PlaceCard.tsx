
import React, { useState } from 'react';
import { MapPin, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";

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
  const [liked, setLiked] = useState(false);
  const { toast } = useToast();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card click event from firing
    setLiked(!liked);
    
    toast({
      title: liked ? "Removed from favorites" : "Added to favorites",
      description: liked ? `${title} has been removed from your favorites` : `${title} has been added to your favorites`,
      duration: 3000,
    });
  };

  return (
    <div className={cn("place-card group relative", className)}>
      <div className="overflow-hidden rounded-lg">
        <img 
          src={imageUrl} 
          alt={title} 
          className="place-card-image h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
      </div>
      
      <div className="absolute top-4 right-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "h-8 w-8 rounded-full bg-black/20 hover:bg-black/40",
            liked ? "text-red-500" : "text-white"
          )}
          onClick={handleLike}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-4 w-4", liked ? "fill-current" : "")} />
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
