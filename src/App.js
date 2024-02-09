import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('metric');
  const [userInput, setUserInput] = useState('');
  // let { location } = useParams();

  const key = process.env.REACT_APP_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=${unit}`;

  const searchLocation = (e) => {
    if (e.key === 'Enter') {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          console.log(data);
        });
      setUserInput(location);
      setLocation('');
      console.log(location);
      console.log(userInput);
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    console.log(location);
    // console.log(userInput);

    const unitUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${key}&units=${unit}`;
    fetch(unitUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };

  // const farenheitToCelsius = (temp) => (((temp - 32) * 5) / 9).toFixed();

  // const celsiusToFarenheit = (temp) => (temp * 1.8 + 32).toFixed();

  // const convertTemp = (temp) => {
  //   return unit === 'metric' ? temp.toFixed() : (temp * 1.8 + 32).toFixed();
  // };

  // const convertTempToFarenheit = (temp) => {
  //   return unit === 'metric' ? temp.toFixed() : (temp * 1.8 + 32).toFixed();
  // };

  // const convertTempToCelsius = (temp) => {
  //   return unit === 'imperial'
  //     ? temp.toFixed()
  //     : (((temp - 32) * 5) / 9).toFixed();
  // };

  const convertFeelsLike = (temp) => {
    return unit === 'metric' ? temp.toFixed() : (temp * 1.8 + 32).toFixed();
  };

  const convertSpeed = (speed) => {
    return unit === 'metric' ? speed : (speed * 2.23694).toFixed(2);
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
          &deg;{unit === 'metric' ? 'F' : 'C'}
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
                {data.main.temp.toFixed()}
                {/* {convertTemp(data.main.temp)} */}
                {/* {unit === 'metric'
                  ? convertTempToFarenheit(data.main.temp)
                  : convertTempToCelsius(data.main.temp)} */}
                &deg;{unit === 'metric' ? 'C' : 'F'}
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
                  {convertFeelsLike(data.main.feels_like)}&deg;
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
                <p className="bold">
                  {convertSpeed(data.wind.speed)}{' '}
                  {unit === 'metric' ? 'M/S' : 'MPH'}
                </p>
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
