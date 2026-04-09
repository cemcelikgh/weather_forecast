export type CityType = {
  id: string;
  name: string;
};

export type CityAdopType = {
  id: string;
  name: string;
};

export type CurrPosiSuccType = {
  coords: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    altitude?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
  timestamp?: number;
};

export type CurrPosiErroType = {
  code: number;
  message: string;
};
