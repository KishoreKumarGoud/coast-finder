'use client'
import Footer from '@/components/Footer'
import Team from '@/components/Team'
import { Header } from '@/components/Header'

const navItems = [
  {
    "link": "/",
    "label": "Home"
  },
  {
    "link": "/contact", 
    "label": "Contact"
  }
]

export default function Example() {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Header */}
      <Header navItems={navItems}></Header>

      <main className="isolate">
        {/* Hero section */}
        <div className="relative isolate -z-10 bg-gradient-to-b from-gray-50 via-white to-gray-100">
          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
              }}
              className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-indigo-200 to-purple-200 opacity-20"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="w-full">
                <div className="w-full">
                  <h1 className="text-4xl font-bold tracking-tight text-violet-600 sm:text-6xl">
                    Transforming Spaces, Enriching Lives
                  </h1>
                  <p className="relative mt-6 text-xl leading-8 text-gray-600">
                    Welcome to Studio Traumhaus, where visionary design meets unparalleled craftsmanship. 
                    We are passionate about creating immersive spaces that tell unique stories. Our expertise 
                    spans architecture, interior design, and urban planning - each project carefully crafted 
                    to achieve the perfect harmony of aesthetics, functionality, and sustainability. At our core, 
                    we believe in designing spaces that not only captivate the eye but also nurture the soul.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:mt-8 bg-[#f5f5dc] rounded-lg p-8">
          <div className="w-full">
            <h2 className="text-3xl font-bold tracking-tight text-violet-600 sm:text-4xl">
              Our Mission
            </h2>
            <div className="mt-6">
              <div className="w-full">
                <p className="text-2xl leading-8 text-gray-600">
                  To orchestrate spaces where innovation dances with tradition, where every detail 
                  tells a story, and where dreams transform into breathtaking reality.
                </p>
                <div className="mt-10">
                  <p className="text-lg leading-7 text-gray-700">
                    We don&apos;t just design spaces - we craft experiences that resonate with the human spirit. 
                    Our approach combines cutting-edge innovation with timeless principles, ensuring each project 
                    not only meets but exceeds expectations, creating lasting positive impacts on both society 
                    and the environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image section */}
        <div className="mt-20 sm:mt-24 xl:mx-auto xl:max-w-7xl xl:px-8 bg-[#f5f5dc] rounded-lg p-8">
          <h2 className="text-3xl font-bold tracking-tight text-violet-600 sm:text-4xl mb-12">
            Our Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group">
              <img
                alt="Modern residential interior design project"
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                className="aspect-[4/3] w-full object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Luxury Villa Interior</h3>
              <p className="text-lg text-gray-600">Residential Project</p>
            </div>
            <div className="group">
              <img
                alt="Contemporary office space design"
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                className="aspect-[4/3] w-full object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Modern Office Complex</h3>
              <p className="text-lg text-gray-600">Commercial Project</p>
            </div>
            <div className="group">
              <img
                alt="Sustainable urban development project"
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                className="aspect-[4/3] w-full object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Eco-Friendly Development</h3>
              <p className="text-lg text-gray-600">Urban Planning Project</p>
            </div>
          </div>
        </div>

        {/* Vision section */}
        <div className="mx-auto mt-20 max-w-7xl px-6 sm:mt-24 lg:px-8 bg-[#f5f5dc] rounded-lg p-6 mb-8">
          <div className="w-full">
            <h2 className="text-3xl font-bold tracking-tight text-violet-600 sm:text-4xl">
              Our Vision
            </h2>
            <div className="mt-6">
              <div className="w-full">
                <p className="text-2xl leading-8 text-gray-600">
                  To be the catalyst for transformative design that shapes tomorrow&apos;s world, creating spaces 
                  that inspire generations and set new standards in sustainable architecture.
                </p>
                <div className="mt-8 mb-6">
                  <p className="text-lg leading-7 text-gray-700">
                    As pioneers in architectural innovation, we envision a future where design seamlessly 
                    bridges human needs with environmental consciousness. Our commitment extends beyond 
                    aesthetics - we&apos;re dedicated to creating sustainable, adaptive spaces that evolve with 
                    time while maintaining their timeless appeal. Through our work, we aim to inspire 
                    communities, foster connections, and create lasting legacies that contribute to a 
                    more beautiful and sustainable world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Team></Team> */}
      <Footer></Footer>
    </div>
  )
}
