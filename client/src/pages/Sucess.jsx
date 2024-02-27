import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';

const Sucess = () => {
  // States
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    // console.log(user);
    // (async () => {
    // const stripe = await loadStripe('pk_test_51Oo3dGSAnATcUATRMBkPrMAe5YKersrDq1JyxYqLdaLLJPfpWR7jBVke3qNvEhpbjQxJ72bhOZfKGtUtvoRageX300zBcEvgTC');

    //   const { paymentIntent, error } = await stripe.confirmCardPayment('pk_test_51Oo3dGSAnATcUATRMBkPrMAe5YKersrDq1JyxYqLdaLLJPfpWR7jBVke3qNvEhpbjQxJ72bhOZfKGtUtvoRageX300zBcEvgTC');
    //   if (error) {
    //     // Handle error here
    //     console.log(error);
    //   } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    //     // Handle successful payment here
    //     console.log("Success");
    //   }
    // })();
  }, [])



  return (
    <div>Sucess</div>
  )
}

export default Sucess