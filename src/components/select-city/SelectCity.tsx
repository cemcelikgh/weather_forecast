'use client';

import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCity, setCity } from "@/lib/features/citySlice";
import { City } from "@/types/types";
import { createEntityAdapter } from "@reduxjs/toolkit";
import citiesArr from "./cities";
import ThemeSelector from "@/utils/ThemeSelector";

const cityAdapter = createEntityAdapter<City>();
const cities = cityAdapter.setAll(cityAdapter.getInitialState(), citiesArr);

function SelectCity() {

  const dispatch = useAppDispatch();
  const city = useAppSelector(selectCity);

  useEffect(() => {

    if ("geolocation" in navigator) {

      const success = (position: GeolocationPosition) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = process.env.NEXT_PUBLIC_REV_GEO_API_KEY;
        fetch(`/.netlify/functions/reverseGeocode?lat=${lat}&lon=${lon}`)
        .then(response => {
          if(!response.ok) { throw new Error('Could not fetch the geocode.') };
          return response.json();
        }).then(data => {
          const cityID = data?.addresses?.[0]?.address?.postalCode?.slice(0, 2);
          if (!cityID) { throw new Error('Could not retrieve the city.') };
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
    {cities.ids.map(id => (
      <option key={cities.entities[id].id}
        value={cities.entities[id].id}
      >
        {cities.entities[id].name}
      </option>
    ))}
    </select>
    <ThemeSelector />
  </section>
  );

}

export default SelectCity;
