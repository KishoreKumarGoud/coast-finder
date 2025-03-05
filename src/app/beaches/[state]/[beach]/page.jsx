

// import { beachStates } from '@/app/data/beachStates';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';
// import { Header } from '@/components/Header';
// import { Container } from '@/components/Container';
// import Footer from '@/components/Footer';
// import { useEffect, useState } from 'react';

// export default function BeachInfoPage({ params }) {
//   const { state, beach } = params;

//   // Find the state and beach data
//   const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());
//   const beachData = stateData?.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, "-") === beach);

//   // State hooks for weather, restaurants, and hotels
//   const [weather, setWeather] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);
//   const [hotels, setHotels] = useState([]);

//   // Function to calculate distance between two coordinates
//   function calculateDistance(lat1, lon1, lat2, lon2) {
//     const R = 6371; // Radius of Earth in km
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a = 
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return (R * c).toFixed(2);
//   }

//   // Assign rating based on distance
//   function assignRating(distance) {
//     if (distance < 5) return 5;
//     if (distance < 10) return 4.2;
//     if (distance < 20) return 3.8;
//     return 3.2;
//   }

//   // Assign price range in INR based on rating and distance
//   function assignPriceRange(rating, distance) {
//     if (rating >= 4.5 && distance < 5) return '₹4000-₹8000';
//     if (rating >= 3.5 && distance < 15) return '₹1500-₹4000';
//     return '₹500-₹1500';
//   }

//   // Fetch weather data
//   useEffect(() => {
//     if (beachData?.latitude && beachData?.longitude) {
//       fetch(`https://api.open-meteo.com/v1/forecast?latitude=${beachData.latitude}&longitude=${beachData.longitude}&current_weather=true`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.current_weather) {
//             setWeather({
//               temperature: data.current_weather.temperature,
//               windSpeed: data.current_weather.windspeed,
//             });
//           }
//         })
//         .catch(err => console.error('❌ Weather fetch error:', err));
//     }
//   }, [beachData]);

//   // Fetch nearby restaurants and hotels
//   useEffect(() => {
//     if (beachData?.latitude && beachData?.longitude) {
//       const query = `[out:json];(
//         node(around:25000,${beachData.latitude},${beachData.longitude})[amenity=restaurant];
//         node(around:25000,${beachData.latitude},${beachData.longitude})[tourism=hotel];
//       );out;`;
      
//       fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
//         .then(res => res.json())
//         .then(data => {
//           const allPlaces = data.elements.map(place => {
//             const distance = calculateDistance(beachData.latitude, beachData.longitude, place.lat, place.lon);
//             const ratingValue = assignRating(distance);
//             const priceRange = assignPriceRange(ratingValue, distance);
//             return {
//               name: place.tags.name || 'Unnamed Place',
//               type: place.tags.amenity ? 'Restaurant' : 'Hotel',
//               description: place.tags.cuisine || place.tags.tourism || 'No description available',
//               mapUrl: `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`,
//               distance: `${distance} km`,
//               ratingValue,
//               priceRange
//             };
//           });

//           // Separate restaurants and hotels
//           setRestaurants(allPlaces.filter(p => p.type === 'Restaurant').slice(0, 15));
//           setHotels(allPlaces.filter(p => p.type === 'Hotel').slice(0, 15));
//         })
//         .catch(err => console.error('❌ Places fetch error:', err));
//     }
//   }, [beachData]);

//   // Handle invalid state or beach
//   if (!stateData || !beachData) return notFound();

//   return (
//     <>
//       <Header />
//       <main className="bg-blue-50 py-12">
//       {weather && (
//   <div className="absolute top-24 right-8 bg-white p-4 shadow-lg rounded-lg">
//     <h3 className="text-lg font-semibold text-blue-900">Current Weather</h3>
//     <p className="text-gray-700">🌡️ {weather.temperature}°C</p>
//     <p className="text-gray-700">💨 Wind: {weather.windSpeed} km/h</p>
//   </div>
// )}

