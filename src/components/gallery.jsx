'use client'

import { Container } from '@/components/Container'

const galleryItems = [
  {
    title: 'Modern Villa Interior',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea',
  },
  {
    title: 'Urban Apartment',
    category: 'Architecture', 
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0',
  },
  {
    title: 'Luxury Kitchen Design',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba',
  },
  {
    title: 'Contemporary Office Space',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
  },
  {
    title: 'Minimalist Bedroom',
    category: 'Interior Design',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
  },
  {
    title: 'Modern House Exterior',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  }
]

export function Gallery() {
  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Portfolio
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Explore our collection of stunning designs and architectural projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 p-6 text-white">
                  <p className="text-sm font-medium text-blue-300">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
