'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-features.jpg'

const features = [
  {
    title: 'Modern Living Rooms',
    description:
      "Transform your living space into a contemporary haven with premium materials and innovative layouts.",
    image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80",
  },
  {
    title: 'Luxury Kitchens', 
    description:
      "Create your dream kitchen with high-end appliances, custom cabinetry, and stunning finishes.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1568&q=80",
  },
  {
    title: 'Serene Bedrooms',
    description:
      "Design your perfect sanctuary with peaceful retreats focused on comfort and style.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  }
]

export function PrimaryFeatures() {
  let [tabOrientation, setTabOrientation] = useState('horizontal')
  let [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

    function onMediaQueryChange({ matches }) {
      setTabOrientation(matches ? 'vertical' : 'horizontal')
    }

    onMediaQueryChange(lgMediaQuery)
    lgMediaQuery.addEventListener('change', onMediaQueryChange)

    return () => {
      lgMediaQuery.removeEventListener('change', onMediaQueryChange)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % features.length)
    }, 3000) // Increased interval for better mobile UX

    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="projects"
      aria-label="Our Recent Projects"
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
            Our Recent Projects
          </h2>
          <p className="mt-2 sm:mt-3 text-base sm:text-lg tracking-tight text-gray-300">
            Explore our portfolio of stunning interior transformations.
          </p>
        </div>
        <TabGroup
          className="mt-6 grid grid-cols-1 items-center gap-y-2 pt-4 sm:gap-y-6 md:mt-12 lg:grid-cols-12 lg:pt-0"
          vertical={tabOrientation === 'vertical'}
          selectedIndex={activeIndex}
          onChange={setActiveIndex}
        >
          {({ selectedIndex }) => (
            <>
              <div className="px-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-4 lg:px-0">
                <TabList className="relative z-10 flex gap-x-3 sm:gap-x-4 whitespace-nowrap px-0 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
                  {features.map((feature, featureIndex) => (
                    <div
                      key={feature.title}
                      className={clsx(
                        'group relative rounded-full px-2 py-1 sm:px-3 lg:rounded-l-xl lg:rounded-r-none lg:p-5 transition-all duration-200 lg:-ml-8',
                        selectedIndex === featureIndex
                          ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10'
                          : 'hover:bg-white/10 lg:hover:bg-white/5',
                        activeIndex === featureIndex && 'scale-105'
                      )}
                    >
                      <h3>
                        <Tab
                          className={clsx(
                            'font-display text-lg sm:text-xl ui-not-focus-visible:outline-none transition-colors duration-200',
                            selectedIndex === featureIndex
                              ? 'text-gray-900 lg:text-white'
                              : activeIndex === featureIndex
                              ? 'text-indigo-400'
                              : 'text-gray-300 hover:text-white lg:text-white',
                          )}
                        >
                          <span className="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                          {feature.title}
                        </Tab>
                      </h3>
                      <p
                        className={clsx(
                          'mt-2 hidden text-sm lg:block transition-colors duration-200 max-w-md',
                          selectedIndex === featureIndex
                            ? 'text-white'
                            : activeIndex === featureIndex
                            ? 'text-indigo-300'
                            : 'text-gray-300 group-hover:text-white',
                        )}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </TabList>
              </div>
              <TabPanels className="lg:col-span-8 px-4 sm:px-0">
                {features.map((feature) => (
                  <TabPanel key={feature.title} unmount={false}>
                    <div className="relative sm:px-6 lg:hidden">
                      <div className="absolute -inset-x-4 -top-4 bottom-[-4.25rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
                      <p className="relative mx-auto max-w-2xl text-sm sm:text-base text-white sm:text-center px-4 py-4">
                        {feature.description}
                      </p>
                    </div>
                    <div className="mt-6 sm:mt-8 w-full overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-black/20">
                      <img
                        className="w-full h-[280px] sm:h-[380px] lg:h-[480px] object-cover"
                        src={feature.image}
                        alt={feature.title}
                      />
                    </div>
                  </TabPanel>
                ))}
              </TabPanels>
            </>
          )}
        </TabGroup>
      </Container>
    </section>
  )
}
