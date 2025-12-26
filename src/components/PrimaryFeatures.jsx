import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from '@/components/Container'
import indiaMapOutline from '@/assets/images/india-outline.jpg'
import { beachStates } from '@/data/beachStates'
import { MapPin, Search, ChevronRight } from 'lucide-react'

const regions = [
  { name: 'North India', color: '#FF9933' },
  { name: 'West India', color: '#000080' },
  { name: 'South India', color: '#138808' },
  { name: 'East India', color: '#FF9933' }
]

export function PrimaryFeatures() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [hoveredState, setHoveredState] = useState(null)
  const navigate = useNavigate()

  const handleStateSelect = (state) => {
    const stateUrl = state.name.toLowerCase().replace(/\s+/g, '')
    navigate(`/beaches/${stateUrl}`)
  }

  const filteredStates = beachStates.filter(state =>
    (!selectedRegion || state.region === selectedRegion) &&
    (!searchTerm || state.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const getRegionColor = (region) => {
    const found = regions.find(r => r.name === region)
    return found?.color || '#FF9933'
  }

  return (
    <section id="map-selection" className="relative bg-gray-50 py-16 scroll-mt-16">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl text-gray-900 font-bold mb-3">
            Select a Coastal State
          </h2>
          <p className="text-gray-600">
            Click on any state to explore its beaches
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 bg-white focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-800"
            />
          </div>
        </div>

        {/* Region Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            className={clsx(
              'px-4 py-2 rounded-full text-sm font-medium transition-all',
              !selectedRegion ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border hover:border-gray-300'
            )}
            onClick={() => setSelectedRegion(null)}
          >
            All
          </button>
          {regions.map(({ name, color }) => (
            <button
              key={name}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium transition-all',
                selectedRegion === name
                  ? 'text-white'
                  : 'bg-white text-gray-600 border hover:border-gray-300'
              )}
              style={selectedRegion === name ? { backgroundColor: color } : {}}
              onClick={() => setSelectedRegion(name)}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-3 relative aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 p-4">
            <img
              src={indiaMapOutline}
              alt="India Map"
              className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] opacity-50 object-contain"
            />
            <div className="relative w-full h-full">
              {beachStates
                .filter(state => !selectedRegion || state.region === selectedRegion)
                .map(state => (
                  <div
                    key={state.name}
                    className={clsx(
                      'absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group',
                      selectedRegion && state.region !== selectedRegion && 'opacity-30'
                    )}
                    style={{
                      left: `${state.coordinates.x}%`,
                      top: `${state.coordinates.y}%`
                    }}
                    onClick={() => handleStateSelect(state)}
                    onMouseEnter={() => setHoveredState(state.name)}
                    onMouseLeave={() => setHoveredState(null)}
                  >
                    <div
                      className="w-4 h-4 rounded-full ring-2 ring-white shadow-md transition-transform group-hover:scale-150"
                      style={{ backgroundColor: getRegionColor(state.region) }}
                    />
                    <div className={clsx(
                      'absolute left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-gray-900 text-white rounded text-xs whitespace-nowrap transition-opacity',
                      hoveredState === state.name ? 'opacity-100' : 'opacity-0'
                    )}>
                      {state.name}
                    </div>
                  </div>
                ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-white rounded-lg p-2 shadow-sm text-xs">
              <div className="flex flex-wrap gap-3">
                {regions.map(({ name, color }) => (
                  <div key={name} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-gray-500">{name.replace(' India', '')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* State List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">
                {filteredStates.length} States Found
              </h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {filteredStates.map((state) => (
                <div
                  key={state.name}
                  onClick={() => handleStateSelect(state)}
                  className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getRegionColor(state.region) }}
                        />
                        <h4 className="font-medium text-gray-900 group-hover:text-orange-600">
                          {state.name}
                        </h4>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-1">{state.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
