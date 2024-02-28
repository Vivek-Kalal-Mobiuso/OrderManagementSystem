import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import successpayment from '../animations/PaymentSucessfull.json'
import celebration from '../animations/Celebration.json'
import "../css/sucess.css"
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from "react-router-dom"
import Lottie from 'lottie-react'

const Sucess = () => {
  const navigate = useNavigate()

  return (
    <Container className='d-flex justify-content-center align-items-center position-relative vh-100 '>
      <Lottie animationData={celebration} className='position-absolute bottom-0 w-100' loop="false"  />
      <div className='card p-2 sucess-card'>
        <div className=''>
          <header className=''>Payment Status</header>
        </div>
        <div className='success-ani'>
          <Lottie animationData={successpayment} loop={true} />
        </div>

        <p className='text-center'>Payment is done <br /> Sucessfully</p>

        <div className='text-center'>
          <Button variant='primary' onClick={() => navigate("/")} style={{ width: "150px" }} >Go Back</Button>
        </div>
      </div>
    </Container>
  )
}

export default Sucess