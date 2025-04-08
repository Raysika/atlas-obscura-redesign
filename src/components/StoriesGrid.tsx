
import React, { useState, useEffect } from 'react';
import StoryCard, { StoryData } from './StoryCard';

interface StoriesGridProps {
  searchQuery: string;
  selectedCategory: string | null;
  onSelectStory: (story: StoryData) => void;
}

const storiesData: StoryData[] = [
  {
    id: "1",
    title: "The Hidden Waterfall of Baatara Gorge",
    excerpt: "Tucked away in the mountains of Lebanon sits a three-tiered waterfall plunging into a prehistoric cave that seems straight out of fantasy fiction.",
    image: "https://images.unsplash.com/photo-1455577380025-4321f1e1dca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Maya Rostom",
    date: "May 15, 2023",
    readTime: "8 min",
    category: "nature"
  },
  {
    id: "2",
    title: "Living Among Books: A Night in the World's Most Beautiful Libraries",
    excerpt: "From the ancient scrolls of Alexandria to the modernist architecture of Stuttgart, these temples of knowledge offer visitors a chance to sleep surrounded by literary treasures.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2090&q=80",
    author: "Thomas Chen",
    date: "April 3, 2023",
    readTime: "12 min",
    category: "culture"
  },
  {
    id: "3",
    title: "The Highest Tea in the World: Brewing at 19,000 Feet",
    excerpt: "How a group of mountaineers maintain the tradition of afternoon tea while scaling the world's most formidable peaks.",
    image: "https://images.unsplash.com/photo-1518128958364-65859d70aa41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    author: "Emma Patel",
    date: "June 21, 2023",
    readTime: "10 min",
    category: "adventure"
  },
  {
    id: "4",
    title: "The Last Vestiges of the Silk Road: Central Asian Caravanserais",
    excerpt: "These ancient desert inns once hosted merchants traveling between China and the Mediterranean. Today, they stand as haunting reminders of a bygone era.",
    image: "https://images.unsplash.com/photo-1518384401463-d3876163c195?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1936&q=80",
    author: "Yusuf Rahman",
    date: "March 8, 2023",
    readTime: "15 min",
    category: "culture"
  },
  {
    id: "5",
    title: "The Secret Ingredients of Oaxacan Mole: A Culinary Treasure Hunt",
    excerpt: "Following the trail of Mexico's most complex sauce through mountain villages and city markets reveals a rich tapestry of history, culture, and flavor.",
    image: "https://images.unsplash.com/photo-1518619745898-93e765972c21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    author: "Lucia Fernández",
    date: "July 12, 2023",
    readTime: "9 min",
    category: "food"
  },
  {
    id: "6",
    title: "Dancing with Fireflies: Japan's Synchronous Light Show",
    excerpt: "For two weeks each summer, thousands of fireflies flash in perfect unison along riverbanks in remote Japanese forests, creating one of nature's most mesmerizing displays.",
    image: "https://images.unsplash.com/photo-1551474800-618919c19658?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Hiro Tanaka",
    date: "August 5, 2023",
    readTime: "7 min",
    category: "nature"
  },
  {
    id: "7",
    title: "The Urban Explorer's Guide to Abandoned Subway Systems",
    excerpt: "Beneath many major cities lie forgotten tunnels and stations – urban archaeology sites that offer glimpses into past visions of the future.",
    image: "https://images.unsplash.com/photo-1541959833400-049d37f98cdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Marcus Reynolds",
    date: "January 17, 2023",
    readTime: "14 min",
    category: "travel"
  },
  {
    id: "8",
    title: "Sailing the Nile on a Felucca: Ancient Transportation in the Modern Age",
    excerpt: "These traditional wooden boats have navigated the world's longest river for thousands of years. Today, they offer travelers a slow, immersive journey through Egypt's heart.",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    author: "Amira Hassan",
    date: "February 28, 2023",
    readTime: "11 min",
    category: "travel"
  },
  {
    id: "9",
    title: "The Foragers of Finland: Hunting for Arctic Delicacies",
    excerpt: "During the brief summer season, Finns take to the forests to collect wild berries, mushrooms, and herbs – a traditional practice that connects modern society to ancient ways of life.",
    image: "https://images.unsplash.com/photo-1657541335319-fc6b260a1359?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    author: "Lars Johansson",
    date: "September 4, 2023",
    readTime: "8 min",
    category: "food"
  }
];

const StoriesGrid = ({ searchQuery, selectedCategory, onSelectStory }: StoriesGridProps) => {
  const [filteredStories, setFilteredStories] = useState<StoryData[]>(storiesData);

  useEffect(() => {
    let results = storiesData;
    
    // Apply category filter
    if (selectedCategory) {
      results = results.filter(story => 
        story.category === selectedCategory
      );
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(story => 
        story.title.toLowerCase().includes(query) ||
        story.excerpt.toLowerCase().includes(query) ||
        story.author.toLowerCase().includes(query)
      );
    }
    
    setFilteredStories(results);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-10" id="stories">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-center mb-2">Latest Stories</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto">
          Immerse yourself in captivating narratives from our global community of explorers, writers, and adventurers.
        </p>
      </div>
      
      {filteredStories.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl font-medium mb-4">No stories found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map(story => (
            <StoryCard 
              key={story.id} 
              story={story}
              onReadFullStory={onSelectStory}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoriesGrid;
