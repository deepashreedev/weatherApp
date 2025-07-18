import React, { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiThermometer, WiCloud } from "react-icons/wi";
import bgimg from "./images/bgi.jpg";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [desc, setDesc] = useState("");

  function handleCity(event) {
    setCity(event.target.value);
  }

  function getWeather() {
    let weatherData = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d56d4688cdff6555d61a0dc3e7f6f860&units=metric`
    );

    weatherData
      .then(function (success) {
        console.log(success.data);
        setWeather(success.data.weather[0].main);
        setTemp(success.data.main.temp);
        setDesc(success.data.weather[0].description);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeather("");
        setTemp("");
        setDesc("City not found or error fetching data");
      });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white/50 backdrop-blur-lg shadow-2xl rounded-2xl p-8 text-gray-900">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 drop-shadow-md border-b border-amber-400 pb-2">
            Weather Report
          </h1>
          <p className="text-center text-gray-700 mb-6">
            I can give you a weather report about your city
          </p>

          <input
            type="text"
            onChange={handleCity}
            placeholder="Enter city name"
            className="w-full mb-4 p-3 rounded-md bg-white/60 text-gray-800 placeholder-gray-500 outline-none shadow-inner"
          />

          <button
            onClick={getWeather}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:opacity-90 text-white font-semibold py-2.5 rounded-md transition-all shadow-md"
          >
            Get Report
          </button>

          <div className="p-5 mt-6 space-y-3 font-semibold text-gray-800 rounded-xl shadow-lg bg-white/40 backdrop-blur-md">
            <p className="flex items-center justify-center gap-2 text-lg">
              <WiDaySunny className="text-yellow-500 text-3xl" />
              Weather: {weather}
            </p>
            <p className="flex items-center justify-center gap-2 text-lg">
              <WiThermometer className="text-red-500 text-3xl" />
              Temperature: {temp}°C
            </p>
            <p className="flex items-center justify-center gap-2 text-lg">
              <WiCloud className="text-blue-500 text-3xl" />
              Description: {desc}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Weather;
