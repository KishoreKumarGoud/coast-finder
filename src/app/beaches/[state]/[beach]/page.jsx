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

  // Find the state and beach data
  const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());
  const beachData = stateData?.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, "-") === beach);

  // State hooks for weather, restaurants, and hotels
  const [weather, setWeather] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);

  // Function to calculate distance between two coordinates
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  }

  // Assign rating based on distance
  function assignRating(distance) {
    if (distance < 5) return 5;
    if (distance < 10) return 4.2;
    if (distance < 20) return 3.8;
    return 3.2;
  }

  // Assign price range in INR based on rating and distance
  function assignPriceRange(rating, distance) {
    if (rating >= 4.5 && distance < 5) return '₹4000-₹8000';
    if (rating >= 3.5 && distance < 15) return '₹1500-₹4000';
    return '₹500-₹1500';
  }

  // Fetch weather data
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

  // Fetch nearby restaurants and hotels
  useEffect(() => {
    if (beachData?.latitude && beachData?.longitude) {
      const query = `[out:json];(
        node(around:25000,${beachData.latitude},${beachData.longitude})[amenity=restaurant];
        node(around:25000,${beachData.latitude},${beachData.longitude})[tourism=hotel];
      );out;`;
      
      fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          const allPlaces = data.elements.map(place => {
            const distance = calculateDistance(beachData.latitude, beachData.longitude, place.lat, place.lon);
            const ratingValue = assignRating(distance);
            const priceRange = assignPriceRange(ratingValue, distance);
            return {
              name: place.tags.name || 'Unnamed Place',
              type: place.tags.amenity ? 'Restaurant' : 'Hotel',
              description: place.tags.cuisine || place.tags.tourism || 'No description available',
              mapUrl: `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`,
              distance: `${distance} km`,
              ratingValue,
              priceRange
            };
          });

          // Separate restaurants and hotels
          setRestaurants(allPlaces.filter(p => p.type === 'Restaurant').slice(0, 15));
          setHotels(allPlaces.filter(p => p.type === 'Hotel').slice(0, 15));
        })
        .catch(err => console.error('❌ Places fetch error:', err));
    }
  }, [beachData]);

  // Handle invalid state or beach
  if (!stateData || !beachData) return notFound();

  return (
    <>
      <Header />
      <main className="bg-blue-50 py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{beachData.name}</h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full h-64">
                  <Image src={beachData.image} alt={beachData.name} layout="fill" className="rounded-lg object-cover" />
                </div>
                <iframe src={beachData.embedUrl} className="w-full h-64 rounded-lg" allowFullScreen></iframe>
              </div>
              <p className="text-gray-700 mt-4">{beachData.description}</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-blue-900">Nearby Restaurants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {restaurants.map((place, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                  <p className="text-sm text-gray-700">{place.description}</p>
                  <p className="text-yellow-500 font-semibold">⭐ {place.ratingValue}</p>
                  <p className="text-green-600 font-semibold">Price: {place.priceRange}</p>
                  <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Map</a>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-blue-900 mt-8">Nearby Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hotels.map((place, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">{place.name}</h3>
                  <p className="text-sm text-gray-700">{place.description}</p>
                  <p className="text-yellow-500 font-semibold">⭐ {place.ratingValue}</p>
                  <p className="text-green-600 font-semibold">Price: {place.priceRange}</p>
                  <a href={place.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Map</a>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
