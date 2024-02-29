import React, { useEffect, useState } from 'react'
import Container from "react-bootstrap/Container"
import { useDispatch, useSelector } from "react-redux"
import CartItem from '../components/CartItem'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from "react-router-dom"
import Lottie from 'lottie-react'
import shopping from "../animations/Shopping.json"
import { toast } from 'react-toastify';
import { checkout, checkoutPay } from '../api/customersApis'
import { loadStripe } from '@stripe/stripe-js';
import { removeCartItems } from '../store/slice/UserSlice'

const MyCart = () => {
  const { cart, token, user } = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0);

  useEffect(() => {

  }, [cart])

  // Functions
  const handleCheckout = async () => {
    if (!token) {
      toast.error("Please login First")
      navigate("/auth")
    }
    // (!token) ? navigate("/auth") : navigate("/checkout")
    const { url } = await checkout(cart);

    window.location = url;
  }

  const makePayment = async () => {

    if (!token) {
      toast.error("Please login First")
      navigate("/auth")
    } else {

      const stripe = await loadStripe('pk_test_51Oo3dGSAnATcUATRMBkPrMAe5YKersrDq1JyxYqLdaLLJPfpWR7jBVke3qNvEhpbjQxJ72bhOZfKGtUtvoRageX300zBcEvgTC');

      const { session } = await checkoutPay(cart, user, token);

      const result = stripe.redirectToCheckout({
        sessionId: session.id
      })

      if (result.error) {
        console.log(result.error);
      }

      // (async () => {
      //   const { paymentIntent, error } = await stripe.confirmCardPayment('pk_test_51Oo3dGSAnATcUATRMBkPrMAe5YKersrDq1JyxYqLdaLLJPfpWR7jBVke3qNvEhpbjQxJ72bhOZfKGtUtvoRageX300zBcEvgTC');
      //   if (error) {
      //     // Handle error here
      //     console.log(error);
      //   } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      //     // Handle successful payment here
      //     console.log("Success");
      //   }
      // })();
    }

  }

  const handleRemove = () => {
    dispatch(removeCartItems())
  }

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
    // Check
    <Container className='p-4'>
      <div className='d-flex justify-content-end'>
        <Button
          variant='danger'
          onClick={handleRemove}
        >Remove all</Button>
      </div>
      <div className='border border-2 border-opacity-50 d-grid gap-2 border-dark mt-3 p-2 rounded'>
        {cart.map((item, i) => (
          <CartItem item={item} key={i} setTotal={setTotal} />
        ))}
      </div>
      {/* <div className='border border-2 border-opacity-50 p-2 mt-2'>
          <h2>Your Grand Total is : {total}</h2>
      </div> */}
      <div className='text-end d-flex justify-content-between align-items-center p-2 mt-2 border border-2'>
        <h1>Your Grand Total is : {total}</h1>
        {/* <Button variant='success' onClick={handleCheckout}>Checkout</Button> */}
        <Button variant='success'
          // onClick={makePayment} 
          style={{ width: "200px", height: "50px" }}>Checkout</Button>
      </div>
    </Container>
  )
}

export default MyCart
