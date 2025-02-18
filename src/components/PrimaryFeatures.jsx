'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { Container } from '@/components/Container'
import indiaMapOutline from '@/images/screenshots/india-outline.jpg'
import { beachStates } from '@/app/data/beachStates'

export function PrimaryFeatures() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [filteredStates, setFilteredStates] = useState([])
  const router = useRouter()

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
    // Convert state name to URL-friendly format
    const stateUrl = state.name.toLowerCase().replace(/\s+/g, '')
    router.push(`/beaches/${stateUrl}`)
  }

  return (
    <section className="relative bg-white pb-12 pt-8">
      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-gray-900 font-bold">
            Find Your Perfect Beach
          </h2>
          <p className="text-lg text-orange-600 font-extrabold">
            Discover beaches across Indian states
          </p>
        </div>

        {/* Region Filter */}
        <div className="flex justify-center gap-4 mb-6">
          {['North India', 'West India', 'South India', 'East India'].map(region => (
            <button
              key={region}
              className={clsx(
                'px-4 py-2 rounded-full transition-colors',
                selectedRegion === region ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-orange-500/50'
              )}
              onClick={() => setSelectedRegion(region === selectedRegion ? null : region)}
            >
              {region}
            </button>
          ))}
        </div>

        {/* State Selection Dropdown */}
        <div className="max-w-xl mx-auto mb-12">
          <select
            className="w-full px-4 py-3 rounded-xl text-black border border-gray-300 bg-white"
            onChange={(e) => {
              const selectedState = beachStates.find(state => state.name === e.target.value)
              if (selectedState) handleStateSelect(selectedState)
            }}
            value=""
          >
            <option value="">Select a beach state...</option>
            {beachStates.map(state => (
              <option key={state.name} value={state.name}>
                {state.name} - {state.region}
              </option>
            ))}
          </select>
        </div>

        {/* Interactive Map */}
        <div className="relative max-w-2xl mx-auto aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 p-4">
            <Image 
              src={indiaMapOutline} 
              alt="India Map" 
              fill 
              className="opacity-70 object-contain"
              priority
            />
            <div className="relative w-full h-full">
              {beachStates
                .filter(state => !selectedRegion || state.region === selectedRegion)
                .map(state => (
                  <div
                    key={state.name}
                    className={clsx(
                      'absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer',
                      state.region === 'North India' ? 'bg-red-400 hover:bg-red-500 hover:scale-125'
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
                    <span className="absolute top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-gray-900 text-sm font-medium">
                      {state.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Selected State Info */}
        {filteredStates[0] && (
          <div className="mt-8 p-6 bg-gray-100 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{filteredStates[0].name}</h3>
              <span className={clsx(
                'px-3 py-1 rounded-full text-sm',
                filteredStates[0].region === 'North India' ? 'bg-red-100 text-red-600'
                : filteredStates[0].region === 'South India' ? 'bg-green-100 text-green-600'
                : filteredStates[0].region === 'East India' ? 'bg-yellow-100 text-yellow-600'
                : 'bg-blue-100 text-blue-600'
              )}>
                {filteredStates[0].region}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{filteredStates[0].description}</p>
            <div className="flex flex-wrap gap-2">
              {filteredStates[0].highlights.map((beach, index) => (
                <span key={index} className={clsx(
                  'px-3 py-1 rounded-full text-sm',
                  filteredStates[0].region === 'North India' ? 'bg-red-100 text-red-600'
                  : filteredStates[0].region === 'South India' ? 'bg-green-100 text-green-600'
                  : filteredStates[0].region === 'East India' ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-blue-100 text-blue-600'
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
