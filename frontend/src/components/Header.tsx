import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCommerceStore } from "../store";
import { DiVim } from 'react-icons/di';

function Header() {
  const {
    userName,
    token,
    setToken,
    setShowCart,
    setStoreId
  } = useCommerceStore()
  
  const [showProfile, setShowProfile] = useState(false)

  // TODO extract from token if it exists in global state
  const name = 'Name'


  // TODO
  return (
    // logo
    // nav+user menu
    <div className="header flex justify-between items-center px-6 py-4">
        <img width={110} src="/blackLogo.svg" alt="Ecommerce store logo" />
      <div className="nav flex gap-4 items-center min-h-10">
        <Link to="/home">Home</Link>
        <Link to="/sell">Sell</Link>
        <Link to="/my-orders">My Orders</Link>
        <CiShoppingCart onClick={()=>setShowCart(true)} size={25} className="m-0 p-0 cursor-pointer"/>
        <div className="flex items-center gap-4 relative">
          {name}
          <div className="rounded-full h-full bg-[var(--accent-color)] p-2">
          <img width={20} onClick={()=>setShowProfile(!showProfile)} src="/profile.png" alt="User Menu" />
          </div>
    {showProfile && <div className='absolute cursor-pointer border px-1 -bottom-7 right-0 border-gray-300 bg-gray-300 shadow-lg'  onClick={async()=>{await setToken('');await setStoreId(''); console.log(token); setShowProfile(false) }} >logout</div> }
        </div>
      </div>
    </div> 
      //todo fix logout as a dropdown menu
  )
}

export default Header