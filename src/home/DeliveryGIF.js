import React, {useEffect, useRef} from 'react'
import lottie from 'lottie-web';
import delivery from './images/delivery.json';

const DeliveryGIF = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          animationData: delivery,
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

export default DeliveryGIF;