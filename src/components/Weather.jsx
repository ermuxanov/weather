import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../store/slices/weatherSlice";
import "./Weather.scss";
import IconSun from "../assets/sun.svg";
import IconSearch from "../assets/search.svg";
import FormattedDate from "./FormattedDate.jsx";
const Weather = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.weather);

  const [cityInput, setCityInput] = useState("");
  console.log("Weather data:", data);
  useEffect(() => {
    dispatch(fetchWeather("Tashkent"));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const city = cityInput.trim();
    if (city) {
      dispatch(fetchWeather(city));
      setCityInput("");
    }
  };

  const handleCityClick = (city) => {
    dispatch(fetchWeather(city));
  };

  const cityName = data?.name || "Load...";
  const degree = typeof data?.main?.temp === "number" ? `${Math.round(data.main.temp)}°` : `0°`;
  const description = data?.weather?.[0]?.description || "Load...";
  const clouds = data?.clouds?.all || 0;
  const humidity = data?.main?.humidity || 0;
  const wind = data?.wind?.speed ? Math.round(data.wind.speed * 3.6) : 0;
  const rain = data?.rain?.["1h"] || 0;
  const Icon = data?.weather?.[0]?.icon ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : IconSun;
  return (
    <div className="weather">
      <div className="weather__left">
        <h1 className="weather__left-title">the.weather</h1>
        <div className="weather__left-block">
          <h2 className="weather__left-degree">{degree}</h2>
          <div className="weather__left-wrap">
            <h3 className="weather__left-country">{cityName}</h3>
            <FormattedDate timezone={data?.timezone} />
          </div>
          <div className="weather__left-wrap">
            <img src={Icon} alt="" className="weather__left-icon" />
            <span>{description}</span>
          </div>
        </div>
      </div>
      <div className="weather__right">
        <form onSubmit={handleSubmit} className="weather__right-form">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            className="weather__right-input"
            placeholder="Another location"
          />
          <button className="weather__right-search">
            <img src={IconSearch} alt="" />
          </button>
        </form>
        <ul className="weather__right-countries">
          {["Birmingham", "Manchester", "New York", "California"].map((city) => (
            <li key={city} className="weather__right-country" onClick={() => handleCityClick(city)}>
              {city}
            </li>
          ))}
        </ul>
        <div className="weather__right-wrap">
          <h4 className="weather__right-heading">Weather Details</h4>
          <ul className="weather__right-details">
            <li className="weather__right-detail">
              <span>Cloudy</span>
              <span>{clouds}%</span>
            </li>
            <li className="weather__right-detail">
              <span>Humidity</span>
              <span>{humidity}%</span>
            </li>
            <li className="weather__right-detail">
              <span>Wind</span>
              <span>{wind} km/h</span>
            </li>
            <li className="weather__right-detail">
              <span>Rain</span>
              <span>{rain} mm</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Weather;
