import React, {useEffect, useRef} from 'react'
import lottie from 'lottie-web';
import loading from './images/loading.json';

const Loading = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          animationData: loading,
          loop: true,
          autoplay: true,
        });
    
        return () => {
          anim.destroy();
        };
      }, []);
  return (
    <div ref={containerRef} className='loading-animation-div'></div>
  )
}

export default Loading;