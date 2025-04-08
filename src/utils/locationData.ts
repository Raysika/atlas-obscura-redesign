
import { Location } from '@/types/location';

// Sample data for locations
const SAMPLE_LOCATIONS: Location[] = [
  {
    id: '1',
    title: 'Neuschwanstein Castle',
    shortDescription: 'A 19th-century Romanesque Revival palace in Bavaria, Germany',
    description: 'Built as a retreat for King Ludwig II of Bavaria, Neuschwanstein Castle is a 19th-century Romanesque Revival palace perched on a rugged hill above the village of Hohenschwangau. The palace was commissioned by Ludwig II as a homage to Richard Wagner and has inspired Disneyland\'s Sleeping Beauty Castle.',
    coordinates: [10.7498, 47.5576],
    image: 'https://images.unsplash.com/photo-1597926661974-69a26ffa0f08?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'architectural',
    region: 'europe',
    popularity: 9,
  },
  {
    id: '2',
    title: 'Antelope Canyon',
    shortDescription: 'A slot canyon on Navajo land in Arizona, known for light beams and flowing shapes',
    description: 'Antelope Canyon is a slot canyon on Navajo land near Page, Arizona. It includes two separate, photogenic slot canyon sections, known as Upper Antelope Canyon and Lower Antelope Canyon. The Navajo name for Upper Antelope Canyon is Tsé bighánílíní, which means "the place where water runs through rocks."',
    coordinates: [-111.3743, 36.8619],
    image: 'https://images.unsplash.com/photo-1544079123-33bc9e095466?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'natural',
    region: 'north-america',
    popularity: 8,
  },
  {
    id: '3',
    title: 'Machu Picchu',
    shortDescription: 'An ancient Incan citadel set high in the Andes Mountains of Peru',
    description: 'Machu Picchu is a 15th-century Inca citadel situated on a mountain ridge 2,430 meters above sea level. Most archaeologists believe that Machu Picchu was constructed as an estate for the Inca emperor Pachacuti. Often mistakenly referred to as the "Lost City of the Incas", it is the most familiar icon of Inca civilization.',
    coordinates: [-72.5450, -13.1631],
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'historical',
    region: 'south-america',
    popularity: 10,
  },
  {
    id: '4',
    title: 'Angkor Wat',
    shortDescription: 'A massive temple complex in Cambodia and the largest religious monument in the world',
    description: 'Angkor Wat is a temple complex in Cambodia and is the largest religious monument in the world. Originally constructed as a Hindu temple dedicated to the god Vishnu for the Khmer Empire, it was gradually transformed into a Buddhist temple towards the end of the 12th century.',
    coordinates: [103.8670, 13.4125],
    image: 'https://images.unsplash.com/photo-1564770312198-5fefb14e7b9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'historical',
    region: 'asia',
    popularity: 9,
  },
  {
    id: '5',
    title: 'Santorini',
    shortDescription: 'A Greek island known for stunning white buildings and blue domes overlooking the sea',
    description: 'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its main towns, Fira and Oia, cling to cliffs above an underwater caldera (crater), overlooking the sea and small islands to the west.',
    coordinates: [25.3963, 36.4072],
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'cultural',
    region: 'europe',
    popularity: 8,
  },
  {
    id: '6',
    title: 'Great Barrier Reef',
    shortDescription: 'The world\'s largest coral reef system, visible from outer space',
    description: 'The Great Barrier Reef is the world\'s largest coral reef system composed of over 2,900 individual reefs and 900 islands stretching for over 2,300 kilometers. The reef is located in the Coral Sea, off the coast of Queensland, Australia, and is so large it can be seen from outer space.',
    coordinates: [146.8328, -18.2871],
    image: 'https://images.unsplash.com/photo-1559583109-3e7968136c99?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'natural',
    region: 'oceania',
    popularity: 7,
  },
  {
    id: '7',
    title: 'Petra',
    shortDescription: 'An ancient city carved into rose-colored rock in southern Jordan',
    description: 'Petra is a famous archaeological site in Jordan\'s southwestern desert. Dating to around 300 B.C., it was the capital of the Nabatean Kingdom. Accessed via a narrow canyon called Al Siq, it contains tombs and temples carved into pink sandstone cliffs, earning its nickname, the "Rose City."',
    coordinates: [35.4444, 30.3285],
    image: 'https://images.unsplash.com/photo-1563177918-24957b5a7233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'historical',
    region: 'asia',
    popularity: 9,
  },
  {
    id: '8',
    title: 'Pripyat Ghost Town',
    shortDescription: 'An abandoned city near the Chernobyl Nuclear Power Plant in Ukraine',
    description: 'Pripyat is an abandoned city in northern Ukraine, near the Ukraine–Belarus border. Named after the nearby Pripyat River, the city was founded on 4 February 1970 as the ninth nuclear city in the Soviet Union, to serve the nearby Chernobyl Nuclear Power Plant. It was officially proclaimed a city in 1979 and had grown to a population of 49,360 by the time it was evacuated on the afternoon of 27 April 1986, the day after the Chernobyl disaster.',
    coordinates: [30.0542, 51.4045],
    image: 'https://images.unsplash.com/photo-1568729937315-2ef5ee9d3276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'abandoned',
    region: 'europe',
    popularity: 6,
  },
  {
    id: '9',
    title: 'Easter Island',
    shortDescription: 'A remote volcanic island known for its mysterious moai statues',
    description: 'Easter Island is a Chilean island in the southeastern Pacific Ocean, at the southeasternmost point of the Polynesian Triangle in Oceania. Easter Island is famous for its 887 extant monumental statues, called moai, created by the early Rapa Nui people. The moai are carved human figures with oversize heads, often resting on massive stone pedestals called ahus.',
    coordinates: [-109.3497, -27.1127],
    image: 'https://images.unsplash.com/photo-1510711789248-087061cda288?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'cultural',
    region: 'oceania',
    popularity: 7,
  },
  {
    id: '10',
    title: 'Pamukkale',
    shortDescription: 'Natural terraces of carbonate minerals left by flowing water in Turkey',
    description: 'Pamukkale, meaning "cotton castle" in Turkish, is a natural site in southwestern Turkey\'s Denizli province. The area is famous for its mineral-rich thermal waters flowing down white travertine terraces on a nearby hillside. It neighbors Hierapolis, an ancient Roman spa city founded around 190 B.C.',
    coordinates: [29.1201, 37.9137],
    image: 'https://images.unsplash.com/photo-1571150307331-23070f64f26b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'natural',
    region: 'asia',
    popularity: 6,
  },
  {
    id: '11',
    title: 'Deception Island',
    shortDescription: 'An active volcano in Antarctica with black sand beaches and abandoned whaling stations',
    description: 'Deception Island is an island in the South Shetland Islands archipelago, with one of the safest harbors in Antarctica. It is an active volcano with an impressive caldera that can sometimes be seen venting steam. The interior of the horseshoe-shaped island houses the flooded caldera of an active volcano, which severely damaged local scientific stations in a 1967 eruption.',
    coordinates: [-60.6500, -62.9667],
    image: 'https://images.unsplash.com/photo-1493329306594-38b6b1cb60c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'abandoned',
    region: 'antarctica',
    popularity: 5,
  },
  {
    id: '12',
    title: 'Kolmanskop',
    shortDescription: 'A ghost town in the Namib desert in southern Namibia, gradually being reclaimed by sand',
    description: 'Kolmanskop is a ghost town in the Namib desert in southern Namibia, a few kilometers inland from the port town of Lüderitz. It was named after a transport driver named Johnny Coleman who, during a sand storm, abandoned his ox wagon on a small incline opposite the settlement. Once a small but very rich mining village, it is now a dilapidated ghost town, slowly being reclaimed by the shifting sands of the desert.',
    coordinates: [15.2383, -26.7033],
    image: 'https://images.unsplash.com/photo-1585513252728-916e12c81375?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    category: 'abandoned',
    region: 'africa',
    popularity: 6,
  },
];

// Simulate API call with some delay
export const getLocations = (): Promise<Location[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SAMPLE_LOCATIONS);
    }, 1000);
  });
};

// Get a specific location by ID
export const getLocationById = (id: string): Promise<Location | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const location = SAMPLE_LOCATIONS.find(loc => loc.id === id);
      resolve(location);
    }, 500);
  });
};
