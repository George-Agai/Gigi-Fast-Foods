import React, {useEffect, useRef} from 'react'
import lottie from 'lottie-web';
import phone from './images/phone.json';

const PhoneAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          animationData: phone,
          loop: true,
          autoplay: true,
        });
    
        return () => {
          anim.destroy();
        };
      }, []);
  return (
    <div ref={containerRef} className='phone-animation-div'></div>
  )
}

export default PhoneAnimation;