export default async function handler(req, res) {
    const { latitude, longitude, type } = req.query;
  
    if (!latitude || !longitude || !type) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${type}&key=${GOOGLE_API_KEY}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json({ error: data.error_message || 'Failed to fetch places' });
      }
    } catch (error) {
      console.error('Server Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
  