 export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const type = searchParams.get('type') || 'lodging';  // 'lodging', 'restaurant', etc.

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: 'Missing coordinates' }), { status: 400 });
  }

  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=${type}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch places: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results) {
      return new Response(JSON.stringify({ error: 'No results found' }), { status: 404 });
    }

    // ✅ Format and Return Places
    const places = data.results.map((place) => ({
      name: place.name,
      address: place.vicinity || 'No address available',
      rating: place.rating || 'N/A',
      price: place.price_level || 'N/A',
      distance: `${(place.geometry.location.lat - lat).toFixed(2)} km`,  // Approx distance
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${place.geometry.location.lat},${place.geometry.location.lng}`,
      image: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
        : '/placeholder.jpg'
    }));

    return new Response(JSON.stringify({ places }), { status: 200 });
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch places' }), { status: 500 });
  }
}
