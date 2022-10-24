import React from 'react'
import { useState, useEffect, useRef } from 'react'


const WithClickOutside = (WrappedComponent) => {
    const Component =(props)=>{
        const [open, setOpen] =useState(false);

        const ref = useRef();

        useEffect(()=>{
            const handleClickOutside =(event) => {
            if(!ref.current.contains(event.target)){
                setOpen(false);   
                         
            }
        };
        document.addEventListener("click", handleClickOutside);
        }, [ref]);
    
  return (
    <WrappedComponent open={open} setOpen={setOpen} ref={ref} {...props} />
  );
};
  return Component;
}
export default WithClickOutside;
