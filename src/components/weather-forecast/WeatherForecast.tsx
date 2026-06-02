'use client';

import { useState, useEffect } from "react";
import './assets/weather-icons.css';
import { useAppSelector } from "@/lib/hooks";
import { selectCity } from "@/lib/features/citySlice";
import Image from "next/image";
import lightPreLoader from './assets/light-preloader.gif';
import darkPreLoader from './assets/dark-preloader.gif';
import { selectTheme } from "@/lib/features/themeSlice";

type Days = 'Pazar' | 'Pazartesi' | 'Salı' | 'Çarşamba' | 'Perşembe' | 'Cuma' | 'Cumartesi';

interface Day {
  values: {
    temperatureMax: number;
    temperatureMin: number;
    weatherCodeMin: number;
  },
};

type Daily = Day[];

function WeatherForecast() {

  const city  = useAppSelector(selectCity);
  const theme = useAppSelector(selectTheme);
  const [ loader, setLoader ] = useState(true);
  const [ failure, setFailure] = useState(false);
  const [ days, setDays ] = useState<Days[]>([]);
  const [ daily, setDaily ] = useState<Daily>([]);

  useEffect(() => {

    setLoader(true);
    setFailure(false);

    fetch(`/.netlify/functions/weatherForecast?city=${city.name}`)
    .then(response => {
      if(!response.ok) { throw new Error('Could not fetch the weather forecast.') };
      return response.json();
    }).then(data => {
      const daily = data?.timelines?.daily?.slice(0, 6);
      if (!daily) { throw new Error('Could not retrieve the daily data.') };
      setDaily(daily);
      setDays(sixDays());
      setLoader(false);
    }).catch(err => {
      setLoader(false);
      setFailure(true);
      console.error(err);
    });
  
  }, [city]);

  const sixDays = () => {
    const days: Days[] = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const todayIndex = new Date().getDay();
    const sixDays: Days[] = [];
    for (let i = 0; i < 6; i++) {
      sixDays.push(days[(todayIndex + i) % 7]);
    };
    return sixDays;
  };

  const [loaderBGC, setLoaderBGC] = useState('#0a0a0a');
  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    const bgColor = root.getPropertyValue('--background').trim();
    setLoaderBGC(bgColor);
  }, [theme]);

  return (
    <section id='daily-forecast'>
      {loader ?
      <div className='preloader'>
        <Image 
          src={loaderBGC === '#0a0a0a' ? darkPreLoader : lightPreLoader}
          width={64}
          height={64}
          unoptimized
          loading="eager"
          alt="Yükleniyor..."
        />
      </div>
      : (!loader && !failure) ? 
      <ul className="wc-list">
        {daily.map((day, index) => (
        <li key={index}>
          <p>{days[index]}</p>
          <div className={`wc${day.values.weatherCodeMin}`}></div>
          <div className="temperatures">
            <div>{Math.round(day.values.temperatureMin)}&#176;</div>
            <div>{Math.round(day.values.temperatureMax)}&#176;</div>
          </div>
        </li>
        ))}
      </ul>
      : failure &&
      <div className="failure">
        Hava tahminine erişilemedi.
      </div>
      }
    </section>
  );

}

export default WeatherForecast;