//         <Container>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
//             <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
//               <h1 className="text-3xl font-bold text-blue-900 mb-2">{beachData.name}</h1>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="relative w-full h-64">
//                   <Image src={beachData.image} alt={beachData.name} layout="fill" className="rounded-lg object-cover" />
//                 </div>
//                 <iframe src={beachData.embedUrl} className="w-full h-64 rounded-lg" allowFullScreen></iframe>
//               </div>
//               <p className="text-gray-700 mt-4">{beachData.description}</p>
//             </div>
//           </div>
//           <div className="mt-8">
//             <h2 className="text-2xl font-bold text-blue-900">Nearby Restaurants</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {restaurants.map((place, index) => (
//                 <div key={index} className="bg-white p-4 rounded-lg shadow-md">
//                   <h3 className="text-lg font-semibold">{place.name}</h3>
//                   <p className="text-sm text-gray-700">{place.description}</p>
//                   <p className="text-yellow-500 font-semibold">⭐ {place.ratingValue}</p>
//                   <p className="text-green-600 font-semibold">Price: {place.priceRange}</p>
//                   <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Map</a>
//                 </div>
//               ))}
//             </div>
//             <h2 className="text-2xl font-bold text-blue-900 mt-8">Nearby Hotels</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {hotels.map((place, index) => (
//                 <div key={index} className="bg-white p-4 rounded-lg shadow-md">
//                   <h3 className="text-lg font-semibold">{place.name}</h3>
//                   <p className="text-sm text-gray-700">{place.description}</p>
//                   <p className="text-yellow-500 font-semibold">⭐ {place.ratingValue}</p>
//                   <p className="text-green-600 font-semibold">Price: {place.priceRange}</p>
//                   <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Map</a>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Container>
//       </main>
//       <Footer />
//     </>
//   );
// }

'use client';

// import { beachStates } from '@/app/data/beachStates';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';
// import { Header } from '@/components/Header';
// import { Container } from '@/components/Container';
// import Footer from '@/components/Footer';
// import { useEffect, useState } from 'react';

// export default function BeachInfoPage({ params }) {
//   const { state, beach } = params;

//   const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());
//   const beachData = stateData?.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, "-") === beach);

//   const [weather, setWeather] = useState(null);
//   const [restaurants, setRestaurants] = useState([]);
//   const [hotels, setHotels] = useState([]);
//   const [sortBy, setSortBy] = useState('');
//   const [filterBy, setFilterBy] = useState('');

//   // Fetch Weather Data
//   useEffect(() => {
//     if (beachData?.latitude && beachData?.longitude) {
//       fetch(`https://api.open-meteo.com/v1/forecast?latitude=${beachData.latitude}&longitude=${beachData.longitude}&current_weather=true`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.current_weather) {
//             setWeather({
//               temperature: data.current_weather.temperature,
//               windSpeed: data.current_weather.windspeed,
//             });
//           }
//         })
//         .catch(err => console.error('❌ Weather fetch error:', err));
//     }
//   }, [beachData]);

//   // Fetch Nearby Restaurants & Hotels
//   useEffect(() => {
//     if (beachData?.latitude && beachData?.longitude) {
//       const query = `[out:json];(
//         node(around:25000,${beachData.latitude},${beachData.longitude})[amenity=restaurant];
//         node(around:25000,${beachData.latitude},${beachData.longitude})[tourism=hotel];
//       );out;`;
      
//       fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
//         .then(res => res.json())
//         .then(data => {
//           const allPlaces = data.elements.map(place => ({
//             name: place.tags.name || 'Unnamed Place',
//             type: place.tags.amenity ? 'Restaurant' : 'Hotel',
//             description: place.tags.cuisine || place.tags.tourism || 'No description available',
//             mapUrl: `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`,
//             distance: Math.random() * 20, // Simulated distance
//             rating: Math.random() * 5, // Simulated rating
//             price: Math.floor(Math.random() * 4000) + 500, // Simulated price
//             date: new Date(Date.now() - Math.random() * 1e10).toISOString(), // Simulated date
//           }));

//           setRestaurants(allPlaces.filter(p => p.type === 'Restaurant'));
//           setHotels(allPlaces.filter(p => p.type === 'Hotel'));
//         })
//         .catch(err => console.error('❌ Places fetch error:', err));
//     }
//   }, [beachData]);

//   // Sorting Logic
//   const handleSort = (a, b) => {
//     if (sortBy === 'price') return a.price - b.price;
//     if (sortBy === 'rating') return b.rating - a.rating;
//     if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
//     return 0;
//   };

