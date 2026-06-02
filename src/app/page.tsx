import SelectCity from "@/components/select-city/SelectCity";
import WeatherForecast from "@/components/weather-forecast/WeatherForecast";

function Home() {
  return (
    <main>
      <h1>Hava Tahmini</h1>
      <SelectCity />
      <WeatherForecast />
    </main>
  );
}

export default Home;
