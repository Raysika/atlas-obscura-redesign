
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExperienceFiltersProps {
  selectedFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const ExperienceFilters = ({ selectedFilter, onFilterChange }: ExperienceFiltersProps) => {
  const filters = [
    { id: 'all', label: 'All Experiences' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'food', label: 'Food & Drink' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'education', label: 'Educational' },
  ];

  const handleFilterClick = (filterId: string) => {
    if (filterId === 'all') {
      onFilterChange(null);
    } else {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-center">
        <Tabs defaultValue="all" className="w-full max-w-3xl">
          <TabsList className="w-full flex flex-wrap justify-center bg-white p-1 rounded-lg shadow-sm">
            {filters.map((filter) => (
              <TabsTrigger 
                key={filter.id} 
                value={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className="px-5 py-2 flex-grow"
              >
                {filter.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ExperienceFilters;
