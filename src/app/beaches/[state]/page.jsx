// 'use client'

// import { beachStates } from '@/app/data/beachStates'
// import Image from 'next/image'
// import { notFound } from 'next/navigation'
// import { Header } from '@/components/Header'
// import { Container } from '@/components/Container'
// import Footer from '@/components/Footer'

// export default function BeachPage({ params }) {
//   const navItems = [
//     {
//       "link": "/",
//       "label": "Home" 
//     },
//     {
//       "link": "/about", 
//       "label": "About"
//     }
//   ]

//   // Handle multi-word state names by capitalizing each word
//   const stateName = params.state
//     .split(/(?=[A-Z])/)
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//     .join(' ')

//   // Find state by comparing normalized names
//   const state = beachStates.find(state => 
//     state.name.toLowerCase().replace(/\s+/g, '') === params.state.toLowerCase()
//   )

//   if (!state) return notFound()

//   // Calculate grid columns based on number of beaches
//   const getGridCols = (numBeaches) => {
//     if (numBeaches === 1) return 'md:grid-cols-1'
//     if (numBeaches === 2) return 'md:grid-cols-2'
//     return 'md:grid-cols-2 lg:grid-cols-3'
//   }

//   return (
//     <>
//       <Header navItems={navItems} />
//       <main>
//         <section className="relative bg-gradient-to-b from-sky-200 via-sky-300 to-sky-200 py-12">
//           <Container className="relative">
//             <div className="max-w-3xl mx-auto text-center mb-12">
//               <h1 className="text-5xl font-bold text-blue-900 mb-4">{state.name}</h1>
//               <p className="text-xl text-blue-800">{state.description}</p>
//             </div>

//             {/* Beach Cards Section */}
//             <div className={`grid grid-cols-1 ${state.beaches && getGridCols(state.beaches.length)} gap-8 ${state.beaches?.length === 1 ? 'max-w-2xl mx-auto' : ''}`}>
//               {state.beaches && state.beaches.length > 0 ? (
//                 state.beaches.map(beach => (
//                   <div key={beach.name} className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
//                     <div className="relative h-64">
//                       <Image 
//                         src={beach.image} 
//                         alt={beach.name} 
//                         fill
//                         className="object-cover"
//                       />
//                     </div>
//                     <div className="p-6">
//                       <h2 className="text-2xl font-bold text-blue-900 mb-3">{beach.name}</h2>
//                       <p className="text-blue-800">{beach.description}</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-blue-900 col-span-3 text-center text-xl">No specific beaches listed for {state.name}.</p>
//               )}
//             </div>

//             {/* Highlights Section */}
//             <div className="mt-16">
//               <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Popular Highlights</h2>
//               <div className="flex flex-wrap justify-center gap-4">
//                 {state.highlights.map((highlight, index) => (
//                   <span key={index} className="px-6 py-2 bg-blue-100 text-blue-800 rounded-full text-lg">
//                     {highlight}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Region Info Section */}
//             <div className="mt-16 text-center">
//               <span className="inline-block px-6 py-2 bg-blue-100 text-blue-800 rounded-full text-lg">
//                 {state.region}
//               </span>
//             </div>
//           </Container>
//         </section>
//       </main>
//       <Footer />
//     </>
//   )
// }
'use client'

import { beachStates } from '@/app/data/beachStates'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import Footer from '@/components/Footer'

export default function BeachPage({ params }) {
  const navItems = [
    {
      "link": "/",
      "label": "Home" 
    },
    {
      "link": "/about", 
      "label": "About"
    }
  ]

  // Handle multi-word state names by capitalizing each word
  const stateName = params.state
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  // Find state by comparing normalized names
  const state = beachStates.find(state => 
    state.name.toLowerCase().replace(/\s+/g, '') === params.state.toLowerCase()
  )

  if (!state) return notFound()

  // Calculate grid columns based on number of beaches
  const getGridCols = (numBeaches) => {
    if (numBeaches === 1) return 'md:grid-cols-1'
    if (numBeaches === 2) return 'md:grid-cols-2'
    return 'md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <>
      <Header navItems={navItems} />
      <main>
        <section className="relative bg-gradient-to-b from-sky-200 via-sky-300 to-sky-200 py-12">
          <Container className="relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-5xl font-bold text-blue-900 mb-4">{state.name}</h1>
              <p className="text-xl text-blue-800">{state.description}</p>
            </div>

            {/* Beach Cards Section */}
            <div className={`grid grid-cols-1 ${state.beaches && getGridCols(state.beaches.length)} gap-8 ${state.beaches?.length === 1 ? 'max-w-2xl mx-auto' : ''}`}>
              {state.beaches && state.beaches.length > 0 ? (
                state.beaches.map(beach => (
                  <Link 
                    key={beach.name} 
                    href={`/beaches/${params.state.toLowerCase()}/${beach.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className="relative h-64">
                        <Image 
                          src={beach.image} 
                          alt={beach.name} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold text-blue-900 mb-3">{beach.name}</h2>
                        <p className="text-blue-800">{beach.description}</p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-blue-900 col-span-3 text-center text-xl">No specific beaches listed for {state.name}.</p>
              )}
            </div>

            {/* Highlights Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Popular Highlights</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {state.highlights.map((highlight, index) => (
                  <span key={index} className="px-6 py-2 bg-blue-100 text-blue-800 rounded-full text-lg">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Region Info Section */}
            <div className="mt-16 text-center">
              <span className="inline-block px-6 py-2 bg-blue-100 text-blue-800 rounded-full text-lg">
                {state.region}
              </span>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  )
}
