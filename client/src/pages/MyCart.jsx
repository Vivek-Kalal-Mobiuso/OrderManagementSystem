import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/Container"
import { useSelector } from "react-redux"
import CartItem from '../components/CartItem'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from "react-router-dom"
import Lottie from 'lottie-react'
import shopping from "../animations/Shopping.json"
import { toast } from 'react-toastify';

const MyCart = () => {
  const { cart, token } = useSelector((state) => state.users)
  const navigate = useNavigate()
  const [total, setTotal] = useState(0);

  useEffect(() => {

  }, [cart])


  if (cart.length === 0) {
    return (
      <>
        <h1 className='text-center mt-5'>Oops! No products in Cart</h1>
        <div className='text-center'>
          <Lottie animationData={shopping} loop={true} style={{ height: "300px" }} />
          <Button className='text' onClick={() => navigate("/")}>Add Products to Cart </Button>
        </div>
      </>
    )
  }

  return (
    <Container className='p-4'>
      <div className='border border-2 border-opacity-50 d-grid gap-2 border-dark mt-3 p-2 rounded'>
        {cart.map((item, i) => (
          <CartItem item={item} key={i} setTotal={setTotal} />
        ))}
      </div>
      {/* <div className='border border-2 border-opacity-50 p-2 mt-2'>
          <h2>Your Grand Total is : {total}</h2>
      </div> */}
      <div className='text-end d-flex justify-content-between p-2 mt-2 border border-2'>
        <h1>Your Grand Total is : {total}</h1>
        <Button variant='success' onClick={() => {
          if(!token) {
            toast.error("Please login First")
          }
          (!token) ? navigate("/auth") : navigate("/checkout")
        }}>Checkout</Button>
      </div>
    </Container>
  )
}

export default MyCart
