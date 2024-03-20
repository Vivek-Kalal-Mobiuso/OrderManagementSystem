import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getMyOrders } from '../api/customersApis';
import { setOrders } from '../store/slice/UserSlice';
import Lottie from 'lottie-react';
import loading from "../animations/loading.json"
import MyOrderCard from '../components/MyOrderCard';

const MyOrders = () => {
  // States
  const { user, token, myOrders } = useSelector((state) => state.users)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const getOrders = async () => {
    const orders = await getMyOrders(user.customerId, token);

    console.log(orders)
    dispatch(setOrders(orders))
  }
  useEffect(() => {
    if (!user) {
      toast.error("Please Login First")
      navigate("/auth")
    }
  }, [user, navigate])


  useEffect(() => {
    getOrders();
  }, [])

  return (
    <>
      {
        myOrders.length === 0 ?
          <div className="animation d-flex flex-column">
            <Lottie animationData={loading} loop={true} />
            <h1>Hang On...</h1>
          </div> :
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0 }}
            className='container border border-2 border-black border-opacity-50 rounded mt-2 p-3'
          >
            <div className='d-flex gap-2 flex-wrap justify-content-center'>
              {
                myOrders.map((order, i) => (
                  <MyOrderCard key={i} order={order} />
                ))
              }
            </div>
          </motion.div>
      }
    </>
  )
}

export default MyOrders