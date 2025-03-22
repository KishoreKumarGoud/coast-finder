'use client';

import { beachStates } from '@/app/data/beachStates';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

export default function BeachInfoPage() {
  const params = useParams();
  const { state, beach } = params;

  const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());
  const beachData = stateData?.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, '-') === beach);

  const [weather, setWeather] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  // Travel inputs
  const [startPoint, setStartPoint] = useState('');
  const [travelType, setTravelType] = useState('flights');

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  // ✅ Fetch Weather
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
        .catch(() => setError('Failed to load weather data'));
    }
  }, [beachData]);

  // ✅ Fetch Nearby Hotels and Restaurants
  useEffect(() => {
    const fetchPlaces = async (type, setter) => {
      if (beachData?.latitude && beachData?.longitude) {
        const url = `/api/places?latitude=${beachData.latitude}&longitude=${beachData.longitude}&type=${type}`;

        try {
          const res = await fetch(url);
          const data = await res.json();

          if (data.results) {
            const places = data.results.map(place => ({
              name: place.name || 'Unnamed Place',
              rating: place.rating || 'N/A',
              address: place.vicinity || 'No address available',
              mapUrl: `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`,
              image: place.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                : '/placeholder.jpg',
              price: Math.floor(Math.random() * 9000) + 1000,  // Simulated price
              distance: (Math.random() * 30).toFixed(2)        // Simulated distance
            }));

            setter(places);
          } else {
            setError(`No results for ${type}`);
          }
        } catch (error) {
          console.error(`❌ Failed to fetch ${type}:`, error);
          setError(`Failed to load ${type} data`);
        } finally {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchPlaces('lodging', setHotels);
    fetchPlaces('restaurant', setRestaurants);

  }, [beachData, GOOGLE_API_KEY]);

  if (!stateData || !beachData) return notFound();

  // ✅ Sorting Function
  const handleSort = (a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating-low') return a.rating - b.rating;
    if (sortBy === 'rating-high') return b.rating - a.rating;
    if (sortBy === 'distance-near') return a.distance - b.distance;
    if (sortBy === 'distance-far') return b.distance - a.distance;
    return 0;
  };

  // ✅ Filtering Logic
  const handleFilter = place => {
    if (filterBy === 'low-price') return place.price < 2000;
    if (filterBy === 'high-rating') return place.rating >= 4;
    if (filterBy === 'nearby') return place.distance < 10;
    return true;
  };

  const filteredHotels = hotels.filter(handleFilter).filter(place => (
    place.price >= priceRange[0] && place.price <= priceRange[1]
  )).sort(handleSort);

  const filteredRestaurants = restaurants.filter(handleFilter).filter(place => (
    place.price >= priceRange[0] && place.price <= priceRange[1]
  )).sort(handleSort);

  // ✅ Handle Travel Search
  const handleTravelSearch = () => {
    if (!startPoint) {
      alert('Please enter a starting point.');
      return;
    }
  
    const destination = beachData.name;
    let url = '';
  
    if (travelType === 'flights') {
      url = `https://www.google.com/travel/flights?q=flights+from+${startPoint}+to+${destination}`;
    } else if (travelType === 'trains') {
      url = `https://www.makemytrip.com/railways/listing?src=${startPoint}&dst=${destination}`;
    } else if (travelType === 'buses') {
      url = `https://www.redbus.in/search?from=${startPoint}&to=${destination}`;
    }
  
    window.open(url, '_blank');
  };

  return (
    <>
      <Header />
      <main className="bg-blue-50 py-12">
        <Container>

          {/* ✅ Weather Section */}
          {weather && (
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="text-2xl font-bold">🌤️ Current Weather</h3>
              <p>Temperature: {weather.temperature}°C</p>
              <p>Wind Speed: {weather.windSpeed} km/h</p>
            </div>
          )}

          {/* ✅ Beach Info Card */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-4xl font-bold">{beachData.name}</h1>
            <p className="text-gray-700">{beachData.description}</p>
          </div>

          {/* ✅ Travel Section */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-bold">🚆 Plan Your Travel</h3>
            <div className="flex gap-4 mt-4">
              <input 
                type="text" 
                placeholder="Enter Starting Point" 
                value={startPoint} 
                onChange={e => setStartPoint(e.target.value)} 
                className="p-2 border rounded w-1/2"
              />
              <select value={travelType} onChange={e => setTravelType(e.target.value)} className="p-2 border rounded">
                <option value="flights">Flights</option>
                <option value="trains">Trains</option>
              </select>
              <button 
                onClick={handleTravelSearch} 
                className="bg-blue-500 text-white p-2 rounded"
              >
                Search
              </button>
            </div>
          </div>

          {/* ✅ Hotels Section */}
          <h2 className="text-3xl font-bold mt-10">🏨 Nearby Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 w-full">
                <Image src={hotel.image} alt={hotel.name} width={400} height={250} className="rounded-t-lg object-cover h-64 w-full" />
                <h3 className="text-xl font-bold">{hotel.name}</h3>
                <p>⭐ {hotel.rating} | 📍 {hotel.distance} km away</p>
                <p>💰 ₹{hotel.price}</p>
              </div>
            ))}
          </div>

          {/* ✅ Restaurants Section */}
          <h2 className="text-3xl font-bold mt-10">🍽️ Nearby Restaurants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 w-full">
                <Image src={restaurant.image} alt={restaurant.name} width={400} height={250} className="rounded-t-lg object-cover h-64 w-full" />
                <h3 className="text-xl font-bold">{restaurant.name}</h3>
                <p>⭐ {restaurant.rating} | 📍 {restaurant.distance} km away</p>
                <p>💰 ₹{restaurant.price}</p>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
