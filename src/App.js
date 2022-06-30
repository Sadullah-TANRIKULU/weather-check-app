import './App.css';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';

function App() {
  const key = '9c87b0059f285dd4ae40868308ff23ca';

  const [search, setSearch] = useState('');
  const [city, setCity] = useState();
  useEffect(() => {
    async function getWeather() {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=metric`);
        console.log(response);
        setCity(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getWeather();
  }, [search]);

  return (
    <div className="container">
      <input type="text" onKeyDown={(e) => setSearch(e.target.value)} />
      <br />
      {city && <h1>{city.main.temp} °C </h1>}
      {city && <h1>{city.name}</h1>}
      {city && <h1>{city.weather[0].main}</h1>}
    </div>
  );
}

export default App;
