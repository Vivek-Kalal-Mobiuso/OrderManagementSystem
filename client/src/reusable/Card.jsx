import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { productImg } from "../assets"
import { useDispatch } from "react-redux"
import { usersCart } from "../store/slice/UserSlice.js"


function CardBox({ product }) {
  const dispatch = useDispatch();

  return (
    <Card style={{ width: '18rem', }}>
      <Card.Img variant="top" src={productImg} alt='picture' />
      <Card.Body>
        <Card.Title>{product.productDesc}</Card.Title>
        <hr />
        <Card.Text>₹ {product.productPrice}</Card.Text>
        <div className="d-flex justify-content-around">
          <Button variant="primary" className=''>Buy</Button>
          <Button variant="success" onClick={() => dispatch(usersCart({ product }))}>Add To Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardBox;