export type Days = 'Pazar' | 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma' | 'Cumartesi';

interface Day {
  values: {
    temperatureMax: number;
    temperatureMin: number;
    weatherCodeMin: number;
  },
};

export type Daily = Day[];
