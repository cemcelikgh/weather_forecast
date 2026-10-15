import Selectors from "@/components/selectors/Selectors";
import WeatherForecast
  from "@/components/weather-forecast/WeatherForecast";

function Home() {
  return (
    <main>
      <h1>Hava Tahmini</h1>
      <Selectors />
      <WeatherForecast />
    </main>
  );
}

export default Home;
