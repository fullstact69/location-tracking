import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

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

  // useEffect(() => {
  //   const watchId = navigator.geolocation.watchPosition(
  //     (position) => {
  //       setLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     },
  //     (err) => {
  //       setError(`Error: ${err.message}`);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       maximumAge: 10000,
  //       timeout: 5000,
  //     }
  //   );
  
  //   return () => navigator.geolocation.clearWatch(watchId); // cleanup
  // }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setTimestamp(new Date(position.timestamp).toLocaleTimeString());
      },
      (err) => {
        setError(`Error: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);
  
  return (
    <div className="App">
      <h1>Your Location</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Last updated: {timestamp}</p>
        </div>
      ) : (
        !error && <p>Loading location...</p>
      )}
    </div>
  );
}

export default App;
