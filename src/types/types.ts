export type CityType = {
  id: string;
  name: string;
};

type DayType = {
  values: {
    temperatureMax: number;
    temperatureMin: number;
    weatherCodeMin: number;
  },
};

export type DailyType = DayType[];
