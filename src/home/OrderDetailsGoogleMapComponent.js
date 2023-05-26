import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import LocationGIF from './LocationGIF'
import DeliveryGIF from './DeliveryGIF'
import { AiOutlineCopy } from 'react-icons/ai';

const containerStyle = {
    width: '100vw',
    height: '45vh',
    borderBottomLeftRadius: '50px',
    borderBottomRightRadius: '50px'
};

const center = {
    lat: -1.197728,
    lng: 37.011456
};

const API_Key = "AIzaSyD7tlrR0YII9b4QBsc7WvswWTe5Ae1T8ck"

const OrderDetailsGoogleMapComponent = ({ userLocation, contact }) => {

    const [directionsResponse, setDirectionsResponse] = useState()
    const [distance, setDistance] = useState()
    const [duration, setDuration] = useState()


    const textToCopy = document.getElementById('textToCopy');

    const HandleCopyPhoneNumber= () => {
        // Select the text to copy
        const range = document.createRange();
        range.selectNode(textToCopy);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        // Copy the selected text to the clipboard
        document.execCommand('copy');

        // Clear the selection
        window.getSelection().removeAllRanges();

        // Optionally, provide visual feedback or notify the user
        textToCopy.style.color = 'brown';
        // setTimeout(() => {
        //     textToCopy.style.color = '';
        // }, 1000);
    }


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
                    {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                </GoogleMap>
            </div>
            <div className='location-and-delivery-time'>
                <p>< LocationGIF />&ensp; {distance}</p>
                <p>< DeliveryGIF />&ensp; {duration}</p>
                <p id='contact-copy-div' onClick={HandleCopyPhoneNumber}><span id='textToCopy'>{contact}</span>&ensp;<AiOutlineCopy /></p>
            </div>
        </div>
    ) : (
        <div>Loading Google Maps...</div>
    );
};

export default OrderDetailsGoogleMapComponent;