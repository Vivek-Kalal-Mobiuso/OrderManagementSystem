import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { productImg } from '../assets';

function MyOrderCard({ order }) {
  return (
    <Card style={{ width: '18.6rem' }}>
      <Card.Img variant="top" src={productImg} />
      <Card.Body>
        <p className='mt-0' style={{ height: "75px", fontSize: "1.2em", letterSpacing: "1px" }}>
          {order.productName} <br />Order Id :{order.orderId}
        </p>
        <hr />
        <div className='d-flex gap-1'>
          <div className='d-flex'>
            <p style={{ fontSize: "16px" }}>Placed on <br />{order.orderDate.substring(0, 10)}</p>
          </div>
          <div style={{ height: "50px", border: "1px solid rgba(0,0,0,0.4)" }} />
          <div className='d-flex text-center'>
            <p style={{ fontSize: "16px" }}>Quantity <br /> {order.productQauntity}</p>
          </div>
          <div style={{ height: "50px", border: "1px solid rgba(0,0,0,0.4)" }} />
          <div className='d-flex text-center'>
            <p style={{ fontSize: "16px" }}>Order Status<br /> {order.orderStatus}</p>
          </div>
        </div>
        <div>
          <Button style={{ width: "100%" }} variant="danger">Cancel Order</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyOrderCard;