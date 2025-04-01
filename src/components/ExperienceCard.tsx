
import React from 'react';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface ExperienceData {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  category: string;
  date: string;
}

interface ExperienceCardProps {
  experience: ExperienceData;
}

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
          {experience.rating.toFixed(1)}
        </div>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{experience.title}</h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{experience.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{experience.duration}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{experience.date}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-2">
          {experience.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
        <div className="font-semibold">
          ${experience.price}
          <span className="text-sm font-normal text-gray-500"> / person</span>
        </div>
        <Button className="rounded-full" size="sm">Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;
