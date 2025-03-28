
import React from 'react';
import { MapPin, MapIcon, Coffee, Camera, BookOpen, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  color: string;
  className?: string;
}

const CategoryCard = ({ icon, title, count, color, className }: CategoryCardProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center p-6 rounded-lg transition-all duration-300 hover:shadow-lg group",
        className
      )}
    >
      <div 
        className={cn(
          "p-4 rounded-full mb-4 text-white transition-all duration-300 group-hover:scale-110",
          color
        )}
      >
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{count} places</p>
    </div>
  );
};

const categories = [
  {
    icon: <MapPin size={24} />,
    title: "Natural Wonders",
    count: 1243,
    color: "bg-blue-500"
  },
  {
    icon: <Coffee size={24} />,
    title: "Food & Drink",
    count: 865,
    color: "bg-amber-500"
  },
  {
    icon: <MapIcon size={24} />,
    title: "Abandoned Places",
    count: 642,
    color: "bg-gray-700"
  },
  {
    icon: <BookOpen size={24} />,
    title: "Ancient History",
    count: 927,
    color: "bg-green-600"
  },
  {
    icon: <Camera size={24} />,
    title: "Architecture",
    count: 1156,
    color: "bg-purple-500"
  },
  {
    icon: <Compass size={24} />,
    title: "Hidden Gems",
    count: 783,
    color: "bg-red-500"
  }
];

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Explore by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the most fascinating places organized by type of wonder
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              icon={category.icon}
              title={category.title}
              count={category.count}
              color={category.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
