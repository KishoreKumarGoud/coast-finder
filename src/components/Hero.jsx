import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { Container } from '@/components/Container'

const backgroundImages = [
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
  'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
  'https://images.unsplash.com/photo-1517686668014-1740ede39ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'
]

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const scrollToMap = () => {
    document.getElementById('map-selection')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-[85vh] overflow-hidden bg-slate-900">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <img
            src={image}
            alt={`Beach ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* Content */}
      <Container className="relative z-10 h-full flex flex-col justify-center items-center text-center pt-24 pb-20">
        <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Discover India's
          <br />
          <span className="text-orange-400">Beautiful Beaches</span>
        </h1>

        <p className="max-w-xl text-lg text-white/80 mb-10">
          Explore 50+ stunning beaches across 9 coastal states. Plan your perfect getaway today.
        </p>

        {/* CTA Button */}
        <button
          onClick={scrollToMap}
          className="bg-orange-500 hover:bg-orange-600 text-white text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore Beaches
        </button>

        {/* Stats */}
        <div className="flex gap-12 mt-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">50+</p>
            <p className="text-sm text-white/60">Beaches</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">9</p>
            <p className="text-sm text-white/60">States</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">7500km</p>
            <p className="text-sm text-white/60">Coastline</p>
          </div>
        </div>
      </Container>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all ${index === currentImageIndex ? 'w-6 bg-white' : 'w-2 bg-white/40'
              }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToMap}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce z-20"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </div>
  )
}
