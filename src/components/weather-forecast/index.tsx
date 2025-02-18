'use client';

import { useState, useEffect } from "react";
import './assets/weather-icons.css';
import { useSelector } from "react-redux";
import { selectCity } from "@/lib/features/citySlice";
import Image from "next/image";
import lightPreLoader from './assets/light-preloader.gif';
import darkPreLoader from './assets/dark-preloader.gif';
import type { DailyType } from "@/types/WeatherForecastTypes";
import { selectTheme } from "@/lib/features/themeSlice";

function WeatherForecast() {

  const [ daily, setDaily ] = useState<DailyType>([]);
  const [ days, setDays ] = useState<string[]>([]);
  const [ loader, setLoader ] = useState<boolean>(false);
  const theme = useSelector(selectTheme);
  const city  = useSelector(selectCity);

  useEffect(() => {
    setLoader(true);
    const baseURL = 'https://api.tomorrow.io/v4/weather/forecast';
    const apiKey = 'pngbGz0Ku8gfo7JQy8ZBErLWGvvolX4m';
    fetch(`${baseURL}?location=${city.name}&timesteps=1d&units=metric&apikey=${apiKey}`,
      {
        method: 'GET',
        headers: { accept: 'application/json', 'accept-encoding': 'deflate, gzip, br' }
      }
    )
      .then(response => {
        if(!response.ok) {
          throw new Error('Failed to fetch response: ' + response.statusText);
        } else { return response.json() }
      })
      .then(json => {
        setDaily(json.timelines.daily.slice(0, 6));
        setDays(sixDays());
        setLoader(false);
      })
      .catch(error => {
        alert('Hava tahminine erişilemedi.');
        console.error('Fetch Error: ', error);
      })
  }, [city]);

  const sixDays = (): string[] => {
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const todayIndex = new Date().getDay();
    const sixDays = [];
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
      {loader &&
      <div className='preloader'>
        <Image 
          src={loaderBGC === '#0a0a0a' ? darkPreLoader : lightPreLoader}
          width={64}
          height={64}
          alt="Yükleniyor..."
          unoptimized
        />
      </div>
      }
      {!loader &&
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
      }
    </section>
  );
};

export default WeatherForecast;
