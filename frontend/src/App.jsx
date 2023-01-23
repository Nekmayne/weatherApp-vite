import { React, useState, useEffect } from "react";
import "./App.css";
import Inputs from "./components/Inputs";
import Forecast from "./components/Forecast";
import Weather from "./components/Weather";
import Notification from "./components/Notification";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [temperature, setTemperature] = useState(0);
  const [timezoneOffset, setTimezoneOffset] = useState(0);
  const [message, setMessage] = useState(null);

  const getWeatherByCity = async () => {
    try {
      const response = await fetch(
        `https://still-fog-5870.fly.dev/weather/${city}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      setTimezoneOffset(data.city.timezone);
      setTemperature(data.list[0].main.temp);
    } catch {
      setMessage("City doesn't exist");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const getWeatherByLocation = async (lat, lon) => {
    try {
      const response = await fetch(
        `http://localhost:9000/location?lat=${lat}&lon=${lon}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
      setTemperature(data.list[0].main.temp);
    } catch {
      (error) => console.log(error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeatherByLocation(
          position.coords.latitude,
          position.coords.longitude
        );
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city === "") {
      setMessage("Enter a city name");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      getWeatherByCity(city);
      changeBackground();
      setCity("");
    }
  };

  const localTime = () => {
    let cityTime = new Date().getTime() + timezoneOffset * 1000;
    let updatedTime = new Date(cityTime);
    return updatedTime;
  };

  const changeBackground = () => {
    if (temperature < 20) {
      return "from-cyan-400 to-blue-600";
    }
    return "from-orange-400 to-orange-600";
  };

  return (
    <div
      className={`flex flex-col mx-auto max-w-screen-md py-1 px-3 bg-gradient-to-br ${changeBackground()}`}
    >
      <Inputs setCity={setCity} city={city} handleSubmit={handleSubmit} />
      <Notification message={message} />
      {weatherData && (
        <div>
          <Weather weatherData={weatherData} localTime={localTime} />
          <Forecast weatherData={weatherData} offset={timezoneOffset} />
        </div>
      )}
    </div>
  );
}

export default App;
