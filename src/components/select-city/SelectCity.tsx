'use client';

import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { selectCity, setCity } from "@/lib/features/citySlice";
import type { CityType } from "@/types/types";
import { createEntityAdapter } from "@reduxjs/toolkit";
import citiesArr from "./cities";
import ChangeTheme from "@/utils/ChangeTheme";

const cityAdaptor = createEntityAdapter<CityType>();
const cities = cityAdaptor.setAll(cityAdaptor.getInitialState(), citiesArr);

function SelectCity() {

  const dispatch = useAppDispatch();
  const city = useAppSelector(selectCity);

  useEffect(() => {

    if ("geolocation" in navigator) {

      const success = (position: GeolocationPosition) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`/.netlify/functions/reverseGeocode?lat=${lat}&lon=${lon}`
        ).then(response => {
          if(!response.ok) {
            throw new Error('Could not fetch the geocode.');
          }
          return response.json();
        }).then(data => {
          const cityID = data?.addresses?.[0]?.address?.postalCode?.slice(0, 2);
          if (!cityID) {
            throw new Error('Could not retrieve the city.');
          }
          dispatch(setCity({'id': cityID , 'name': cities.entities[cityID].name }));
        }).catch(err => { console.error(err) });
      };

      const error = (err: GeolocationPositionError) => { console.warn(err.message); };

      navigator.geolocation.getCurrentPosition(success, error);

    };

  }, [dispatch]);

  const handleCityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const ID = event.target.value;
    dispatch(setCity({ 'id': ID , 'name': cities.entities[ID].name }));
  };

  return (
  <section id="selectors">
    <select
      id="cities"
      value={city.id}
      onChange={handleCityChange}
    >
      {cities.ids.map(id =>
      <option key={cities.entities[id].id}
        value={cities.entities[id].id}
      >
        {` ${cities.entities[id].name}`}
      </option>
      )}
    </select>
    <ChangeTheme />
  </section>
  );

}

export default SelectCity;
