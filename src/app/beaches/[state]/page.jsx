// 'use client';

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
  const stateData = beachStates.find(s => s.name.toLowerCase().replace(/\s+/g, '') === state.toLowerCase());

  // Handle invalid state
  if (!stateData) return notFound();

  return (
    <>
      <Header />
      <main className="py-12 bg-gradient-to-b from-blue-200 to-blue-100">
        <Container>
          <h1 className="text-5xl font-bold text-blue-900 text-center mb-8">{stateData.name} Beaches</h1>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {stateData.beaches.map((beach, index) => (
              <Link key={index} href={`/beaches/${state}/${beach.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 cursor-pointer">
                  <Image src={beach.image} alt={beach.name} width={400} height={250} className="w-full h-48 object-cover" />
                  <div className="p-4 text-center">
                    <h2 className="text-xl font-bold text-blue-900">{beach.name}</h2>
                    <p className="text-gray-700">{beach.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div> */}
        <div className="flex justify-center">
  <div
    className={`grid gap-6 ${
      stateData.beaches.length === 1 ? "grid-cols-1 justify-items-center" : 
      stateData.beaches.length === 2 ? "grid-cols-2" : 
      "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    }`}
  >
    {stateData.beaches.map((beach, index) => (
      <Link key={index} href={`/beaches/${state}/${beach.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 cursor-pointer w-[320px]">
          <Image 
            src={beach.image} 
            alt={beach.name} 
            width={400} 
            height={250} 
            className="w-full h-48 object-cover"
          />
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold text-blue-900">{beach.name}</h2>
            <p className="text-gray-700">{beach.description}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>


        </Container>
      </main>
      <Footer />
    </>
  );
}
