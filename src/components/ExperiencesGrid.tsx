
import React, { useState, useEffect } from 'react';
import ExperienceCard, { ExperienceData } from './ExperienceCard';

interface ExperiencesGridProps {
  searchQuery: string;
  selectedFilter: string | null;
}

const experiencesData: ExperienceData[] = [
  {
    id: '1',
    title: 'Guided Hike Through Ancient Redwood Forests',
    description: 'Experience the majesty of California\'s ancient redwood forests with an expert naturalist guide. Learn about the unique ecology and history of these giant trees.',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
    location: 'Humboldt County, California',
    duration: '4 hours',
    price: 79,
    rating: 4.8,
    category: 'adventure',
    date: 'Daily'
  },
  {
    id: '2',
    title: 'Traditional Cooking Class with Local Chef',
    description: 'Learn how to prepare authentic local dishes in this hands-on cooking class led by a celebrated chef. Includes market tour, cooking session, and a shared meal.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Oaxaca, Mexico',
    duration: '5 hours',
    price: 95,
    rating: 4.9,
    category: 'food',
    date: 'Tue, Thu, Sat'
  },
  {
    id: '3',
    title: 'Private Stargazing Experience with Astronomer',
    description: 'View the night sky through high-powered telescopes with commentary from an expert astronomer in one of the darkest sky regions in the world.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80',
    location: 'Atacama Desert, Chile',
    duration: '3 hours',
    price: 125,
    rating: 4.7,
    category: 'education',
    date: 'Clear nights only'
  },
  {
    id: '4',
    title: 'Ancient Temple Meditation Retreat',
    description: 'Experience guided meditation sessions in an ancient temple complex led by Buddhist monks. Includes mindfulness teachings and traditional tea ceremony.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    location: 'Kyoto, Japan',
    duration: '2 days',
    price: 350,
    rating: 4.9,
    category: 'wellness',
    date: 'First weekend of each month'
  },
  {
    id: '5',
    title: 'Urban Street Art and Graffiti Tour',
    description: 'Explore the vibrant street art scene with a local artist as your guide. Learn about techniques, artists, and the cultural significance of urban art.',
    image: 'https://images.unsplash.com/photo-1551966775-a4ddc8df052b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Berlin, Germany',
    duration: '3 hours',
    price: 45,
    rating: 4.6,
    category: 'cultural',
    date: 'Mon, Wed, Fri'
  },
  {
    id: '6',
    title: 'Desert Camel Trek and Bedouin Camp Experience',
    description: 'Journey across golden sand dunes on camelback and spend the night at an authentic Bedouin camp. Includes traditional dinner and cultural performances.',
    image: 'https://images.unsplash.com/photo-1452022582947-b521d8779234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    location: 'Wadi Rum, Jordan',
    duration: '24 hours',
    price: 210,
    rating: 4.8,
    category: 'adventure',
    date: 'Daily except Sundays'
  },
  {
    id: '7',
    title: 'Vineyard Tour and Wine Tasting Experience',
    description: 'Visit family-owned vineyards with an expert sommelier. Learn about winemaking processes and enjoy tastings of limited production wines with local delicacies.',
    image: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Tuscany, Italy',
    duration: '6 hours',
    price: 149,
    rating: 4.9,
    category: 'food',
    date: 'Thu through Sun'
  },
  {
    id: '8',
    title: 'Traditional Ceramic Workshop with Master Artisan',
    description: 'Create your own pottery pieces under the guidance of a master ceramicist using traditional techniques passed down through generations.',
    image: 'https://images.unsplash.com/photo-1565448837917-96be36e8bba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Fes, Morocco',
    duration: '4 hours',
    price: 85,
    rating: 4.7,
    category: 'cultural',
    date: 'Tue, Thu, Sat'
  },
  {
    id: '9',
    title: 'Arctic Wildlife Photography Expedition',
    description: 'Capture stunning images of polar bears, arctic foxes, and other wildlife in their natural habitat with guidance from a professional wildlife photographer.',
    image: 'https://images.unsplash.com/photo-1517784312427-5309af2c121b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Svalbard, Norway',
    duration: '3 days',
    price: 1950,
    rating: 4.9,
    category: 'adventure',
    date: 'Limited dates in summer'
  },
  {
    id: '10',
    title: 'Floating Markets Boat Tour and Cooking Class',
    description: 'Navigate through bustling floating markets to select fresh ingredients, then learn to prepare classic dishes in a traditional home kitchen.',
    image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Bangkok, Thailand',
    duration: '7 hours',
    price: 120,
    rating: 4.8,
    category: 'food',
    date: 'Daily'
  },
  {
    id: '11',
    title: 'Forest Bathing and Nature Therapy Walk',
    description: 'Practice the Japanese art of forest bathing (shinrin-yoku) with a certified guide. Connect with nature through mindful sensory exercises in an ancient forest.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Olympic National Park, Washington',
    duration: '3 hours',
    price: 65,
    rating: 4.8,
    category: 'wellness',
    date: 'Wed, Fri, Sun'
  },
  {
    id: '12',
    title: 'Ancient Megalithic Sites Archaeological Tour',
    description: 'Explore mysterious prehistoric monuments with an archaeologist who specializes in ancient civilizations. Learn about latest theories and discoveries.',
    image: 'https://images.unsplash.com/photo-1564661653318-c28c58d5a559?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    location: 'Orkney Islands, Scotland',
    duration: '8 hours',
    price: 180,
    rating: 4.7,
    category: 'education',
    date: 'Mon, Thu'
  }
];

const ExperiencesGrid = ({ searchQuery, selectedFilter }: ExperiencesGridProps) => {
  const [filteredExperiences, setFilteredExperiences] = useState<ExperienceData[]>(experiencesData);

  useEffect(() => {
    let results = experiencesData;
    
    // Apply category filter
    if (selectedFilter) {
      results = results.filter(experience => 
        experience.category === selectedFilter
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(experience => 
        experience.title.toLowerCase().includes(query) ||
        experience.description.toLowerCase().includes(query) ||
        experience.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredExperiences(results);
  }, [searchQuery, selectedFilter]);

  return (
    <div className="container mx-auto px-4 py-10" id="experiences">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center mb-2">Explore Experiences</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto">
          Immerse yourself in authentic adventures created by passionate local experts and industry leaders.
        </p>
      </div>
      
      {filteredExperiences.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-medium mb-4">No experiences found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperiences.map(experience => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperiencesGrid;
