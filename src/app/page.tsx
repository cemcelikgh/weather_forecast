import SelectCity from "@/components/select-city";
import WeatherForecast from "@/components/weather-forecast";

export default function Home() {
  return (
    <main>
      <h1>Hava Tahmini</h1>
      <SelectCity />
      <WeatherForecast />
    </main>
  );
}
