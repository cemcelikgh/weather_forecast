'use client';

import { ChangeEvent, useEffect } from "react";
import { City } from "@/types/types";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { selectCity, setCity } from "@/lib/features/citySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import citiesArr from "./cities";
import ThemeSelector from "./theme-selector/ThemeSelector";

const cityAdapter = createEntityAdapter<City>();
const cities = cityAdapter.setAll(cityAdapter.getInitialState(), citiesArr);

function Selectors() {

  const city = useAppSelector(selectCity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      const success = (position: GeolocationPosition) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`/.netlify/functions/reverseGeocode?lat=${lat}&lon=${lon}`)
        .then(response => {
          if(!response.ok) { throw new Error('Could not fetch the geocode.') };
          return response.json();
        }).then(data => {
          const cityId = data?.addresses?.[0]?.address?.postalCode?.slice(0, 2);
          if (!cityId) { throw new Error('Could not retrieve the city.') };
          dispatch(setCity({'id': cityId , 'name': cities.entities[cityId].name }));
        }).catch(err => { console.error(err) });
      };
      const error = (err: GeolocationPositionError) => { console.warn(err.message); };
      navigator.geolocation.getCurrentPosition(success, error);
    };
  }, [dispatch]);

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    dispatch(setCity({ 'id': id , 'name': cities.entities[id].name }));
  };

  return (
  <section id="selectors">
    <select
      id="cities"
      value={city.id}
      onChange={handleSelectCity}
    >
      {cities.ids.map(id =>
      <option
        value={cities.entities[id].id}
        key={cities.entities[id].id}
      >
        {cities.entities[id].name}
      </option>)}
    </select>
    <ThemeSelector />
  </section>
  );

}

export default Selectors;
