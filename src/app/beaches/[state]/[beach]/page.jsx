// // // 'use client'

// // // import { beachStates } from '@/app/data/beachStates'
// // // import Image from 'next/image'
// // // import { notFound } from 'next/navigation'
// // // import { Header } from '@/components/Header'
// // // import { Container } from '@/components/Container'
// // // import Footer from '@/components/Footer'

// // // export default function BeachInfoPage({ params }) {
// // //   const { state, beach } = params;

// // //   // Find state data
// // //   const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());

// // //   if (!stateData) return notFound();

// // //   // Find beach data
// // //   const beachData = stateData.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, "-") === beach);

// // //   if (!beachData) return notFound();

// // //   return (
// // //     <>
// // //       <Header />
// // //       <main>
// // //         <section className="relative bg-gradient-to-b from-sky-200 via-sky-300 to-sky-200 py-12">
// // //           <Container className="relative">
// // //             <div className="max-w-3xl mx-auto text-center mb-12">
// // //               <h1 className="text-5xl font-bold text-blue-900 mb-4">{beachData.name}</h1>
// // //               <p className="text-xl text-blue-800">{beachData.description}</p>
// // //             </div>
// // //             <div className="flex justify-center">
// // //               <Image src={beachData.image} alt={beachData.name} width={600} height={400} className="rounded-lg shadow-lg" />
// // //             </div>
// // //           </Container>
// // //         </section>
// // //       </main>
// // //       <Footer />
// // //     </>
// // //   );
// // // }
// // 'use client'

// // import { beachStates } from '@/app/data/beachStates'
// // import Image from 'next/image'
// // import { notFound } from 'next/navigation'
// // import { Header } from '@/components/Header'
// // import { Container } from '@/components/Container'
// // import Footer from '@/components/Footer'

// // export default function BeachInfoPage({ params }) {
// //   const { state, beach } = params;

// //   // Find state data
// //   const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());

// //   if (!stateData) return notFound();

// //   // Find beach data
// //   const beachData = stateData.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, "-") === beach);

// //   if (!beachData) return notFound();

// //   return (
// //     <>
// //       <Header />
// //       <main>
// //         <section className="relative bg-gradient-to-b from-sky-200 via-sky-300 to-sky-200 py-12">
// //           <Container className="relative">
// //             <div className="max-w-3xl mx-auto text-center mb-12">
// //               <h1 className="text-5xl font-bold text-blue-900 mb-4">{beachData.name}</h1>
// //               <p className="text-xl text-blue-800">{beachData.description}</p>
// //             </div>

// //             {/* Beach Image */}
// //             <div className="flex justify-center mb-8">
// //               <Image src={beachData.image} alt={beachData.name} width={600} height={400} className="rounded-lg shadow-lg" />
// //             </div>

// //             {/* Google Map Embed */}
// //             <div className="flex justify-center">
// //               <iframe
// //                 src={beachData.embedUrl}
// //                 width="600"
// //                 height="400"
// //                 style={{ border: 0 }}
// //                 allowFullScreen=""
// //                 loading="lazy"
// //                 className="rounded-lg shadow-lg"
// //               ></iframe>
// //             </div>
// //           </Container>
// //         </section>
// //       </main>
// //       <Footer />
// //     </>
// //   );
// // }
// 'use client'

// import { useEffect, useState } from 'react';
// import { beachStates } from '@/app/data/beachStates';
// import Image from 'next/image';
// import { notFound } from 'next/navigation';
// import { Header } from '@/components/Header';
// import { Container } from '@/components/Container';
// import Footer from '@/components/Footer';

// export default function BeachInfoPage({ params }) {
//   const { state, beach } = params;
//   const [weather, setWeather] = useState(null);
//   const [places, setPlaces] = useState([]);

//   // Find state data
//   const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());
//   if (!stateData) return notFound();

//   // Find beach data
//   const beachData = stateData.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, "-") === beach);
//   if (!beachData) return notFound();

//   const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // OpenWeather API Key
//   const foursquareApiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY; // Foursquare API Key

//   useEffect(() => {
//     // Fetch weather info
//     async function fetchWeather() {
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${beachData.latitude}&lon=${beachData.longitude}&units=metric&appid=${weatherApiKey}`
//         );
//         const data = await response.json();
//         setWeather({
//           temp: data.main.temp,
//           description: data.weather[0].description,
//           icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
//         });
//       } catch (error) {
//         console.error('Error fetching weather:', error);
//       }
//     }

//     // Fetch nearby places from Foursquare
//     async function fetchPlaces() {
//       try {
//         const response = await fetch(
//           `https://api.foursquare.com/v3/places/search?ll=${beachData.latitude},${beachData.longitude}&radius=2000&categories=13065,13032,13035&limit=5`,
//           {
//             headers: {
//               Authorization: foursquareApiKey,
//               Accept: "application/json",
//             },
//           }
//         );
//         const data = await response.json();
//         setPlaces(data.results);
//       } catch (error) {
//         console.error('Error fetching places:', error);
//       }
//     }

//     fetchWeather();
//     fetchPlaces();
//   }, [beachData.latitude, beachData.longitude, weatherApiKey, foursquareApiKey]);