//   // Filtering Logic
//   const handleFilter = place => {
//     if (filterBy === 'low-price') return place.price < 2000;
//     if (filterBy === 'high-rating') return place.rating >= 4;
//     return true;
//   };

//   const sortedRestaurants = restaurants.filter(handleFilter).sort(handleSort);
//   const sortedHotels = hotels.filter(handleFilter).sort(handleSort);

//   if (!stateData || !beachData) return notFound();

//   return (
//     <>
//       <Header />
//       <main className="bg-blue-50 py-12 relative">
//         <Container>
//           {/* Weather Info */}
//           {weather && (
//             <div className="absolute top-4 right-4 bg-white p-4 shadow-lg rounded-lg">
//               <h3 className="text-lg font-semibold text-blue-900">Current Weather</h3>
//               <p className="text-gray-700">🌡️ {weather.temperature}°C</p>
//               <p className="text-gray-700">💨 Wind: {weather.windSpeed} km/h</p>
//             </div>
//           )}

//           {/* Beach Info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
//               <h1 className="text-3xl font-bold text-blue-900 mb-2">{beachData.name}</h1>
//               <div className="grid grid-cols-2 gap-4">
//                 <Image src={beachData.image} alt={beachData.name} width={300} height={200} className="rounded-lg object-cover" />
//                 <iframe src={beachData.embedUrl} className="w-full h-64 rounded-lg" allowFullScreen></iframe>
//               </div>
//               <p className="text-gray-700 mt-4">{beachData.description}</p>
//             </div>
//           </div>

//           {/* Sorting and Filtering Options */}
//           <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md my-6">
//             <div>
//               <label className="text-blue-900 font-semibold mr-2">Sort by:</label>
//               <select className="border rounded px-2 py-1" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                 <option value="">None</option>
//                 <option value="price">Price</option>
//                 <option value="rating">Rating</option>
//                 <option value="date">Date</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-blue-900 font-semibold mr-2">Filter by:</label>
//               <select className="border rounded px-2 py-1" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
//                 <option value="">None</option>
//                 <option value="low-price">Low Price (Below ₹2000)</option>
//                 <option value="high-rating">High Rating (4+ stars)</option>
//               </select>
//             </div>
//           </div>

//           {/* Restaurants */}
//           <h2 className="text-2xl font-bold text-blue-900">Nearby Restaurants</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {sortedRestaurants.map((place, index) => (
//               <div key={index} className="bg-white p-4 rounded-lg shadow-md">
//                 <h3 className="text-lg font-semibold">{place.name}</h3>
//                 <p className="text-sm text-gray-700">{place.description}</p>
//                 <p className="text-yellow-500 font-semibold">⭐ {place.rating.toFixed(1)}</p>
//                 <p className="text-green-600 font-semibold">Price: ₹{place.price}</p>
//                 <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Map</a>
//               </div>
//             ))}
//           </div>
//         </Container>
//       </main>
//       <Footer />
//     </>
//   );
// }


'use client';

