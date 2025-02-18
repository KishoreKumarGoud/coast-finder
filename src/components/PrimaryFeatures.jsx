'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-features.jpg'
//import indiaMapOutline from '@/images/screenshots/india-outline.png'

const beachStates = [
  {
    name: 'Goa',
    description: 'Famous for its vibrant beaches and nightlife',
    coordinates: { x: 35, y: 55 },
    region: 'West India',
    highlights: ['Calangute Beach', 'Baga Beach', 'Anjuna Beach'],
    beaches: [
      {
        name: 'Calangute Beach',
        description: 'Known as the Queen of Beaches, Calangute is the largest beach in North Goa. Perfect for swimming and sunbathing, it offers various water sports activities.',
        image: '/beaches/calangute.jpg'
      },
      {
        name: 'Baga Beach',
        description: 'Famous for its nightlife and water sports, Baga Beach is one of the most popular beaches in Goa. It\'s known for parasailing and jet skiing.',
        image: '/beaches/baga.jpg'
      },
      {
        name: 'Anjuna Beach',
        description: 'Popular for its Wednesday flea market and trance parties, Anjuna Beach features unique rock formations and clear waters.',
        image: '/beaches/anjuna.jpg'
      }
    ]
  },
  {
    name: 'Kerala',
    description: 'Known for serene backwaters and pristine beaches',
    coordinates: { x: 40, y: 85 },
    region: 'South India',
    highlights: ['Varkala Beach', 'Kovalam Beach', 'Marari Beach']
  },
  {
    name: 'Maharashtra', 
    description: 'Home to beautiful Konkan coast beaches',
    coordinates: { x: 35, y: 45 },
    region: 'West India',
    highlights: ['Alibaug Beach', 'Ganpatipule Beach', 'Tarkarli Beach']
  },
  {
    name: 'Tamil Nadu',
    description: 'Features historic coastal temples and beaches',
    coordinates: { x: 45, y: 80 },
    region: 'South India',
    highlights: ['Marina Beach', 'Mahabalipuram Beach', 'Rameshwaram Beach']
  },
  {
    name: 'Andaman & Nicobar',
    description: 'Tropical paradise with crystal clear waters',
    coordinates: { x: 80, y: 75 },
    region: 'East India',
    highlights: ['Radhanagar Beach', 'Elephant Beach', 'Neil Island Beach']
  },
  {
    name: 'Gujarat',
    description: 'Home to unique white desert beaches and coastal sanctuaries',
    coordinates: { x: 20, y: 40 },
    region: 'North India',
    highlights: ['Mandvi Beach', 'Diu Beach', 'Dwarka Beach']
  },
  {
    name: 'Odisha',
    description: 'Features pristine beaches and ancient temples',
    coordinates: { x: 65, y: 55 },
    region: 'East India',
    highlights: ['Puri Beach', 'Chandipur Beach', 'Gopalpur Beach']
  },
  {
    name: 'West Bengal',
    description: 'Known for its mangrove beaches and delta regions',
    coordinates: { x: 70, y: 45 },
    region: 'East India',
    highlights: ['Digha Beach', 'Mandarmani Beach', 'Bakkhali Beach']
  }
]

