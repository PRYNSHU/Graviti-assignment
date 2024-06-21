import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

const DistanceCalculator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [response, setResponse] = useState(null);

  const calculateRoute = () => {
    if (origin && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: waypoints.map(stop => ({ location: stop, stopover: true })),
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  };

  return (
    <LoadScript googleMapsApiKey="AlzaSyCZQdWZWsNyakL30EbvVherj04c9HcqFc8">
      <div className="distance-calculator-container">
        <div className="input-container">
          <input type="text" placeholder="Origin" value={origin} onChange={e => setOrigin(e.target.value)} />
          <input type="text" placeholder="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
          <button onClick={() => setWaypoints([...waypoints, ''])}>Add Stop</button>
          {waypoints.map((stop, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Stop ${index + 1}`}
              value={stop}
              onChange={e => {
                const newWaypoints = [...waypoints];
                newWaypoints[index] = e.target.value;
                setWaypoints(newWaypoints);
              }}
            />
          ))}
          <button onClick={calculateRoute}>Calculate</button>
        </div>
        <div className="map-container">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={4}>
            {response && <DirectionsRenderer directions={response} />}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
};

export default DistanceCalculator;
