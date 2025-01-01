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
  borderRadius: number
}

const Map = ({width, height, borderRadius} : IMap) => {
  const mapRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (mapRef.current && typeof ymaps !== 'undefined') {
      ymaps.ready(() => {
        if (!mapRef.current!._map) {
          const map = new ymaps.Map(mapRef.current, {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ['zoomControl', 'routeButtonControl', 'fullscreenControl', 'geolocationControl', 'typeSelector'],
            minZoom: 8,
            maxZoom: 10
          });
          mapRef.current!._map = map;
        }
      });
    }

    return () => {
      if (mapRef.current && mapRef.current._map) {
        mapRef.current._map.destroy();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mapRef.current._map = null; 
      }
    };
  }, []);

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
