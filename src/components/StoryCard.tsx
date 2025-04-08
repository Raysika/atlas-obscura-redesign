
import React from 'react';
import { CalendarDays, User, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface StoryData {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
}

interface StoryCardProps {
  story: StoryData;
}

const StoryCard = ({ story }: StoryCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={story.image} 
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3 bg-accent/90 rounded-full px-3 py-1 text-xs font-medium text-white">
          {story.category}
        </div>
      </div>
      
      <CardContent className="p-5 flex-grow">
        <h3 className="text-xl font-serif font-semibold mb-3 line-clamp-2">{story.title}</h3>
        
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{story.author}</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{story.date}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {story.excerpt}
        </p>
        
        <div className="flex items-center text-sm text-gray-500 mt-auto">
          <Clock className="h-4 w-4 mr-1" />
          <span>{story.readTime} read</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 border-t border-gray-100 mt-auto">
        <Button className="w-full flex items-center justify-center" variant="outline">
          <BookOpen className="h-4 w-4 mr-2" />
          Read Full Story
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;
