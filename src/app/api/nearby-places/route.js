export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return new Response(JSON.stringify({ error: 'Missing coordinates' }), { status: 400 });
  }

  try {
    // Dummy Data (Replace with real API integration)
    const places = [
        {
          "name": "Sea Breeze Café",
          "address": "123 Ocean Drive",
          "images": [
            "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed33",
            "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
            "https://images.unsplash.com/photo-1528605248644-14dd04022da1"
          ]
        },
        {
          "name": "Coastal Bites",
          "address": "456 Beach Avenue",
          "images": [
            "https://images.unsplash.com/photo-1572372252052-81b99b693007",
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
            "https://images.unsplash.com/photo-1560343090-f0409e92791a"
          ]
        },
        {
          "name": "Sandy Shore Restaurant",
          "address": "789 Seaside Blvd",
          "images": [
            "https://images.unsplash.com/photo-1552566626-52f8b828add9",
            "https://images.unsplash.com/photo-1600891964091-34b62e52182d",
            "https://images.unsplash.com/photo-1565299507177-b0ac66763828"
          ]
        }
      ];

    return new Response(JSON.stringify({ places }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch places' }), { status: 500 });
  }
}
