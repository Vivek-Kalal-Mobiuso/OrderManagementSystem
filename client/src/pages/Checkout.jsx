import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const Checkout = () => {
  const { user, token } = useSelector((state) => state.users);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user || !token) {
      navigate("/")
    }
  }, [user, token])

  return (
    <div>Checkout</div>
  )
}

export default Checkout