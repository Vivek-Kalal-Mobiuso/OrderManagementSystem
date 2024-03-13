import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import "../css/account.css"

const Account = () => {
  const [url, setUrl] = useState("profile")
  const location = useLocation(); // once ready it returns the 'window.location' object

  useEffect(() => {
    setUrl(location.pathname)
  }, [location])

  return (
    <div className='container p-2 mt-2'>
      <div className='d-flex shadow justify-content-center gap-md-5 gap-2 border border-2 p-2 nav-container'>
        <Link to="/account" className={`px-md-4 py-md-2 py-1 px-3 account-links ${(url === "/account") ? "account-active" : ""}`}>
          Profile
        </Link>
        <Link to="/account/wishlist" className={`px-md-4 py-md-2 py-1 px-3 account-links ${(url === "/account/wishlist") ? "account-active" : ""}`}>
          Wishlist
        </Link>
        <Link to="/account/tp" className={`px-md-4 py-md-2 py-1 px-3 account-links ${(url === "/account/tp") ? "account-active" : ""}`}>
          Profile
        </Link>
      </div>

      <Outlet />
    </div>
  )
}

export default Account