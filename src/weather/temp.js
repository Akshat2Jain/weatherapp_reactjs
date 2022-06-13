import React, { useEffect, useState } from "react";
import "./style.css";
import Card from "./card";

const Temp = () => {
  const [searchValue, setsearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9babd7964d9ecf01a9b1aca53e94a071`;
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermoood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      console.log(temp,humidity,pressure,weathermoood,name,speed,country,sunset)
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermoood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            autoFocus
            id="search"
            value={searchValue}
            onChange={(e) => setsearchValue(e.target.value)}
            className="searchTerm"
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      {/* Our temp card */}
      <Card tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
