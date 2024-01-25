function App() {
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=montreal&appid=9535538658a6fb5ee78f3037d4843bea`;

  return (
    <div className="app">
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
            <p>65&deg;C</p>
          </div>
          <div className="humidity">
            <p>20%</p>
          </div>
          <div className="wind">
            <p>12 MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
