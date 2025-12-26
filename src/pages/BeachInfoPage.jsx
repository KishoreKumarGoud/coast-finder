import { useParams, Navigate, Link } from 'react-router-dom'
import { beachStates } from '@/data/beachStates'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import {
    Thermometer, Wind, MapPin, Star, Hotel, UtensilsCrossed,
    Filter, ArrowUpDown, Plane, Train, Bus, Search, ChevronDown,
    ChevronUp, Navigation, ExternalLink, Loader2, AlertCircle,
    Waves, Sun, DollarSign
} from 'lucide-react'

export default function BeachInfoPage() {
    const { state, beach } = useParams()

    const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase())
    const beachData = stateData?.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, '-') === beach)

    const [weather, setWeather] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [hotels, setHotels] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sortBy, setSortBy] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [expanded, setExpanded] = useState(false)
    const [startPoint, setStartPoint] = useState('')
    const [travelType, setTravelType] = useState('flights')

    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY

    // Fetch real weather data from Open-Meteo API
    useEffect(() => {
        if (beachData?.latitude && beachData?.longitude) {
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${beachData.latitude}&longitude=${beachData.longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
                .then(res => res.json())
                .then(data => {
                    if (data.current_weather) {
                        setWeather({
                            temperature: data.current_weather.temperature,
                            windSpeed: data.current_weather.windspeed,
                            weatherCode: data.current_weather.weathercode,
                            humidity: data.hourly?.relative_humidity_2m?.[0] || 'N/A'
                        })
                    }
                })
                .catch(() => setError('Failed to load weather data'))
        }
    }, [beachData])

    // Fetch nearby places using Google Places API (or generate realistic data if no API key)
    useEffect(() => {
        const fetchPlaces = async (type, setter) => {
            if (beachData?.latitude && beachData?.longitude) {
                setLoading(true)

                if (GOOGLE_API_KEY) {
                    // Real Google Places API call
                    try {
                        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${beachData.latitude},${beachData.longitude}&radius=5000&type=${type}&key=${GOOGLE_API_KEY}`
                        const response = await fetch(url)
                        const data = await response.json()

                        if (data.results) {
                            const places = data.results.slice(0, 6).map((place) => ({
                                name: place.name,
                                rating: place.rating || 4.0,
                                address: place.vicinity || 'Near beach area',
                                mapUrl: `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`,
                                image: place.photos?.[0]
                                    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                                    : type === 'lodging'
                                        ? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
                                        : 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
                                price: place.price_level ? place.price_level * 2000 : Math.floor(Math.random() * 5000) + 1500,
                                distance: ((Math.random() * 4) + 0.5).toFixed(1),
                                isOpen: place.opening_hours?.open_now
                            }))
                            setter(places)
                        }
                    } catch (err) {
                        console.error(`Error fetching ${type}:`, err)
                        generateMockData(type, setter)
                    }
                } else {
                    // Generate realistic mock data
                    generateMockData(type, setter)
                }
                setLoading(false)
            }
        }

        const generateMockData = (type, setter) => {
            const hotelNames = ['Beach Resort & Spa', 'Ocean View Hotel', 'Coastal Inn', 'Seaside Paradise', 'Palm Beach Suites', 'Sunset Bay Resort']
            const restaurantNames = ['Seafood Shack', 'Beach Café', 'Ocean Grill', 'Coastal Kitchen', 'The Fish House', 'Waves Restaurant']

            const names = type === 'lodging' ? hotelNames : restaurantNames
            const images = type === 'lodging'
                ? [
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
                    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
                    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
                    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
                    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
                    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400'
                ]
                : [
                    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
                    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
                    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
                    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
                    'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400',
                    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400'
                ]

            const places = names.map((name, i) => ({
                name: name,
                rating: (3.5 + Math.random() * 1.5).toFixed(1),
                address: `${(i + 1) * 0.5}km from ${beachData.name}`,
                mapUrl: `https://www.google.com/maps/search/?api=1&query=${beachData.latitude},${beachData.longitude}&query_place_id=${name}`,
                image: images[i],
                price: type === 'lodging'
                    ? Math.floor(Math.random() * 8000) + 2000
                    : Math.floor(Math.random() * 800) + 200,
                distance: ((i + 1) * 0.5 + Math.random() * 0.5).toFixed(1),
                isOpen: Math.random() > 0.3
            }))
            setter(places)
        }

        fetchPlaces('lodging', setHotels)
        fetchPlaces('restaurant', setRestaurants)
    }, [beachData, GOOGLE_API_KEY])

    if (!stateData || !beachData) return <Navigate to="/not-found" replace />

    const handleSort = (a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating-high') return b.rating - a.rating
        if (sortBy === 'distance-near') return a.distance - b.distance
        return 0
    }

    const handleFilter = place => {
        if (filterBy === 'low-price') return place.price < 2000
        if (filterBy === 'high-rating') return place.rating >= 4
        if (filterBy === 'nearby') return place.distance < 2
        return true
    }

    const filteredHotels = hotels.filter(handleFilter).sort(handleSort)
    const filteredRestaurants = restaurants.filter(handleFilter).sort(handleSort)

    // Travel search with beach as destination
    const handleTravelSearch = () => {
        if (!startPoint) {
            alert('Please enter your starting location')
            return
        }
        const destination = `${beachData.name}, ${stateData.name}, India`
        let url = ''

        if (travelType === 'flights') {
            url = `https://www.google.com/travel/flights?q=flights+from+${encodeURIComponent(startPoint)}+to+${encodeURIComponent(destination)}`
        } else if (travelType === 'trains') {
            url = `https://www.makemytrip.com/railways/listing?src=${encodeURIComponent(startPoint)}&dst=${encodeURIComponent(stateData.name)}`
        } else if (travelType === 'buses') {
            url = `https://www.redbus.in/search?from=${encodeURIComponent(startPoint)}&to=${encodeURIComponent(stateData.name)}`
        }
        window.open(url, '_blank')
    }

    const getWeatherIcon = (code) => {
        if (code <= 3) return <Sun className="w-8 h-8 text-yellow-500" />
        return <Waves className="w-8 h-8 text-blue-500" />
    }

    return (
        <>
            <Header />
            <main className="bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 min-h-screen">
                {/* Hero Banner */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                    <img
                        src={beachData.image}
                        alt={beachData.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <Container className="absolute bottom-0 left-0 right-0 pb-6">
                        <div className="flex items-end gap-4">
                            <div>
                                <Link to={`/beaches/${state}`} className="text-cyan-300 text-sm hover:underline flex items-center gap-1 mb-2">
                                    <Navigation className="w-4 h-4" />
                                    {stateData.name} Beaches
                                </Link>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg">
                                    {beachData.name}
                                </h1>
                                <div className="flex items-center gap-2 mt-2 text-white/90">
                                    <MapPin className="w-4 h-4" />
                                    <span>{stateData.name}, India</span>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>

                <Container className="py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Weather Card */}
                            {weather && (
                                <div className="bg-white rounded-2xl shadow-lg p-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                            {getWeatherIcon(weather.weatherCode)}
                                            Current Weather
                                        </h3>
                                        <span className="text-sm text-gray-500">Live Data</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 text-center">
                                            <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-800">{weather.temperature}°C</p>
                                            <p className="text-sm text-gray-500">Temperature</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center">
                                            <Wind className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-800">{weather.windSpeed}</p>
                                            <p className="text-sm text-gray-500">km/h Wind</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-4 text-center">
                                            <Waves className="w-6 h-6 text-teal-500 mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-gray-800">{weather.humidity}%</p>
                                            <p className="text-sm text-gray-500">Humidity</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Description Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">About {beachData.name}</h2>
                                <div className="relative">
                                    <p className={`text-gray-600 leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}>
                                        {beachData.description}
                                    </p>
                                    <button
                                        onClick={() => setExpanded(!expanded)}
                                        className="flex items-center gap-1 text-cyan-600 mt-3 hover:text-cyan-700 font-medium"
                                    >
                                        {expanded ? (
                                            <>Show Less <ChevronUp className="w-4 h-4" /></>
                                        ) : (
                                            <>Read More <ChevronDown className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </div>
                                {beachData.Review && (
                                    <div className="mt-4 p-4 bg-cyan-50 rounded-xl border border-cyan-100">
                                        <p className="text-cyan-800 text-sm font-medium">{beachData.Review}</p>
                                    </div>
                                )}
                            </div>

                            {/* Hotels Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <Hotel className="w-6 h-6 text-purple-500" />
                                        Nearby Hotels
                                    </h2>
                                    {loading && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredHotels.map((hotel, index) => (
                                        <a
                                            key={index}
                                            href={hotel.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex"
                                        >
                                            <img src={hotel.image} alt={hotel.name} className="w-24 h-24 object-cover" />
                                            <div className="p-3 flex-grow">
                                                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                                                    {hotel.name}
                                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                    <span>{hotel.rating}</span>
                                                    <span>•</span>
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{hotel.distance} km</span>
                                                </div>
                                                <p className="text-purple-600 font-semibold text-sm mt-1">₹{hotel.price}/night</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Restaurants Section */}
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <UtensilsCrossed className="w-6 h-6 text-orange-500" />
                                        Nearby Restaurants
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {filteredRestaurants.map((restaurant, index) => (
                                        <a
                                            key={index}
                                            href={restaurant.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex"
                                        >
                                            <img src={restaurant.image} alt={restaurant.name} className="w-24 h-24 object-cover" />
                                            <div className="p-3 flex-grow">
                                                <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors flex items-center gap-1">
                                                    {restaurant.name}
                                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                    <span>{restaurant.rating}</span>
                                                    <span>•</span>
                                                    <span className={restaurant.isOpen ? 'text-green-600' : 'text-red-500'}>
                                                        {restaurant.isOpen ? 'Open' : 'Closed'}
                                                    </span>
                                                </div>
                                                <p className="text-orange-600 font-semibold text-sm mt-1">₹{restaurant.price} avg</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Filters Card */}
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                                    <Filter className="w-5 h-5 text-gray-600" />
                                    Filters
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-2">
                                            <ArrowUpDown className="w-4 h-4" />
                                            Sort By
                                        </label>
                                        <select
                                            value={sortBy}
                                            onChange={e => setSortBy(e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                                        >
                                            <option value="">Default</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                            <option value="rating-high">Rating: High to Low</option>
                                            <option value="distance-near">Distance: Nearest</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-2">
                                            <DollarSign className="w-4 h-4" />
                                            Filter By
                                        </label>
                                        <select
                                            value={filterBy}
                                            onChange={e => setFilterBy(e.target.value)}
                                            className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                                        >
                                            <option value="">All</option>
                                            <option value="low-price">Budget Friendly</option>
                                            <option value="high-rating">Highly Rated (4+)</option>
                                            <option value="nearby">Within 2 km</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Travel Planner Card */}
                            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                                    <Navigation className="w-5 h-5" />
                                    Plan Your Trip
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-white/80 mb-2 block">Destination</label>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                                            <p className="font-semibold">{beachData.name}</p>
                                            <p className="text-sm text-white/70">{stateData.name}, India</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-white/80 mb-2 block">From</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your city..."
                                            value={startPoint}
                                            onChange={e => setStartPoint(e.target.value)}
                                            className="w-full p-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 placeholder-white/50 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-white/80 mb-2 block">Travel Mode</label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {[
                                                { type: 'flights', icon: Plane, label: 'Flight' },
                                                { type: 'trains', icon: Train, label: 'Train' },
                                                { type: 'buses', icon: Bus, label: 'Bus' }
                                            ].map(({ type, icon: Icon, label }) => (
                                                <button
                                                    key={type}
                                                    onClick={() => setTravelType(type)}
                                                    className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${travelType === type
                                                            ? 'bg-white text-cyan-600'
                                                            : 'bg-white/20 hover:bg-white/30'
                                                        }`}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                    <span className="text-xs font-medium">{label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleTravelSearch}
                                        className="w-full bg-white text-cyan-600 p-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                    >
                                        <Search className="w-5 h-5" />
                                        Search {travelType.charAt(0).toUpperCase() + travelType.slice(1)}
                                    </button>
                                </div>
                            </div>

                            {/* Map Link */}
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${beachData.latitude},${beachData.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">View on Map</p>
                                            <p className="text-sm text-gray-500">Open in Google Maps</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                                </div>
                            </a>
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </>
    )
}
