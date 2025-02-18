'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

// Array of Indian beach activities and scenic background images
const backgroundImages = [
  'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // Radhanagar Beach, Andaman
  'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80', // Varkala Beach, Kerala
  'https://images.unsplash.com/photo-1517686668014-1740ede39ecb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'  // Beach club party in Goa
]

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[85vh] overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentImageIndex 
              ? 'translate-x-0' 
              : index < currentImageIndex 
                ? '-translate-x-full' 
                : 'translate-x-full'
          }`}
        >
          <Image
            src={image}
            alt={`Indian Beach Activities ${index + 1}`}
            fill
            className="object-cover opacity-40" // Changed opacity from 75 to 40 for more transparency
            priority={index === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-90"></div>
        </div>
      ))}
      <Container className="relative px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 pt-12 sm:pt-16 md:pt-20 lg:pt-24 text-center">
        <h1 className="mx-auto max-w-5xl font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 font-['Playfair_Display'] leading-tight">
          <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">Coast-Finder</span>
          <br className="hidden sm:block" />
          <span className="relative whitespace-normal text-slate-900 mt-2 block">
            <span className="relative">Explore India&apos;s Best Beaches</span>
          </span>
        </h1>
        <p className="mx-auto mt-4 sm:mt-5 md:mt-6 max-w-2xl text-sm sm:text-base md:text-lg tracking-tight text-slate-900 leading-relaxed font-bold font-['Roboto'] antialiased px-4 drop-shadow-lg">
          From serene beaches to vibrant nightlife, discover the perfect coastal getaway in India&apos;s most beautiful beach destinations.
        </p>
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-x-6 px-4">
          <Button 
            href="/contact" 
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Start Adventure
          </Button>
          <Button
            href="#gallery"
            variant="outline"
            className="w-full sm:w-auto border-2 border-pink-400 bg-transparent text-pink-400 font-bold text-lg hover:scale-105 transition-all duration-300 hover:bg-pink-400 hover:text-white shadow-lg hover:shadow-xl"
          >
            View Activities
          </Button>
        </div>
      </Container>
    </div>
  )
}
