
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StoriesFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const StoriesFilter = ({ selectedCategory, onCategoryChange }: StoriesFilterProps) => {
  const categories = [
    { id: 'all', label: 'All Stories' },
    { id: 'travel', label: 'Travel' },
    { id: 'culture', label: 'Culture & History' },
    { id: 'nature', label: 'Nature & Wildlife' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'food', label: 'Food & Drink' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'all') {
      onCategoryChange(null);
    } else {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-center">
        <Tabs defaultValue="all" className="w-full max-w-3xl">
          <TabsList className="w-full flex flex-wrap justify-center bg-white p-1 rounded-lg shadow-sm">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="px-5 py-2 flex-grow"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default StoriesFilter;
