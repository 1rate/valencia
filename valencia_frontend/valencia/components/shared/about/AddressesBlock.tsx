// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Массив адресов магазинов
// const addresses = [
//   "ул. Докучаева 50б",
//   "ул. Докучаева 42Б (у ТЦ Времена Года)",
//   "ул. Хабаровская, 135",
//   "ул. Ушакова 59/1",
//   "ул. Автозаводская, 44",
//   "ул. Пожарского, 10",
//   "ул. Тургенева 21а",
//   "ул. Молдавская, 4",
//   "ул. Гашкова, 23а",
//   "ул. Советская 2а (Лобаново)",
//   "ул. Академика Веденеева, 39",
//   "ул. Маршала Рыбалко, 99б",
//   "ул. Александра Щербакова, 43а",
//   "ул. Вильямса, 47Б",
//   "ул. Запорожская, 11",
//   "ул. Грачева ,25",
//   "ул. Гусарова, 14Б",
//   "ул. Солдатова , 32",
//   "ул. Ким, 81",
//   "ул. Ласьвинская, 38",
//   "ул. Целинная, 41",
//   "ул. Черняховского, 76",
//   "ул. Калинина, 34",
// ];

// declare global {
//   interface Window {
//     ymaps: any;
//     __ymapsInitialized?: boolean;
//   }
// }

// export const AddressesBlock: React.FC = () => {
//   const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
//   const mapContainerRef = useRef<HTMLDivElement>(null);
//   const [mapInstance, setMapInstance] = useState<any>(null);

//   // Функция геокодирования: нормализуем адрес и получаем координаты
//   const geocodeAddress = async (
//     address: string
//   ): Promise<[number, number] | null> => {
//     const normalizedAddress = address.trim();
//     try {
//       const result = await window.ymaps.geocode(normalizedAddress);
//       const firstGeoObject = result.geoObjects.get(0);
//       if (firstGeoObject) {
//         const coords = firstGeoObject.geometry.getCoordinates();
//         console.log(`Координаты для "${normalizedAddress}":`, coords);
//         return coords;
//       } else {
//         console.warn(`Адрес "${normalizedAddress}" не найден.`);
//       }
//     } catch (error) {
//       console.error("Ошибка геокодирования для адреса", normalizedAddress, ":", error);
//     }
//     return null;
//   };

//   // Функция добавления меток для всех адресов
//   const addPlacemarks = async (map: any) => {
//     map.geoObjects.removeAll();
//     for (const address of addresses) {
//       const coords = await geocodeAddress(address);
//       if (coords) {
//         const placemark = new window.ymaps.Placemark(
//           coords,
//           { balloonContent: address },
//           { preset: "islands#redIcon" }
//         );
//         map.geoObjects.add(placemark);
//       }
//     }
//   };

//   useEffect(() => {
//     const loadYandexMaps = () => {
//       if (!document.querySelector('script[src*="api-maps.yandex.ru/2.1/"]')) {
//         const script = document.createElement("script");
//         script.src =
//           "https://api-maps.yandex.ru/2.1/?apikey=a819e448-18ae-4b1f-bc10-16f428de44da&lang=ru_RU";
//         script.async = true;
//         script.onload = () => {
//           checkAndInit();
//         };
//         script.onerror = () => {
//           console.error("Ошибка загрузки скрипта Яндекс.Карт");
//         };
//         document.head.appendChild(script);
//       } else {
//         checkAndInit();
//       }
//     };

//     // Функция проверки наличия ymaps и вызова initMap
//     const checkAndInit = () => {
//       if (window.ymaps && window.ymaps.ready) {
//         window.ymaps.ready(initMap);
//       } else {
//         const interval = setInterval(() => {
//           if (window.ymaps && window.ymaps.ready) {
//             clearInterval(interval);
//             window.ymaps.ready(initMap);
//           }
//         }, 100);
//       }
//     };

//     const initMap = () => {
//       if (window.__ymapsInitialized) return;
//       // Устанавливаем флаг сразу, чтобы предотвратить повторную инициализацию
//       window.__ymapsInitialized = true;
//       if (mapContainerRef.current && !mapInstance) {
//         geocodeAddress(addresses[0]).then((coords) => {
//           const defaultCoords = coords || [55.751244, 37.618423]; // Центр Москвы как запасной вариант
//           const map = new window.ymaps.Map(mapContainerRef.current, {
//             center: defaultCoords,
//             zoom: 30,
//           });
//           map.behaviors.enable("scrollZoom");
//           map.controls.add("zoomControl");
//           setMapInstance(map);
//           addPlacemarks(map);
//         });
//       }
//     };

