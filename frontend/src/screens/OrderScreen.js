import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { ORDER_PAY_RESET } from "../constants/orderConstants.js";
import { PayPalButtons } from "@paypal/react-paypal-js";


const OrderScreen = (props) => {
   const orderId = props.match.params.id;

   const [sdkReady, setSdkReady] = useState(true);

   const dispatch = useDispatch();

   const orderDetails = useSelector(state => state.orderDetails);
   const { order, loading, error } = orderDetails;
   
   const orderPay = useSelector(state => state.orderPay);
   const { success:successPay, loading:loadingPay } = orderPay;

   const toUSD = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
   });

   if(!loading) {
      order.itemsPrice = order.orderItems.reduce((a, c) => a + (c.price * c.qty) , 0);
      order.shippingPrice = order.itemsPrice > 200 ? 0 : 50;
   }

   useEffect(() => {
      const addPayPalScript = async () => {
         const { data: clientId } = await axios.get("/api/config/paypal");
         const script = document.createElement("script");
         script.type = "type/javascript";
         script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
         script.async = true;
         script.onload = () => {setSdkReady(true)};
         document.body.appendChild(script);
      }

      if (!order || successPay ) {
         dispatch({ type: ORDER_PAY_RESET })
         dispatch(getOrderDetails(orderId))
      } else if (!order.isPaid) {
         if (!window.paypal) {
           addPayPalScript()
         } else {
           setSdkReady(true)
         }
      }
      }, [dispatch, orderId, successPay, order])

      
   const successPaymentHandler = (paymentResult) => {   
      dispatch(payOrder(orderId, paymentResult));
      alert("Transaction completed successfully");
   }
      

   /* const runOnApprove = (data, actions) => { actions.order.capture()
      .then(() => { 
         successPaymentHandler(data.orderID);
      }); } */

      return (
         loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
            <>
               <h1>Order # {order._id}</h1>
               <Row>
                  <Col md={8}>
                     <ListGroup variant="flush">
                        <ListGroupItem>
                           <h2>Shipping</h2>
                           <p> Name: {order.user.name}</p>
                           <p>Email: 
                           <a href={`mailto: ${order.user}`}>{order.user.email}</a>
                           </p>
                           <p>
                              <span className="field-label">Address:</span>
                              {order.shippingAddress.address},{" "}
                              {order.shippingAddress.city},{" "}
                              {order.shippingAddress.postalCode},{" "}
                              {order.shippingAddress.country}
                           </p>
                           {order.isDelivered ? <Message variant="success" >Delivered on {order.paidAt}</Message> :
                           <Message variant="danger" >Not yet Delivered</Message> }
                        </ListGroupItem>
                        <ListGroupItem>
                           <h2>Payment Method</h2>
                           <p>
                              <span className="field-label">Method:</span>
                              {order.paymentMethod}
                           </p>
                           {order.isPaid ? <Message variant="success" >Paid on {order.paidAt}</Message> :
                           <Message variant="danger" >Not yet Paid</Message> }
                        </ListGroupItem>

                        <ListGroupItem>
                           <h2>Order Items</h2>
                           {order.orderItems.length === 0
                           ? <Message>Your order is empty.</Message>
                           :
                           <ListGroup variant="flush" >
                              {order.orderItems.map((item, idx) => (
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
                                 <Col>{toUSD.format(order.itemsPrice)}</Col>
                              </Row>
                           </ListGroupItem>
                           <ListGroupItem>
                              <Row>
                                 <Col>Shipping</Col>
                                 <Col>{toUSD.format(order.shippingPrice)}</Col>
                              </Row>
                           </ListGroupItem>
                           <ListGroupItem>
                              <Row>
                                 <Col>Tax</Col>
                                 <Col>{toUSD.format(order.taxPrice)}</Col>
                              </Row>
                           </ListGroupItem>
                           <ListGroupItem>
                              <Row className="fw-bold fs-5 text-info">
                                 <Col>Total</Col>
                                 <Col>{toUSD.format(order.totalPrice)}</Col>
                              </Row>
                           </ListGroupItem>
                           {!order.isPaid && (
                              <ListGroup.Item>
                                 {loadingPay && <Loader />}
                                 {!sdkReady ? (
                                 <Loader />
                                 ) : (
                                 <PayPalButtons
                                    onApprove={(data, actions) => { actions.order.capture()
                                       .then( data => successPaymentHandler(data)); }}
                                    createOrder={(data, actions) => {
                                       return actions.order.create({
                                           purchase_units: [
                                               {
                                                   amount: {
                                                       value: (order.totalPrice).toFixed(2),
                                                   },
                                               },
                                           ],
                                           intent: "CAPTURE"
                                       });
                                   }}
                                 />
                                 )}
                              </ListGroup.Item>
                           )}
                        </ListGroup>
                     </Card>
                  </Col>
               </Row>
            </>
      );
};

export default OrderScreen;
