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

  // ✅ Fetch Hotels & Restaurants
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
              rating: place.rating || 0,
              address: place.vicinity || 'No address available',
              mapUrl: `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`,
              image: place.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                : '/placeholder.jpg',
              price: Math.floor(Math.random() * 9000) + 1000,
              distance: (Math.random() * 30).toFixed(2)
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
  const handleSort = (places) => {
    if (sortBy === 'price-low') return [...places].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return [...places].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating-high') return [...places].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'distance-near') return [...places].sort((a, b) => a.distance - b.distance);
    return places;
  };

  // ✅ Filtering Logic
  const handleFilter = (places) => {
    let filtered = places;

    if (filterBy === 'low-price') filtered = filtered.filter(place => place.price < 2000);
    if (filterBy === 'high-rating') filtered = filtered.filter(place => place.rating >= 4);
    if (filterBy === 'nearby') filtered = filtered.filter(place => place.distance < 10);

    return filtered.filter(place => place.price >= priceRange[0] && place.price <= priceRange[1]);
  };

  // ✅ Process Filters & Sorting
  const processedHotels = handleSort(handleFilter(hotels));
  const processedRestaurants = handleSort(handleFilter(restaurants));

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

          {/* ✅ Plan Your Travel & Sorting */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-bold">🚆 Plan Your Travel</h3>
            <div className="flex flex-wrap gap-4 mt-4 items-center">
              {/* Travel Inputs */}
              <input type="text" placeholder="Enter Starting Point" value={startPoint} onChange={e => setStartPoint(e.target.value)} className="p-2 border rounded w-1/3"/>
              <select value={travelType} onChange={e => setTravelType(e.target.value)} className="p-2 border rounded w-1/3">
                <option value="flights">Flights</option>
                <option value="trains">Trains</option>
                <option value="buses">Buses</option>
              </select>
              <button onClick={handleTravelSearch} className="bg-blue-500 text-white p-2 rounded">Search</button>

              {/* Sorting & Filtering */}
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="p-2 border rounded w-1/4">
                <option value="">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating-high">Rating: High to Low</option>
                <option value="distance-near">Nearest First</option>
              </select>

              <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)} className="p-2 border rounded w-1/4">
                <option value="">Filter By</option>
                <option value="low-price">Budget Friendly</option>
                <option value="high-rating">High Rated (4+)</option>
                <option value="nearby">Nearby (Within 10 km)</option>
              </select>
            </div>
          </div>

          {/* ✅ Hotels Section */}
          <h2 className="text-3xl font-bold mt-10">🏨 Nearby Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedHotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 w-full">
                <Image src={hotel.image} alt={hotel.name} width={400} height={250} className="rounded-t-lg object-cover h-64 w-full" />
                <h3 className="text-xl font-bold">{hotel.name}</h3>
                <p>⭐ {hotel.rating} | 📍 {hotel.distance} km away</p>
                <p>💰 ₹{hotel.price}</p>
              </div>
            ))}
          </div>

        </Container>
      </main>
      <Footer />
    </>
  );
}
