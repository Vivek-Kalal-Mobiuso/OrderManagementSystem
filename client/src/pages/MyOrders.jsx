import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const MyOrders = () => {

  const { user } = useSelector((state) => state.users)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please Login First")
      navigate("/auth")
    }
  }, [user, navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      MyOrders
    </motion.div>
  )
}

export default MyOrders