// src/components/YandexMap.js
import React, { useEffect, useRef } from 'react';
import mapMarkerIcon from '../assets/map-marker.png';

function YandexMap() {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const loadMap = () => {
      if (!mapInstance.current) {
        window.ymaps.ready(() => {
          const map = new window.ymaps.Map(
            mapContainer.current,
            {
              center: [55.751574, 37.573856],
              zoom: 10,
              controls: ['zoomControl', 'fullscreenControl'],
            },
            {
              suppressMapOpenBlock: true,
            }
          );

          // Удаляем или комментируем следующую строку, чтобы включить зум при скролле
          // map.behaviors.disable('scrollZoom');

          const valenciaLocations = [
            {
              id: 1,
              name: 'Магазин Валенсия на улице Ленина',
              coordinates: [55.751574, 37.573856],
              address: 'ул. Ленина, 1',
            },
            {
              id: 2,
              name: 'Магазин Валенсия на улице Пушкина',
              coordinates: [55.761574, 37.583856],
              address: 'ул. Пушкина, 10',
            },
            // Добавьте дополнительные точки при необходимости
          ];

          const placemarkCollection = new window.ymaps.GeoObjectCollection(null, {
            preset: 'islands#pinkIcon',
          });

          valenciaLocations.forEach((location) => {
            const placemark = new window.ymaps.Placemark(
              location.coordinates,
              {
                balloonContentHeader: location.name,
                balloonContentBody: `<strong>Адрес:</strong> ${location.address}<br/><a href="https://yandex.ru/maps/?rtext=~${location.coordinates.join(
                  ','
                )}&rtt=auto" target="_blank">Проложить маршрут</a>`,
                hintContent: location.name,
              },
              {
                iconLayout: 'default#image',
                iconImageHref: mapMarkerIcon,
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40],
              }
            );
            placemarkCollection.add(placemark);
          });

          map.geoObjects.add(placemarkCollection);

          mapInstance.current = map;
        });
      }
    };

    if (!window.ymaps) {
      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=ru_RU`;
      script.type = 'text/javascript';
      script.onload = loadMap;
      script.onerror = () => {
        console.error('Не удалось загрузить Яндекс.Карты API');
      };
      document.head.appendChild(script);
    } else {
      loadMap();
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      className="w-full h-96 rounded-lg shadow-lg overflow-hidden"
    ></div>
  );
}

export default YandexMap;
