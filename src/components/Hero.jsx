'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

// Array of background images
const backgroundImages = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
  'https://images.unsplash.com/photo-1616486701797-0f33f61038ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'
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
    <div className="relative min-h-[85vh] overflow-hidden">
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
            alt={`Interior design ${index + 1}`}
            fill
            className="object-cover opacity-60"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white opacity-90"></div>
        </div>
      ))}
      <Container className="relative pb-24 pt-24 text-center lg:pt-32 lg:pb-36">
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-800 sm:text-7xl">
          Transform Your Space with{' '}
          <span className="relative whitespace-nowrap text-indigo-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              className="absolute left-0 top-2/3 h-[0.58em] w-full fill-indigo-300/70"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
            </svg>
            <span className="relative">Elegant Design</span>
          </span>{' '}
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-xl tracking-tight text-slate-900 leading-relaxed font-semibold font-['Open_Sans'] antialiased">
          Create stunning interiors that reflect your personality with our expert designers and premium quality materials.
        </p>
        <div className="mt-10 flex justify-center gap-x-6">
          <Button href="/register">Contact Us</Button>
          <Button
            href="https://www.youtube.com/watch?v=COuz7r4M-Wg&list=PL-nc7zI7zjsZRxiObM_EjLtrhUmvrxkYT"
            variant="outline"
            className="border-purple-600 bg-purple-600 text-white font-semibold hover:scale-105 transition-all duration-300 hover:bg-purple-700 hover:border-purple-700"
          >
            View Portfolio
          </Button>
        </div>
      </Container>
    </div>
  )
}