import { beachStates } from '@/app/data/beachStates';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export default function BeachInfoPage({ params }) {
  const { state, beach } = params;

  const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());
  const beachData = stateData?.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, "-") === beach);

  const [weather, setWeather] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');

  // Fetch Weather Data
  useEffect(() => {
    if (beachData?.latitude && beachData?.longitude) {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${beachData.latitude}&longitude=${beachData.longitude}&current_weather=true`)
        .then(res => res.json())
        .then(data => {
          if (data.current_weather) {
            setWeather({
              temperature: data.current_weather.temperature,
              windSpeed: data.current_weather.windspeed,
            });
          }
        })
        .catch(err => console.error('❌ Weather fetch error:', err));
    }
  }, [beachData]);

  // Fetch Nearby Restaurants & Hotels
  useEffect(() => {
    if (beachData?.latitude && beachData?.longitude) {
      const query = `[out:json];(
        node(around:25000,${beachData.latitude},${beachData.longitude})[amenity=restaurant];
        node(around:25000,${beachData.latitude},${beachData.longitude})[tourism=hotel];
      );out;`;
      
      fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          const allPlaces = data.elements.map(place => ({
            name: place.tags.name || 'Unnamed Place',
            type: place.tags.amenity ? 'Restaurant' : 'Hotel',
            description: place.tags.cuisine || place.tags.tourism || 'No description available',
            mapUrl: `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`,
            distance: Math.random() * 30, // Simulated distance (0-30 km)
            rating: (Math.random() * 2 + 3).toFixed(1), // Simulated rating (3-5 stars)
            price: Math.floor(Math.random() * 4000) + 500, // Simulated price (₹500-₹4500)
            date: new Date(Date.now() - Math.random() * 1e10).toISOString(), // Simulated date
          }));

          setRestaurants(allPlaces.filter(p => p.type === 'Restaurant'));
          setHotels(allPlaces.filter(p => p.type === 'Hotel'));
        })
        .catch(err => console.error('❌ Places fetch error:', err));
    }
  }, [beachData]);

  // Sorting Logic
  const handleSort = (a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating-low') return a.rating - b.rating;
    if (sortBy === 'rating-high') return b.rating - a.rating;
    if (sortBy === 'distance-near') return a.distance - b.distance;
    if (sortBy === 'distance-far') return b.distance - a.distance;
    if (sortBy === 'date-new') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'date-old') return new Date(a.date) - new Date(b.date);
    return 0;
  };

  // Filtering Logic
  const handleFilter = place => {
    if (filterBy === 'low-price') return place.price < 2000;
    if (filterBy === 'high-rating') return place.rating >= 4;
    if (filterBy === 'nearby') return place.distance < 10;
    return true;
  };

  const sortedRestaurants = restaurants.filter(handleFilter).sort(handleSort);
  const sortedHotels = hotels.filter(handleFilter).sort(handleSort);

  if (!stateData || !beachData) return notFound();

  return (
    <>
      <Header />
      <main className="bg-blue-50 py-12 relative">
        <Container>
          {/* Weather Info */}
          {weather && (
            <div className="absolute top-4 right-4 bg-white p-4 shadow-lg rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">Current Weather</h3>
              <p className="text-gray-700">🌡️ {weather.temperature}°C</p>
              <p className="text-gray-700">💨 Wind: {weather.windSpeed} km/h</p>
            </div>
          )}
          {/* beach info */}
          <div className="flex justify-center">
  <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col w-full max-w-5xl"> 
    <h1 className="text-4xl font-bold text-blue-900 mb-4">{beachData.name}</h1>
    
    {/* Increased Image & Map Width */}
    <div className="grid grid-cols-2 gap-6">
      <div className="relative w-full h-96">
        <Image 
          src={beachData.image} 
          alt={beachData.name} 
          width={900} 
          height={450} 
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      <iframe 
        src={beachData.embedUrl} 
        className="w-full h-96 rounded-lg"
        allowFullScreen
      ></iframe>
    </div>

    <p className="text-gray-700 mt-6 text-lg">{beachData.description}</p>
  </div>
</div>


     

    

          {/* Sorting and Filtering */}
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md my-6">
            <div>
              <label className="text-blue-900 font-semibold mr-2">Sort by:</label>
              <select className="border rounded px-2 py-1" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">None</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-low">Rating: Low to High</option>
                <option value="rating-high">Rating: High to Low</option>
                <option value="distance-near">Distance: Near to Far</option>
                <option value="distance-far">Distance: Far to Near</option>
                <option value="date-new">Date: Newest First</option>
                <option value="date-old">Date: Oldest First</option>
              </select>
            </div>
            <div>
              <label className="text-blue-900 font-semibold mr-2">Filter by:</label>
              <select className="border rounded px-2 py-1" value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
                <option value="">None</option>
                <option value="low-price">Low Price (Below ₹2000)</option>
                <option value="high-rating">High Rating (4+ stars)</option>
                <option value="nearby">Nearby (Within 10km)</option>
              </select>
            </div>
          </div>

          {/* Nearby Restaurants */}
          <h2 className="text-2xl font-bold text-blue-900">Nearby Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedRestaurants.map((place, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-700">{place.description}</p>
                <p className="text-yellow-500 font-semibold">⭐ {place.rating}</p>
                <p className="text-green-600 font-semibold">Price: ₹{place.price}</p>
                <p className="text-gray-500 text-xs">📍 {place.distance.toFixed(2)} km</p>
                <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Map</a>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

