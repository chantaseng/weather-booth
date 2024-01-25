import { useState } from 'react';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric');

  const key = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=${unit}`;

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        <p className="button" onClick={toggleUnit}>
          &deg;{unit === 'metric' ? 'C' : 'F'}
        </p>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data?.main && (
              <h1>
                {data.main.temp.toFixed()}&deg;{unit === 'metric' ? 'C' : 'F'}
              </h1>
            )}
          </div>
          <div className="description">
            {data?.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data?.main && (
                <p className="bold">
                  {data.main.feels_like.toFixed()}&deg;
                  {unit === 'metric' ? 'C' : 'F'}
                </p>
              )}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data?.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data?.wind && (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              )}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
