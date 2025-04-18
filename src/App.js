import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (!navigator.geolocation) {
  //     setError('Geolocation is not supported by your browser');
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       setLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     },
  //     (err) => {
  //       setError(`Error: ${err.message}`);
  //     }
  //   );
  // }, []);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(`Error: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      }
    );
  
    return () => navigator.geolocation.clearWatch(watchId); // cleanup
  }, []);
  
  return (
    <div className="App">
      <h1>Your Location</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location ? (
        <p>
          Latitude: {location.latitude} <br />
          Longitude: {location.longitude}
        </p>
      ) : (
        !error && <p>Loading location...</p>
      )}
    </div>
  );
}

export default App;
