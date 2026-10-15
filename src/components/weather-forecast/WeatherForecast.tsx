'use client';

import { Daily, Days } from "./types";
import { selectCity } from "@/lib/features/citySlice";
import { useAppSelector } from "@/lib/hooks";
import { useState, useEffect } from "react";
import './weather-icons.css';

const sixDays = () => {
  const days: Days[] = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const todayIndex = new Date().getDay();
  const sixDays: Days[] = [];
  for (let i = 0; i < 6; i++) {
    sixDays.push(days[(todayIndex + i) % 7]);
  };
  return sixDays;
};

function WeatherForecast() {

  const [days, setDays] = useState<Days[]>([]);
  const [daily, setDaily] = useState<Daily>([]);
  const [failure, setFailure] = useState(false);
  const [previousCity, setPreviousCity] = useState('');
  const city  = useAppSelector(selectCity);

  const loading = previousCity !== city.name;

  useEffect(() => {

    const apiKey = process.env.NEXT_PUBLIC_WEA_FOR_API_KEY;
    if (!apiKey) throw new Error('NEXT_PUBLIC_WEA_FOR_API_KEY is missing');

    fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${city.name}&timesteps=1d&units=metric&apikey=${apiKey}`, {
      method: 'GET',
      headers: { accept: 'application/json', 'accept-encoding': 'deflate, gzip, br' },
    }).then(response => {
      if(!response.ok) { throw new Error('Could not fetch the weather forecast.') };
      return response.json();
    }).then(data => {
      const daily = data?.timelines?.daily?.slice(0, 6);
      if (!daily) { throw new Error('Could not retrieve the daily data.') };
      setFailure(false);
      setDaily(daily);
      setDays(sixDays());
    }).catch(err => {
      setFailure(true);
      console.error(err);
    }).finally(() => { setPreviousCity(city.name) });

  }, [city]);

  return (
    <section id='daily-forecast'>
    {loading ?
      <div className="loader-container">
        <div className="lds-ripple">
          <div/>
          <div/>
        </div>
      </div>
    : !loading && !failure ?
      <ul className="wc-list">
        {daily.map((day, index) => 
        <li key={index}>
          <p>{days[index]}</p>
          <div className={`wc${day.values.weatherCodeMin}`}></div>
          <div className="temperatures">
            <div>{Math.round(day.values.temperatureMin)}&#176;</div>
            <div>{Math.round(day.values.temperatureMax)}&#176;</div>
          </div>
        </li>)}
      </ul>
    : failure &&
      <div className="failure">
        Hava tahminine erişilemedi.
      </div>}
    </section>
  );

}

export default WeatherForecast;
