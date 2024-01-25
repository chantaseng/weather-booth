import { useState } from 'react';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const key = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      fetch(url).then((res) => {
        setData(res);
        console.log(res);
      });
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>Dallas</p>
          </div>
          <div className="temp">
            <h1>60&deg;C</h1>
          </div>
          <div className="description">
            <p>Cloud</p>
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            <p className="bold">65&deg;C</p>
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            <p className="bold">20%</p>
            <p>Humidity</p>
          </div>
          <div className="wind">
            <p className="bold">12 MPH</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
