import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Sucess = () => {
  // States
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    console.log(user);
  }, [])
  return (
    <div>Sucess</div>
  )
}

export default Sucess