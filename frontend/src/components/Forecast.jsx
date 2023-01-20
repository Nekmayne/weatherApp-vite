import React from "react";
import moment from "moment";

function Forecast({ weatherData, offset }) {
  return (
    <div>
      <div className="flex flex-row justify-center  pt-4 pb-1">
        <p className="text-white text-3xl">24 Hour Weather</p>
      </div>
      <hr />
      <div className="flex flex-col justify-center sm:flex-row">
        {weatherData.list &&
          weatherData.list.slice(0, 8).map((day) => (
            <div
              className="flex flex-row sm:flex-col sm:m-2 sm:text-lg border sm:border-none mb-2 justify-evenly items-center text-white text-2xl"
              key={day.dt}
            >
              <p className="flex flex-row justify-center text-center align-middle">
                {moment
                  .utc(day.dt_txt)
                  .utcOffset(offset / 60)
                  .format("HH:mm")}
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

export default Forecast;
