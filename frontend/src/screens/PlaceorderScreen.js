import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import Message from "../components/Message.js";

const PlaceorderScreen = (props) => {
const dispatch = useDispatch();

const cart = useSelector(state => state.cart);


const toUSD = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
   minimumFractionDigits: 2
 });

cart.itemsPrice = cart.cartItems.reduce((a, c) => a + (c.price * c.qty) , 0);
cart.taxPrice = 0.15 * cart.itemsPrice;
cart.shippingPrice = cart.itemsPrice > 200 ? 0 : 50;
cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

const orderCreate = useSelector(state => state.orderCreate);
const { order, success, error } = orderCreate;

useEffect(() => {
  if(success) {
     props.history.push(`/order/${order._id}`)
  }

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [props.history, success])

const placeOrderHandler = () => {
   dispatch(
      createOrder({
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cart.itemsPrice,
      taxPrice: cart.taxPrice,
      shippingPrice: cart.shippingPrice,
      totalPrice: cart.totalPrice
      })
   );
};

   return (
      <>
         <CheckoutSteps step1 step2 step3 step4/>
         <Row>
            <Col md={8}>
               <ListGroup variant="flush">
                  <ListGroupItem>
                     <h2>Shipping</h2>
                     <p>
                        <span className="field-label">Address:</span>
                        {cart.shippingAddress.address},{" "}
                        {cart.shippingAddress.city},{" "}
                        {cart.shippingAddress.postalCode},{" "}
                        {cart.shippingAddress.country}
                     </p>
                  </ListGroupItem>
                  <ListGroupItem>
                     <h2>Payment Method</h2>
                     <span className="field-label">Method:</span>
                     {cart.paymentMethod}
                  </ListGroupItem>

                  <ListGroupItem>
                     <h2>Order Items</h2>
                     {cart.cartItems.length === 0
                     ? <Message>Your shopping cart is empty.</Message>
                     :
                     <ListGroup variant="flush" >
                        {cart.cartItems.map((item, idx) => (
                           <ListGroupItem key={idx}>
                              <Row>
                                 <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                 </Col>
                                 <Col>
                                    <Link to={`/product/${item.product}`}>
                                       {item.name}
                                    </Link>
                                 </Col>
                                 <Col>
                                    {item.qty}{" "} x {" "}{toUSD.format(item.price)}{" "} = {" "}{toUSD.format(item.qty * item.price)}
                                 </Col>
                              </Row>
                           </ListGroupItem>
                        ))}
                     </ListGroup>
                     }
                  </ListGroupItem>
               </ListGroup>
            </Col>
            <Col md={4}>
               <Card>
                  <ListGroup variant="flush">
                     <ListGroupItem>
                        <h2>Order Summary</h2>
                     </ListGroupItem>
                     <ListGroupItem>
                        <Row>
                           <Col>Items</Col>
                           <Col>{toUSD.format(cart.itemsPrice)}</Col>
                        </Row>
                     </ListGroupItem>
                     <ListGroupItem>
                        <Row>
                           <Col>Shipping</Col>
                           <Col>{toUSD.format(cart.shippingPrice)}</Col>
                        </Row>
                     </ListGroupItem>
                     <ListGroupItem>
                        <Row>
                           <Col>Tax</Col>
                           <Col>{toUSD.format(cart.taxPrice)}</Col>
                        </Row>
                     </ListGroupItem>
                     <ListGroupItem>
                        <Row className="fw-bold fs-5 text-info">
                           <Col>Total</Col>
                           <Col>{toUSD.format(cart.totalPrice)}</Col>
                        </Row>
                     </ListGroupItem>
                     <ListGroupItem>
                        {error && <Message variant="danger">Error: {error}</Message>}
                     </ListGroupItem>
                     <ListGroupItem className="d-grid">
                        <Button disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}>Place Order</Button>
                     </ListGroupItem>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default PlaceorderScreen;
