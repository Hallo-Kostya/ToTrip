/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import * as React from 'react';

declare global {
  interface HTMLDivElement {
    _map?: any; 
  }
}

interface IMap {
  width: number,
  height: number,
  borderRadius: number,
  address: string,
}

const Map = ({ width, height, borderRadius, address }: IMap) => {
  const [coordinates, setCoordinates] = React.useState<{ latitude: number, longitude: number } | null>(null);
  const mapRef = React.useRef<HTMLDivElement | null>(null);

  // Функция для получения координат через API Яндекс.Геокодер
  const getCoordinates = async (address: string) => {
    try {
      const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?geocode=${encodeURIComponent(address)}&format=json&apikey=db812a7a-d4a2-43be-ba7a-45ed64bca34d`);
      const data = await response.json();
      
      if (data.response.GeoObjectCollection.featureMember.length > 0) {
        const [longitude, latitude] = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').map(Number);
        setCoordinates({ latitude, longitude });
      } else {
        console.error('Адрес не найден');
      }
    } catch (error) {
      console.error('Ошибка при запросе координат:', error);
    }
  };

  React.useEffect(() => {
    if (address) {
      getCoordinates(address);
    }
  }, [address]);

  React.useEffect(() => {
    if (coordinates && mapRef.current && typeof ymaps !== 'undefined') {
      if (!mapRef.current._map) {
        const map = new ymaps.Map(mapRef.current, {
          center: [coordinates.latitude, coordinates.longitude],
          zoom: 14,
          controls: ['zoomControl', 'routeButtonControl', 'fullscreenControl', 'geolocationControl', 'typeSelector'],
          minZoom: 8,
          maxZoom: 18
        });
        mapRef.current._map = map;

        const placemark = new ymaps.Placemark(
          [coordinates.latitude, coordinates.longitude],
          { balloonContent: address },
          {
            preset: "islands#redIcon",
            iconColor: "#ff0000",
          }
        );

        map.geoObjects.add(placemark);
      }
    }

    return () => {
      if (mapRef.current && mapRef.current._map) {
        mapRef.current._map.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mapRef.current._map = null;
      }
    };
  }, [coordinates, address]);

  return (
    <div
      ref={mapRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    />
  );
};

export default Map;
