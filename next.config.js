// /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'source.unsplash.com', 
      'openweathermap.org', 
      'maps.googleapis.com'  // ✅ Add Google Maps domain here
    ]
  },
}

module.exports = nextConfig;
