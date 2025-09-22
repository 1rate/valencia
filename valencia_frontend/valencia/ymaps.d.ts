declare namespace ymaps {
    function ready(callback: () => void): void;
  
    interface Map {
      setCenter(coordinates: number[], zoom: number): void;
      geoObjects: GeoObjectCollection;
    }
  
    interface IGeocodeResult {
      geoObjects: GeoObjectCollection;
    }
  
    interface GeoObjectCollection {
      get(index: number): GeoObject;
      add(child: GeoObject): void;
    }
  
    interface GeoObject {
      geometry: Geometry;
    }
  
    interface Geometry {
      getCoordinates(): number[];
    }
  
    interface Placemark extends GeoObject {
      new (
        coordinates: number[],
        properties?: { hintContent?: string },
        options?: { preset?: string }
      ): Placemark;
    }
  
    function geocode(query: string): Promise<IGeocodeResult>;
  
    class Map {
      constructor(element: HTMLElement | string, options: { center: number[]; zoom: number });
    }
  
    const Placemark: Placemark;
  }