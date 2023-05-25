import React, {useEffect, useRef} from 'react'
import lottie from 'lottie-web';
import location from './images/location.json';

const LocationGIF = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          animationData: location,
          loop: true,
          autoplay: true,
        });
    
        return () => {
          anim.destroy();
        };
      }, []);
  return (
    <div ref={containerRef} className='location-gif-div'></div>
  )
}

export default LocationGIF;