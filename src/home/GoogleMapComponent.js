import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';




const containerStyle = {
  width: '100vw',
  height: '35vh',
  borderBottomLeftRadius: '40px',
  borderBottomRightRadius: '40px'
};

const center = {
  lat: -1.097728,
  lng: 37.011456
};

const API_Key = "AIzaSyD7tlrR0YII9b4QBsc7WvswWTe5Ae1T8ck"

const GoogleMapComponent = () => {
  // const [userLocation, setUserLocation] = useState(null);

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation({ lat: latitude, lng: longitude });
  //       },
  //       (error) => {
  //         console.error('Error getting user location:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }, []);

  const [directionsResponse, setDirectionsResponse] = useState()
  const [distance, setDistance] = useState()
  const [duration, setDuration] = useState()

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_Key
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return isLoaded ? (
    <div className='google-map-component'>
      <div className='map-container'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false }}
        >
          <Marker position={center} />
        </GoogleMap>
      </div>
      <div className='location-and-delivery-time'>
        <p>Location</p>
        <p>Delivery Time</p>
      </div>
    </div>
  ) : (
    <div>Loading Google Maps...</div>
  );
};

export default GoogleMapComponent;