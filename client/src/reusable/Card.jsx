import Card from 'react-bootstrap/Card';
import { productImg } from "../assets"
import { useDispatch } from "react-redux"
import { addWishlist, removeFromWishlist, usersCart } from "../store/slice/UserSlice.js"
import Heart from "react-animated-heart";
import { useState } from 'react';
import "../css/card.css"
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify';

function CardBox({ product }) {
  const dispatch = useDispatch();
  console.log(product.isWhislist);
  const [isClick, setClick] = useState(product.isWhislist || false);
  const [rating, setRating] = useState(0)


  // Functions
  const handleWishlist = () => {
    // product.isWishList = !product.isWishList
    if (isClick) {
      toast.success("Removed from Wishlist")
      dispatch(removeFromWishlist(product.productId))
    } else {
      toast.success("Added to Wishlist")
      dispatch(addWishlist({ product }))
    }
    setClick(!isClick)
  }

  const handleRating = (rate) => {
    setRating(rate)
    console.log(rate);

    // other logicx 
  }
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)

  const handleAddToCart = () => {
    dispatch(usersCart({ product: { ...product, liked: isClick } }))
    toast.success("Added To Cart")
  }

  return (
    <Card style={{ width: '18rem', }} className='shadow position-relative'>
      <div className='overflow-hidden'>
        <Card.Img variant="top" src={productImg} alt='picture' className='card-img' />
      </div>
      <div className='position-absolute heart overflow-hidden'>
        <Heart isClick={isClick} onClick={handleWishlist} />
      </div>
      <Card.Body>
        <div className='card-title'>
          <h5>{product.productDesc}</h5>
        </div>
        <hr className='mb-1' />
        <div className='d-flex justify-content-between mb-2'>
          <p className='m-0' style={{ fontWeight: "500" }}>₹ {product.productPrice}</p>

          {/* Rating */}

          <Rating
            onClick={handleRating}
            onPointerEnter={onPointerEnter}
            onPointerLeave={onPointerLeave}
            onPointerMove={onPointerMove}
            /* Available Props */
            size="22"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button class="button-6" onClick={handleAddToCart}>Add To Cart</button>
          <button class="button-5">Buy Now</button>

          {/* <button className="button-64"><span className="text">Buy</span></button> */}
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardBox;
