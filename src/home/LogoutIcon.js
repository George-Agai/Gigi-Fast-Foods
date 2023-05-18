import React from 'react'
import { MdOutlineLogout } from 'react-icons/md'

const LogoutIcon = () => {

    const HandleLogoutButtonClicked =(e)=>{
        e.preventDefault()
        localStorage.removeItem('loginFlag')
        localStorage.removeItem('Login')
        localStorage.removeItem('adminLogin')
        window.location.reload();
    }
  return (
    <div><button id='logout-button' onClick={HandleLogoutButtonClicked}>Logout<MdOutlineLogout className='logout-icon'/></button></div>
  )
}
export default LogoutIcon;