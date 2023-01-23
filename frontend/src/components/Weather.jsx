import moment from "moment";
import React from "react";

function Weather({ weatherData, localTime }) {
  return (
    <div>
      {weatherData.list && (
        <div>
          <div className="text-white flex flex-row justify-center">
            <p>{moment.utc(localTime()).format("DD.MM.YYYY H:mm")}</p>
          </div>
          <div className="text-white py-2 text-3xl flex flex-row justify-center">
            <p>
              {weatherData.city.name} | {weatherData.city.country}
            </p>
          </div>

          <div className="flex flex-row justify-center">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.list[1].weather[0].icon}@2x.png`}
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
    </div>
  );
}

export default Weather;
