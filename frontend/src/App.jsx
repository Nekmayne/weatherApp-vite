import { React, useState, useEffect } from "react";
import "./App.css";
import moment from "moment";

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

  let cityTime = new Date(new Date().getTime() + timezoneOffset * 1000);

  let updatedTime = new Date(cityTime - 2 * 60 * 60 * 1000);

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
      className={`flex flex-col mx-auto max-w-screen-md py-1 px-3 bg-gradient-to-br  ${changeBackground()}`}
    >
      <h1 className="text-white text-4xl flex flex-row justify-center">
        Weather App
      </h1>
      <div className="flex flex-row justify-center my-3">
        <form onSubmit={handleSubmit}>
          <input
            className="p-1 focus:outline-none placeholder:lowercase flex-1"
            type="text"
            value={city}
            placeholder="Search city"
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="text-white bg-gray-400 p-1">
            Search
          </button>
        </form>
      </div>
      {weatherData.list && (
        <div>
          <div className="text-white flex flex-row justify-center">
            <p>{updatedTime.toLocaleString("en-GB")}</p>
          </div>
          <div className="text-white py-2 text-3xl flex flex-row justify-center">
            <p>{weatherData.city.name}</p>
          </div>
          <div className="flex flex-row justify-center">
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.list[1].weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
            <div className="flex flex-col align-middle ">
              <p className="text-white text-4xl py-2">
                {`${weatherData.list[0].main.temp.toFixed(0)}`}°C
              </p>
              <p className="text-white text-1xl ">{`${weatherData.list[1].weather[0].description}`}</p>
            </div>
          </div>
          <div className="flex flex-row justify-center text-white gap-3">
            <div className="border p-2">
              <p className="text-2xl">
                {`${weatherData.list[0].main.feels_like.toFixed(0)}`}°C
              </p>
              <p className="text-sm text-gray-100">Feels like</p>
            </div>
            <div className="border p-2">
              <p className="text-2xl">{weatherData.list[0].main.humidity}%</p>
              <p className="text-sm text-gray-100">Humidity</p>
            </div>
            <div className="border p-2">
              <p className="text-2xl">
                {weatherData.list[3].wind.speed.toFixed(0)} km/h
              </p>
              <p className="text-sm text-gray-100">Wind speed</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row justify-center  pt-4 pb-1">
        <p className="text-white text-3xl">24 Hour Weather</p>
      </div>
      <hr />
      <div className="flex flex-col justify-center sm:flex-row">
        {weatherData.list &&
          weatherData.list.slice(1, 8).map((day) => (
            <div
              className="flex flex-row sm:flex-col sm:m-2 sm:text-lg border sm:border-none mb-2 justify-evenly items-center text-white text-2xl"
              key={day.dt}
            >
              <p className="flex flex-row justify-center text-center align-middle">
                {moment.utc(day.dt_txt).format("HH:mm")}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                width={90}
              />
              <p>{`${day.main.temp.toFixed()}`} °C</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
