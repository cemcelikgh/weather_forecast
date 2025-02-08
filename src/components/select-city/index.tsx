'use client';

import { ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCity, setCity }
  from "@/lib/features/citySlice";
import type { CityType, CurrPosiSuccType, CurrPosiErroType }
  from "@/types/SelectCityTypes";
import { useDispatch } from "react-redux";
import { createEntityAdapter } from "@reduxjs/toolkit";
import citiesArr from "./cities";
import ChangeTheme from "@/utils/ChangeTheme";

const cityAdaptor = createEntityAdapter<CityType>();
const cities = cityAdaptor.setAll(cityAdaptor.getInitialState(), citiesArr);

function SelectCity() {

  const city = useSelector(selectCity);
  const dispatch = useDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      const success = (position: CurrPosiSuccType) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.tomtom.com/search/2/reverseGeocode/${lat},${lon}.json?key=fIPvoNR6jQbl3jMnCArYi5AAHgQzLvpL`)
          .then(response => response.json())
          .then(data => {
            const cityID = data.addresses[0].address.postalCode.slice(0, 2);
            if (cityID) {
              dispatch(setCity({'id': cityID , 'name': cities.entities[cityID].name }))
            } else { console.warn('Bulunduğunuz şehir tespit edilemedi.') }
          });
        };
      const error = (err: CurrPosiErroType) => {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      };
      navigator.geolocation.getCurrentPosition(success, error);
    }
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
        {cities.entities[id].name}
      </option>
      )}
    </select>
    <ChangeTheme />
  </section>
  );
};

export default SelectCity;
