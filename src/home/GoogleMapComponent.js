import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import LocationGIF from './LocationGIF'
import DeliveryGIF from './DeliveryGIF'

const containerStyle = {
  width: '100vw',
  height: '45vh',
  borderBottomLeftRadius: '40px',
  borderBottomRightRadius: '40px'
};

const center = {
  lat: -1.197728,
  lng: 37.011456
};

const API_Key = "AIzaSyD7tlrR0YII9b4QBsc7WvswWTe5Ae1T8ck"

const GoogleMapComponent = () => {

  const [directionsResponse, setDirectionsResponse] = useState()
  const [distance, setDistance] = useState()
  const [duration, setDuration] = useState()
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          console.log('user location useEffect');
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);
  
  useEffect(() => {
    if (userLocation) {
      const findDirectionToCustomer = async () => {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: center,
          destination: userLocation,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING
        });
        setDirectionsResponse(results);
        setDistance(results.routes[0].legs[0].distance.text);
        setDuration(results.routes[0].legs[0].duration.text);
      };
  
      findDirectionToCustomer();
    }
  }, [userLocation]);
  
  console.log('user location boy', userLocation);
  

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
          <Marker position={userLocation} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse}/>}
        </GoogleMap>
      </div>
      <div className='location-and-delivery-time'>
        <p>< LocationGIF />&ensp;Gigi foods, Utawala</p>
        <p>< DeliveryGIF />{duration}&ensp; 5 minutes</p>
      </div>
    </div>
  ) : (
    <div>Loading Google Maps...</div>
  );
};

export default GoogleMapComponent;