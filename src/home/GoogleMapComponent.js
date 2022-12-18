import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const GoogleMapComponent = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GIGI_FAST_FOODS_API
  })
  console.log(process.env.REACT_APP_GIGI_FAST_FOODS_API)
  if(isLoaded) return <Map/>
  return <div>Not loaded</div>
}

function Map(){
  const center = {lat: 44, lng: -80};

  return(
    <div className='map-container'>
    <GoogleMap
      zoom={ 10 }
      center={ center }
    >
      <Marker position = { center }/>
    </GoogleMap>
    <p>Loaded</p>
    </div>
  )
}
export default GoogleMapComponent;