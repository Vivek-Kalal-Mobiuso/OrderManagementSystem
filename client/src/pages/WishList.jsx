import React from 'react'
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react';
import shopping from "../animations/Shopping.json"
import "../css/homepage.css"
import { Card } from '../reusable';
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router-dom';

const WishList = () => {

  const { wishlist } = useSelector((state) => state.users);
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <>
        <h1 className='text-center mt-5'>Oops! Nothing in Wishlist</h1>
        <div className='text-center'>
          <Lottie animationData={shopping} loop={true} style={{ height: "300px" }} />
          <Button className='text' onClick={() => navigate("/")}>Add Products to WishList </Button>
        </div>
      </>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      >
        <div className='container py-3 d-flex flex-wrap justify-content-lg-start justify-content-center gap-2 border border-2 border-opacity-50 rounded border-black mt-3'>
          {
            wishlist.map((product, i) => (
              <Card product={product} key={i} />
            ))
          }
        </div>
      </motion.div>
    </>
  )
}

export default WishList