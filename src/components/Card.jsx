import React from "react";
import "../styles/card.css";
import { useState, useEffect } from "react";
const Card = () => {
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [city, setCity] = useState("Bangalore");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;

  const API_KEY = "69daa00b981abcc576921a3e821fede3";

  const fetchWeather = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      console.log(data);
      
      if (res.ok) {
        setWeather(data);
        setError(null); // Clear error if successful
      } else {
        setWeather(null);
        setError("Try a correct city name");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather(city); // Pass city parameter
  }, []);

  const changeCity = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather(city); // Call fetchWeather with city parameter
  };
  const getIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/clouds.png";
      case "Smoke || Haze":
        return "/haze.png";
      case "Haze":
        return "/haze.png";
      case "Mist":
        return "/mist.png";
      case "rainy":
        return "/rainy.png";
      case "thunderstorm":
        return "/clouds.png";
      case "Clouds":
        return "/thunderstorm.png";
      case "Clear":
        return "/clear.png";
      default:
        break;
    }
  };
  return (
    <>
      <div className="conatiner">
        {error && <p className="error">{error}</p>}
        {weather && (
          <>
            <h1 className="date">{formattedDate}</h1>
            <div className="data">
              <h1 className="city">{weather.name}</h1>
              <img src={getIconUrl(weather.weather[0].main)} alt="" />
              <h2 className="degree">{weather.main.temp}</h2>
              <h2 className="weather_name">{weather.weather[0].main}</h2>
              <h2 className="humidity">Humidity : {weather.main.humidity} </h2>
              <form action="" className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="enter city"
                  onChange={changeCity}
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Card;
