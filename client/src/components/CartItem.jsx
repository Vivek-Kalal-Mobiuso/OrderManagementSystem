import React, { useEffect, useState } from 'react'
import "../css/cartItem.css"
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { removeFromCart } from "../store/slice/UserSlice"

const CartItem = ({ item, setTotal }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        // setTotal(prev => prev + qty * Number(item.productPrice))
    }, [qty])
    return (
        <div className='container border border-2 border-dark d-flex p-2 justify-content-between align-items-center rounded'>
            <p className='cart-item-name border border-2 my-0'>{item.productDesc}</p>
            <p className='cart-item-price my-0 total-p'>₹ {Number(item.productPrice)}</p>
            <div className='d-flex gap-2 align-items-center'>
                <p className='cart-item-price border border-2 my-0 py-2 px-1 total-p'>{qty}</p>
                <div className='d-flex flex-column'>
                    <button
                        className='p-0 total-p bg-primary rounded'
                        onClick={() => {
                            setQty(prev => (prev >= item.productQtyAvailable) ? prev : prev + 1)
                            setTotal(prev => prev + Number(item.productPrice))
                        }}
                    >
                        +
                    </button>
                    <button
                        className='p-0 total-p bg-danger px-2 mt-1 rounded'
                        onClick={() => {
                            setQty(prev => (prev === 1) ? 0 : prev - 1)
                            // (qty > 0 && setTotal(prev => prev - Number(item.productPrice)))
                        }}
                    >
                        -
                    </button>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <p className='my-0 total-p'>Total</p>
                <p className='my-0'>₹ {qty * Number(item.productPrice)}</p>
            </div>
            <Button variant='danger' onClick={() => dispatch(removeFromCart({ productId: item.productId }))}>Remove Item</Button>
        </div>
    )
}

export default CartItem