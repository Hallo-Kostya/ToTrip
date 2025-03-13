import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const apiKey = 'db812a7a-d4a2-43be-ba7a-45ed64bca34d';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address } = req.query;

  if (typeof address !== 'string') {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
      params: {
        geocode: address,
        apikey: apiKey,
        format: 'json',
      },
    });

    const data = response.data;
    const geoObject =
      data.response.GeoObjectCollection.featureMember[0]?.GeoObject;

    if (geoObject) {
      const [longitude, latitude] = geoObject.Point.pos.split(' ').map(Number);
      return res.status(200).json({ latitude, longitude });
    } else {
      return res.status(404).json({ error: 'Address not found' });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error during geocoding request' });
  }
}
