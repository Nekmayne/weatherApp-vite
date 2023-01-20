import React, { useState } from "react";

function Inputs({ handleSubmit, city, setCity }) {
  return (
    <div>
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
    </div>
  );
}

export default Inputs;
