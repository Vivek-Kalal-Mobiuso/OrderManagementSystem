import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { productImg } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrderApi } from '../api/ordersApi';
import { toast } from 'react-toastify';
import { setOrders } from '../store/slice/UserSlice';

function MyOrderCard({ order }) {
  const { token, myOrders } = useSelector(state => state.users)
  const dispatch = useDispatch();

  const cancelOrder = async () => {
    const result = await cancelOrderApi(order.orderId, token);

    toast.success(result.message)
    dispatch(setOrders(myOrders.filter(
      orderListItem => orderListItem.orderId !== order.orderId
    )))
  }

  return (
    <Card style={{ width: '18.6rem' }} className='shadow'>
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
          <Button
            style={{ width: "100%" }}
            variant="danger"
            // onClick={cancelOrder}
          >
            Cancel Order
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyOrderCard;