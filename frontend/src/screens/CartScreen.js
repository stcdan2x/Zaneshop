import { useEffect } from "react";
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import Meta from "../components/Meta";


const CartScreen = (props) => {
   const productId = props.match.params.id;

   const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1

   const dispatch = useDispatch();

   const cart = useSelector(state => state.cart);
   const { cartItems } = cart;

   const removeFromCartHandler = (id) => {
      dispatch(removeFromCart(id));
   }

   const checkoutHandler = () => {
      props.history.push("/login?redirect=shipping")
   }

   useEffect( () => {
      if (productId) {
         dispatch(addToCart(productId, qty))
      }
   }, [dispatch, productId, qty]
   )

   return (
      <>
      <Meta title="My Shopping Cart | SkyZen"  />
      <Row>
         <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0
            ? ( <Message> Your cart is empty. Go Shopping
            <Link to="/">Go Back
            </Link>
            </Message>
            ) : (
               <ListGroup variant="flush" >
                  {cartItems.map(item => (
                     <ListGroupItem key={item.product}>
                        <Row>
                           <Col md={2}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                           </Col>
                           <Col md={3}>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                           </Col>
                           <Col md={2}>${item.price}</Col>
                           <Col md={2} >
                              <Form.Control as="select" value={item.qty} onChange={(e) =>
                                 dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {Array.from({length: item.countInStock}, (v, i) => i)
                                       .map(x => (
                                          <option key={x + 1} value={x + 1}  >
                                             {x + 1}
                                          </option>
                                       ))
                                    }
                              </Form.Control>
                           </Col>
                           <Col md={2}>
                              <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                 <i className="fas fa-trash"></i>
                              </Button>
                           </Col>
                        </Row>
                     </ListGroupItem>
                  ))}
               </ListGroup>
            )}
         </Col>
         <Col md={4}>
            <Card>
               <ListGroup variant="flush">
                  <ListGroupItem>
                     <h2>
                        Subtotal: ({cartItems.reduce(( a, c ) => a + c.qty, 0)}) items
                     </h2>
                     <h4>
                        ${cartItems.reduce(( a, c ) => a + c.qty * c.price, 0).toFixed(2)}
                     </h4>
                  </ListGroupItem>
                  <ListGroupItem className="d-grid" >
                     <Button disabled={cartItems.length === 0} onClick={checkoutHandler} >
                        Proceed to Checkout
                     </Button>
                  </ListGroupItem>
               </ListGroup>
            </Card>
         </Col>
      </Row>
      </>
   );
}

export default CartScreen;

