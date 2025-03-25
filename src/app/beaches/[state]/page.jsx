// // 'use client';

// import { beachStates } from '@/app/data/beachStates';
// import { notFound } from 'next/navigation';
// import { Header } from '@/components/Header';
// import { Container } from '@/components/Container';
// import Footer from '@/components/Footer';
// import Link from 'next/link';
// import Image from 'next/image';

// export default function StateBeachesPage({ params }) {
//   const { state } = params;

//   // Find state data
//   const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());

//   // Handle invalid state
//   if (!stateData) return notFound();

//   return (
//     <>
//       <Header />
//       <main className="py-12 bg-gradient-to-b from-blue-200 to-blue-100">
//         <Container>
//           <h1 className="text-5xl font-bold text-blue-900 text-center mb-8">{stateData.name} Beaches</h1>

//           {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
//             {stateData.beaches.map((beach, index) => (
//               <Link key={index} href={`/beaches/${state}/${beach.name.toLowerCase().replace(/\s+/g, '-')}`}>
//                 <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 cursor-pointer">
//                   <Image src={beach.image} alt={beach.name} width={400} height={250} className="w-full h-48 object-cover" />
//                   <div className="p-4 text-center">
//                     <h2 className="text-xl font-bold text-blue-900">{beach.name}</h2>
//                     <p className="text-gray-700">{beach.description}</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div> */}
//         <div className="flex justify-center">
//   <div
//     className={`grid gap-6 ${
//       stateData.beaches.length === 1 ? "grid-cols-1 justify-items-center" : 
//       stateData.beaches.length === 2 ? "grid-cols-2" : 
//       "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//     }`}
//   >
//     {stateData.beaches.map((beach, index) => (
//       <Link key={index} href={`/beaches/${state}/${beach.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex justify-center">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 cursor-pointer w-[320px]">
//           <Image 
//             src={beach.image} 
//             alt={beach.name} 
//             width={400} 
//             height={250} 
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-4 text-center">
//             <h2 className="text-xl font-bold text-blue-900">{beach.name}</h2>
//             <p className="text-gray-700">{beach.description}</p>
//           </div>
//         </div>
//       </Link>
//     ))}
//   </div>
// </div>


//         </Container>
//       </main>
//       <Footer />
//     </>
//   );
// }
'use client';

import { beachStates } from '@/app/data/beachStates';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function StateBeachesPage({ params }) {
  const { state } = params;

  // Find state data
  const stateData = beachStates.find(
    (s) => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase()
  );

  // Handle invalid state
  if (!stateData) return notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 relative overflow-hidden">
        <Container>
          {/* ✅ Beach-Themed Background and Title */}
          <h1 className="text-5xl font-extrabold text-center text-blue-900 mb-12 drop-shadow-lg">
            {stateData.name} Beaches 🌴
          </h1>

          {/* ✅ Centered and Interactive Beach Cards */}
          <div className="relative z-10 flex justify-center">
            <div 
              className="relative w-full max-w-7xl grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8"
              style={{ 
                background: `linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)`,
                boxShadow: `0 8px 20px rgba(0, 0, 0, 0.1)`,
                borderRadius: `12px`,
                animation: `wave 5s infinite alternate`
              }}
            >
              {stateData.beaches.slice(0, 3).map((beach, index) => (
                <Link
                  key={index}
                  href={`/beaches/${state}/${beach.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="transition-transform hover:scale-105"
                >
                  <div 
                    className="bg-white rounded-lg shadow-lg overflow-hidden w-[350px] h-[460px] flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl hover:ring-4 hover:ring-blue-300 hover:rotate-1 hover:-translate-y-1 hover:shadow-blue-400"
                    style={{
                      transition: `transform 0.5s, box-shadow 0.5s`,
                    }}
                  >
                    {/* 🌅 Beach Image with Animation */}
                    <div className="relative h-[60%]">
                      <Image
                        src={beach.image}
                        alt={beach.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity"></div>
                    </div>

                    {/* 🌊 Beach Info */}
                    <div className="p-6 bg-gradient-to-t from-blue-50 to-white">
                      <h2 className="text-2xl font-bold text-blue-800 mb-2 transition-all duration-300 group-hover:text-blue-600">
                        {beach.name}
                      </h2>

                      {/* ✅ Max 2-line Review */}
                      <p className="text-gray-700 line-clamp-2 h-[3rem] transition-opacity group-hover:opacity-90">
                        {beach.Review}
                      </p>

                      {/* 🌴 CTA Button */}
                      <div className="mt-4 flex justify-center">
                        <span className="text-blue-700 font-semibold bg-blue-100 px-4 py-2 rounded-full shadow-md group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 cursor-pointer">
                          Explore More ➡️
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />

      {/* ✅ Wave Animation Style */}
      <style jsx>{`
        @keyframes wave {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </>
  );
}