export function PrimaryFeatures() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedState, setSelectedState] = useState(null)
  const [filteredStates, setFilteredStates] = useState([])
  const [selectedRegion, setSelectedRegion] = useState(null)

  useEffect(() => {
    if (searchTerm) {
      const filtered = beachStates.filter(state => 
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredStates(filtered)
    } else {
      setFilteredStates([])
    }
  }, [searchTerm])

  const handleStateSelect = (state) => {
    const stateSlug = state.name.toLowerCase().replace(/\s+/g, '-')
    router.push(`/beaches/${stateSlug}`)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (filteredStates.length > 0) {
      handleStateSelect(filteredStates[0])
    }
  }

  return (
    <section
      id="beach-finder"
      aria-label="Beach Finder"
      className="relative overflow-hidden bg-gray-900 pb-12 pt-8 sm:pb-20 sm:pt-12"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%] opacity-20"
        src={backgroundImage}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16 px-4">
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl tracking-tight text-white font-bold mb-3 sm:mb-4">
            Find Your Perfect Beach
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg tracking-tight text-orange-600 font-extrabold font-['Righteous']">
            Discover beaches across Indian states
          </p>
        </div>

        {/* Region Filter */}
        <div className="max-w-xl mx-auto px-4 mb-6">
          <div className="flex justify-center flex-wrap gap-4">
            {['North India', 'West India', 'South India', 'East India'].map((region) => (
              <button
                key={region}
                className={clsx(
                  'px-4 py-2 rounded-full transition-colors',
                  selectedRegion === region 
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/10 text-white hover:bg-orange-500/50'
                )}
                onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Search Box */}
        <div className="max-w-xl mx-auto px-4 mb-12">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 pl-12 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="Search state names here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              
              {/* Search Results Dropdown */}
              {filteredStates.length > 0 && (
                <div className="absolute w-full mt-2 bg-white/95 rounded-xl shadow-lg overflow-hidden">
                  {filteredStates.map((state) => (
                    <button
                      key={state.name}
                      className="w-full px-4 py-2 text-left hover:bg-orange-100 transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        handleStateSelect(state)
                      }}
                    >
                      <span className="text-gray-900 font-medium">{state.name}</span>
                      <span className="text-gray-500 text-sm ml-2">({state.region})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Interactive Map */}
        <div className="relative w-full max-w-2xl mx-auto aspect-[4/3] bg-white/10 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 p-4">
          {/* India Map Outline */}
            <Image
             // src={indiaMapOutline}
              alt="India Map"
              fill
              className="opacity-70 object-contain"
              priority
            />

            <div className="relative w-full h-full">
              {beachStates
                .filter(state => !selectedRegion || state.region === selectedRegion)
                .map((state) => (
                <div
                  key={state.name}
                  className={clsx(
                    'absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer',
                    selectedState?.name === state.name
                      ? 'bg-orange-500 scale-150'
                      : state.region === 'North India' ? 'bg-red-400 hover:bg-red-500 hover:scale-125'
                      : state.region === 'South India' ? 'bg-green-400 hover:bg-green-500 hover:scale-125'
                      : state.region === 'East India' ? 'bg-yellow-400 hover:bg-yellow-500 hover:scale-125'
                      : 'bg-blue-400 hover:bg-blue-500 hover:scale-125',
                    selectedRegion && state.region !== selectedRegion && 'opacity-30'
                  )}
                  style={{
                    left: `${state.coordinates.x}%`,
                    top: `${state.coordinates.y}%`
                  }}
                  onClick={() => handleStateSelect(state)}
                >
                  <span className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white text-sm font-medium">
                    {state.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected State Info */}
        {selectedState && (
          <div className="mt-8 p-6 bg-white/10 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white">{selectedState.name}</h3>
              <span className={clsx(
                'px-3 py-1 rounded-full text-sm',
                selectedState.region === 'North India' ? 'bg-red-500/20 text-red-300'
                : selectedState.region === 'South India' ? 'bg-green-500/20 text-green-300'
                : selectedState.region === 'East India' ? 'bg-yellow-500/20 text-yellow-300'
                : 'bg-blue-500/20 text-blue-300'
              )}>
                {selectedState.region}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{selectedState.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedState.highlights.map((beach, index) => (
                <span key={index} className={clsx(
                  'px-3 py-1 rounded-full text-sm',
                  selectedState.region === 'North India' ? 'bg-red-500/20 text-red-300'
                  : selectedState.region === 'South India' ? 'bg-green-500/20 text-green-300'
                  : selectedState.region === 'East India' ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-blue-500/20 text-blue-300'
                )}>
                  {beach}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
