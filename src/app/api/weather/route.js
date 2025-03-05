export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
  
    if (!lat || !lon) {
      return new Response(JSON.stringify({ error: 'Missing coordinates' }), { status: 400 });
    }
  
    // Randomly generate temperature between 20°C and 35°C
    const randomTemp = (Math.random() * 15 + 20).toFixed(1);
  
    // Predefined weather conditions and corresponding icons from OpenWeatherMap
    const weatherOptions = [
      { condition: "Clear Sky", icon: "01d" },
      { condition: "Few Clouds", icon: "02d" },
      { condition: "Scattered Clouds", icon: "03d" },
      { condition: "Overcast", icon: "04d" },
      { condition: "Light Rain", icon: "10d" },
      { condition: "Heavy Rain", icon: "09d" },
      { condition: "Thunderstorm", icon: "11d" },
      { condition: "Snow", icon: "13d" },
      { condition: "Mist", icon: "50d" }
    ];
  
    // Select a random weather condition
    const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
  
    return new Response(JSON.stringify({
      temp: randomTemp,
      condition: randomWeather.condition,
      icon: randomWeather.icon
    }), { status: 200 });
  }
  