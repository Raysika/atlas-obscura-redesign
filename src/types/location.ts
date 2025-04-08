
export interface Location {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  coordinates: [number, number]; // [longitude, latitude]
  image: string;
  category: LocationCategory;
  region: Region;
  popularity: number; // 1-10 rating
}

export type LocationCategory = 
  | 'historical' 
  | 'natural' 
  | 'abandoned' 
  | 'architectural' 
  | 'cultural';

export type Region = 
  | 'north-america' 
  | 'south-america' 
  | 'europe' 
  | 'africa' 
  | 'asia' 
  | 'oceania' 
  | 'antarctica';
