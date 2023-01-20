import { React, useState, useEffect } from "react";
import "./App.css";
import Inputs from "./components/Inputs";
import Forecast from "./components/Forecast";
import Weather from "./components/Weather";

function App() {
  const [city, setCity] = useState("Helsinki");
  const [weatherData, setWeatherData] = useState({});
  const [timezoneOffset, setTimezoneOffset] = useState(0);

  const getWeather = async () => {
    const response = await fetch(
      `http://localhost:9000/weather/${city}&units=metric`
    );
    const data = await response.json();
    setWeatherData(data);
    setTimezoneOffset(data.city.timezone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(city);
    setCity("");
  };

  useEffect(() => {
    getWeather();
  }, []);

  const localTime = () => {
    let cityTime = new Date().getTime() + timezoneOffset * 1000;
    let updatedTime = new Date(cityTime);
    return updatedTime;
  };

  const changeBackground = () => {
    if (weatherData.list) {
      if (weatherData.list[0].main.temp <= 0) {
        return "from-cyan-500 to-blue-900";
      } else if (
        weatherData.list[0].main.temp > 0 &&
        weatherData.list[0].main.temp <= 10
      ) {
        return "from-sky-300 to-blue-600";
      } else if (
        weatherData.list[0].main.temp >= 11 &&
        weatherData.list[0].main.temp <= 20
      ) {
        return "from-amber-300 to-yellow-500";
      }
      return "from-orange-400 to-orange-600";
    }
  };

  return (
    <div
      className={`flex flex-col mx-auto max-w-screen-md py-1 px-3 bg-gradient-to-br ${changeBackground()}`}
    >
      <Inputs setCity={setCity} city={city} handleSubmit={handleSubmit} />
      <Weather weatherData={weatherData} localTime={localTime} />
      <Forecast weatherData={weatherData} offset={timezoneOffset} />
    </div>
  );
}

export default App;
