import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web';
import { useNavigate } from 'react-router-dom'
import emptycart from './images/emptycart.json';
import { BiArrowBack } from 'react-icons/bi'


const EmptyCart = () => {
    const navigate = useNavigate()
    const containerRef = useRef(null);
    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            animationData: emptycart,
            loop: true,
            autoplay: true,
        });

        return () => {
            anim.destroy();
        };
    }, []);

    const HandleBackArrowClick = () => {
        navigate('/Home')
    }
    return (
        <div className='empty-cart-container'>
            <div className='Complete-order-back-arrow-div'><button onClick={HandleBackArrowClick} className='back-arrow-buttons'><BiArrowBack /></button></div>
            <h2 className='empty-cart-anaimation'>Empty cart</h2>
            <div ref={containerRef} className='empty-cart'>
            </div>
        </div>
    )
}
export default EmptyCart