//     loadYandexMaps();
//   }, []);

//   // При выборе адреса центрируем карту на выбранном месте и зуммируем
//   useEffect(() => {
//     if (mapInstance) {
//       geocodeAddress(selectedAddress).then((coords) => {
//         if (coords) {
//           mapInstance.setCenter(coords, 16, {
//             duration: 300,
//           });
//         }
//       });
//     }
//   }, [selectedAddress, mapInstance]);

//   return (
//     <section className="mb-10">
//       <h2 className="text-2xl font-bold mb-4">Адреса магазинов</h2>
//       <Select value={selectedAddress} onValueChange={setSelectedAddress}>
//         <SelectTrigger className="w-full">
//           <SelectValue placeholder="Выберите адрес" />
//         </SelectTrigger>
//         <SelectContent>
//           {addresses.map((address) => (
//             <SelectItem key={address} value={address}>
//               {address}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//       <div
//         ref={mapContainerRef}
//         style={{ width: "100%", height: "400px" }}
//         className="mt-6 rounded-md border"
//       ></div>
//     </section>
//   );
// };

// export default AddressesBlock;


"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Массив адресов магазинов
const addresses = [
  "ул. Докучаева 50б",
  "ул. Докучаева 42Б (у ТЦ Времена Года)",
  "ул. Хабаровская, 135",
  "ул. Ушакова 59/1",
  "ул. Автозаводская, 44",
  "ул. Пожарского, 10",
  "ул. Тургенева 21а",
  "ул. Молдавская, 4",
  "ул. Гашкова, 23а",
  "ул. Советская 2а (Лобаново)",
  "ул. Академика Веденеева, 39",
  "ул. Маршала Рыбалко, 99б",
  "ул. Александра Щербакова, 43а",
  "ул. Вильямса, 47Б",
  "ул. Запорожская, 11",
  "ул. Грачева ,25",
  "ул. Гусарова, 14Б",
  "ул. Солдатова , 32",
  "ул. Ким, 81",
  "ул. Ласьвинская, 38",
  "ул. Целинная, 41",
  "ул. Черняховского, 76",
  "ул. Калинина, 34",
];

export const AddressesBlock: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>(addresses[0]); // По умолчанию первый адрес
  const [map, setMap] = useState<ymaps.Map | null>(null);

  useEffect(() => {
    // Загрузка API Яндекс Карт
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=a819e448-18ae-4b1f-bc10-16f428de44da&lang=ru_RU";
    script.async = true;
    script.onload = () => {
      ymaps.ready(() => {
        // Инициализация карты с центром на первом адресе
        ymaps.geocode(addresses[0]).then((res: ymaps.IGeocodeResult) => {
          const firstGeoObject = res.geoObjects.get(0);
          if (firstGeoObject) {
            const coordinates = firstGeoObject.geometry?.getCoordinates();
            if (coordinates) {
              const newMap = new ymaps.Map(mapContainerRef.current!, {
                center: coordinates,
                zoom: 30, // Начальный зум
              });

              // Добавление меток для всех адресов
              addresses.forEach((address) => {
                ymaps.geocode(address).then((geoRes: ymaps.IGeocodeResult) => {
                  const geoObject = geoRes.geoObjects.get(0);
                  if (geoObject) {
                    const placemark = new ymaps.Placemark(
                      geoObject.geometry?.getCoordinates(),
                      {
                        hintContent: address,
                      },
                      {
                        preset: "islands#blueIcon", // Синий указатель
                      }
                    );
                    newMap.geoObjects.add(placemark);
                  }
                });
              });

              setMap(newMap);
            }
          }
        });
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map && selectedAddress) {
      // Поиск координат выбранного адреса
      ymaps.geocode(selectedAddress).then((res: ymaps.IGeocodeResult) => {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          const coordinates = firstGeoObject.geometry?.getCoordinates();
          if (coordinates) {
            map.setCenter(coordinates, 15); // Установка центра карты на выбранный адрес и зум
          }
        }
      });
    }
  }, [selectedAddress, map]);

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">Адреса магазинов</h2>
      <Select value={selectedAddress} onValueChange={setSelectedAddress}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите адрес" />
        </SelectTrigger>
        <SelectContent>
          {addresses.map((address) => (
            <SelectItem key={address} value={address}>
              {address}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "400px" }}
        className="mt-6 rounded-md border"
      ></div>
    </section>
  );
};

export default AddressesBlock;