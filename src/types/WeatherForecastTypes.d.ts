type DayType ={
  time: string,
  values: {
    temperatureMax: number,
    temperatureMin: number,
    weatherCodeMin: number,
    [key: string]: unknown
  }
}

export type DailyType = DayType[];