//   return (
//     <>
//       <Header />
//       <main>
//         <section className="relative bg-gradient-to-b from-sky-200 via-sky-300 to-sky-200 py-12">
//           <Container className="relative">
//             {/* Beach Name & Description */}
//             <div className="max-w-3xl mx-auto text-center mb-12">
//               <h1 className="text-5xl font-bold text-blue-900 mb-4">{beachData.name}</h1>
//               <p className="text-xl text-blue-800">{beachData.description}</p>
//             </div>

//             {/* Beach Image & Weather Info */}
//             <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-8">
//               <Image src={beachData.image} alt={beachData.name} width={600} height={400} className="rounded-lg shadow-lg" />
              
//               {/* Weather Info */}
//               {weather && (
//                 <div className="bg-white p-4 rounded-lg shadow-lg text-center w-64">
//                   <h3 className="text-xl font-semibold mb-2">Current Weather</h3>
//                   <Image src={weather.icon} alt={weather.description} width={50} height={50} />
//                   <p className="text-lg font-bold">{weather.temp}°C</p>
//                   <p className="capitalize">{weather.description}</p>
//                 </div>
//               )}
//             </div>

//             {/* Google Map Embed */}
//             <div className="flex justify-center mb-12">
//               <iframe
//                 src={beachData.embedUrl}
//                 width="100%"
//                 height="400"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 className="rounded-lg shadow-lg w-full max-w-4xl"
//               ></iframe>
//             </div>

//             {/* Nearby Places (Using Foursquare API) */}
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Nearby Restaurants & Cafes</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {places.length  > 0 ? (
//                   places.map((place, index) => (
//                     <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
//                       <h3 className="text-lg font-semibold">{place.name}</h3>
//                       <p className="text-sm text-gray-600">Category: {place.categories?.[0]?.name || 'N/A'}</p>
//                       <p className="text-sm text-gray-600">Distance: {(place.distance / 1000).toFixed(2)} km away</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-center text-gray-700">No nearby places found.</p>
//                 )}
//               </div>
//             </div>
//           </Container>
//         </section>
//       </main>
//       <Footer />
//     </>
//   );
// }
'use client';

import { beachStates } from '@/app/data/beachStates';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { images } from '../../../../../next.config';

export default function BeachInfoPage({ params }) {
  const { state, beach } = params;

  // Find state data
  const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());
  if (!stateData) return notFound();

  // Find beach data
  const beachData = stateData.beaches.find(b => b.name.toLowerCase().replace(/\s+/g, "-") === beach);
  if (!beachData) return notFound();

  // State for nearby places & weather
  const [places, setPlaces] = useState(null);
  const [weather, setWeather] = useState(null);

  // Fetch Nearby Places & Weather
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch(`/api/nearby-places?lat=${beachData.lat}&lon=${beachData.lon}`);
        const data = await response.json();
        setPlaces(data.places || []);
      } catch (error) {
        console.error('Error fetching nearby places:', error);
        setPlaces([]);
      }
    }

    async function fetchWeather() {
      try {
        const response = await fetch(`/api/weather?lat=${beachData.lat}&lon=${beachData.lon}`);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setWeather(null);
      }
    }

    fetchPlaces();
    fetchWeather();
  }, [beachData.lat, beachData.lon]);

  return (
    <>
      <Header />
      <main>
        <section className="relative bg-gradient-to-b from-sky-200 via-sky-300 to-sky-200 py-12">
          <Container className="relative">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-5xl font-bold text-blue-900 mb-4">{beachData.name}</h1>
              <p className="text-xl text-blue-800">{beachData.description}</p>
            </div>

            {/* Beach Image */}
            <div className="flex justify-center mb-8">
              <Image src={beachData.image} alt={beachData.name} width={600} height={400} className="rounded-lg shadow-lg" />
            </div>

            {/* Weather Info */}
            {weather && (
              <div className="relative rounded-lg p-6 mb-8 text-center">
                <h2 className="text-3xl font-bold text-blue-900 mb-4">Current Weather</h2>
                <div className="relative inline-block text-xl">
                  <p className="inline-block">{weather.temp}°C, {weather.condition}</p>
                  <Image 
                    src={`https://openweathermap.org/img/wn/${weather.icon}.png`} 
                    width={80} 
                    height={80} 
                    alt="Weather Icon"
                    className="absolute -top-10 -right-20"
                    unoptimized
                  />
                </div>
              </div>
            )}

            {/* Google Map Embed */}
            <div className="flex justify-center mb-8">
              <iframe
                src={beachData.embedUrl}
                width="600"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>

            {/* Nearby Places Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
                Nearby Restaurants & Cafes
              </h2>
              {places === null ? (
                <p className="text-center text-gray-600">Fetching nearby places...</p>
              ) : places.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {places.map((place, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden shadow-lg">
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 2000 }}
                        className="h-48"
                      >
                         {place.images.map((image, imgIndex) => (
    <SwiperSlide key={imgIndex}>
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
    </SwiperSlide>
                        ))}
                      </Swiper>
                      <div className="p-4 bg-white text-center">
                        <h3 className="text-lg font-semibold">{place.name}</h3>
                        <p className="text-gray-600">{place.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600">No nearby restaurants or cafes found.</p>
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
