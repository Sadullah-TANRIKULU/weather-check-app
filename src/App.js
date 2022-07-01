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
  const cityTemp = (city.main.temp).toFixed(1);

  const handleKeyDown = (e) => {
    e.keyCode === 13 && setSearch(e.target.value);
  }

  return (
    <div className="flex flex-col items-center h-screen bg-gray-200 ">
      <div className='flex flex-col items-center bg-amber-100 p-4 rounded-lg '  >
        <label className='font-semibold' >Set down a City Name and Press Enter <br /> to check Weather Stats </label>
        <input className='bg-red-200 ' type="text" onKeyDown={handleKeyDown} />
        {/* <button className='w-20 rounded-md bg-amber-400 mt-2' onSubmit={handleSubmit}  >Submit</button> */}
      </div>
      <br />
      {city && <h1 className='text-2xl' >{cityTemp} °C </h1>}
      {city && <h2 className='base' >{city.name}</h2>}
      {city && <h3 className='sm' > description: {city.weather[0].description}</h3>}
      {city && <h3 className='sm' >   longitude: {city.coord.lon} °, latitude: {city.coord.lat} °</h3>}
      {city && <h3 className='sm' >    humidity: {city.main.humidity} grams per cubic metre</h3>}
      {city && <h3 className='sm' >    pressure: {city.main.pressure} pascals</h3>}
      {city && <h3 className='sm' >  wind-speed: {city.wind.speed} km/h</h3>}

    </div>
  );
}

export default App;
