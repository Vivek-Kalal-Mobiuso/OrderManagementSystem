import React from 'react'
import { motion } from "framer-motion"

const WishList = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <div className='container py-3 border border-2 border-black mt-3'>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
        <h1>Hi</h1>
      </div>
    </motion.div>
  )
}

export default WishList