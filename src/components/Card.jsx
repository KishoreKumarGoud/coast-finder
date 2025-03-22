import Image from 'next/image';

export default function Card({ place }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative w-full h-60">
        <Image 
          src={place.image} 
          alt={place.name} 
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-blue-900">{place.name}</h3>
        <p className="text-yellow-500">⭐ {place.rating}</p>
        <p className="text-gray-700">{place.address}</p>
        <p className="text-green-600 font-semibold">Price: ₹{place.price}</p>
        <p className="text-gray-600">Distance: {place.distance} km</p>
        <a 
          href={place.mapUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-600 underline mt-2 block"
        >
          View on Map
        </a>
      </div>
    </div>
  );
}
