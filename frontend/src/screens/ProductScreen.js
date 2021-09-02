import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl } from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";


const ProductScreen = (props) => {
   const dispatch = useDispatch() ;
   
   const productDetails = useSelector(state => state.productDetails);
   const { product, loading, error } = productDetails;

   useEffect(() => {
      dispatch( listProductDetails(props.match.params.id) )   
   }, [dispatch, props]);

   const [qty, setQty] = useState(1);

   const addToCartHandler = () => {
      setQty(1);
      props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
   }

   return (
      <>
         <Link className="btn btn-light my-3" to="/">Go Back</Link>
         {loading ? <Loader /> : error ? <Message variant="danger" children={error} /> :
         (
            <Row>
               <Col xs={18} sm={10} md={6}>
                  <Image src={product.image} alt={product.name} fluid />
               </Col>
               <Col xs={18} sm={10} md={3}>
                  <ListGroup variant="flush">
                     <ListGroupItem>
                        <h3>{product.name}</h3>
                     </ListGroupItem>
                     <ListGroupItem>
                        <Rating value={product.rating} text={`${product.numReviews}  reviews`} />
                     </ListGroupItem>
                     <ListGroupItem>Price: ${product.price}</ListGroupItem>
                     <ListGroupItem>Description: {product.description}</ListGroupItem>
                  </ListGroup>
               </Col>
               <Col xs={18} sm={10} md={3}>
                  <Card>
                     <ListGroup variant="flush">
                        <ListGroupItem>
                           <Row>
                              <Col>Price:</Col>
                              <Col>${product.price}</Col>
                           </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                           <Row>
                              <Col>Status:</Col>
                              <Col>
                                 {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                              </Col>
                           </Row>
                        </ListGroupItem>
                        {product.countInStock > 0 && (
                           <ListGroupItem>
                              <Row>
                                 <Col>Qty</Col>
                                 <Col>
                                    <FormControl as="select" value={ qty } onChange={
                                       (e) => setQty(e.target.value)}>
                                          {
                                             Array.from({length: product.countInStock}, (v, i) => i)
                                             .map(x => (<option key={x + 1} value={x + 1}>{ x + 1}</option>
                                             ))   
                                          }
                                    </FormControl>
                                 </Col>
                              </Row>
                           </ListGroupItem>
                        )}
                        <ListGroupItem className="d-grid">
                           <Button onClick={addToCartHandler} disabled={product.countInStock === 0} >
                              Add to Cart
                           </Button>
                        </ListGroupItem>
                     </ListGroup>
                  </Card>
               </Col>
            </Row>
         )}
      </>
   );
};

export default ProductScreen;
