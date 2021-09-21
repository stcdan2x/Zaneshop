import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl, Form, FormGroup, FormLabel } from "react-bootstrap";
import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createProductReview, listProductDetails } from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";


const ProductScreen = (props) => {
   const dispatch = useDispatch() ;
   
   const userLogin = useSelector(state => state.userLogin);
   const { userInfo } = userLogin;

   const productDetails = useSelector(state => state.productDetails);
   const { product, loading, error } = productDetails;

   const productCreateReview = useSelector(state => state.productCreateReview);
   const { loading:loadingCreateReview, error:errorCreateReview, success:successCreateReview} = productCreateReview;
   
   const [qty, setQty] = useState(1);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");

   useEffect(() => {
      if (successCreateReview) {
         alert("Review Submitted.");
         setRating(0);
         setComment("");
         dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      }
      dispatch(listProductDetails(props.match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });   
   }, [dispatch, props, successCreateReview]);

   const addToCartHandler = () => {
      setQty(1);
      props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
   }

   const reviewSubmitHandler = (e) => {
      e.preventDefault();
      dispatch(createProductReview(props.match.params.id, { rating, comment }));
   }

   return (
      <>
         <Link className="btn btn-light my-3" to="/">Go Back</Link>
         {loading ? <Loader /> : error ? <Message variant="danger" children={error} /> :
         (
            <>
            <Meta title={`${product.name}  |  SkyZen`}/>
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
               <Row>
                  <Col md={6} >
                     <h2>Reviews</h2>
                     {product.reviews.length === 0 && <Message>No reviews yet. </Message>}
                     <ListGroup variant="flush" >
                        {product.reviews.map(review => (
                           <ListGroupItem key={review._id}>
                              {review.name}
                              <Rating value={review.rating}/>
                              <p>{review.createdAt.substring(0, 10)}</p>
                              <p>{review.comment}</p>
                           </ListGroupItem>
                        ))}
                        <ListGroupItem>
                           <h2>Write a Customer Review</h2>
                           {successCreateReview && (<Message variant="success">Review submitted.</Message>)}
                           {loadingCreateReview && <Loader /> }
                           {errorCreateReview && <Message variant="danger">{errorCreateReview}</Message>}
                           {userInfo ? (
                              <Form onSubmit={reviewSubmitHandler}>
                                 <FormGroup controlId="rating">
                                    <FormLabel>Rating</FormLabel>
                                    <FormControl as="select" value={rating} onChange={e => setRating(e.target.value)}>
                                       <option value="">Select...</option>
                                       <option value="1">1 - Poor</option>
                                       <option value="2">2 - Fair</option>
                                       <option value="3">3 - Good</option>
                                       <option value="4">4 - Very Good</option>
                                       <option value="5">5 - Excellent</option>
                                    </FormControl>
                                 </FormGroup>
                                 <FormGroup>
                                    <FormLabel></FormLabel>
                                    <FormControl
                                       as="textarea" 
                                       ow="3" value={comment} 
                                       onChange={e => setComment(e.target.value)}
                                    ></FormControl>
                                 </FormGroup>
                                 <Button className="mt-4" type="submit" variant="primary">Submit</Button>
                              </Form>
                           ) : <Message>Please <Link to="/login"> sign-in </Link>
                           to write a review for this product.</Message>}
                        </ListGroupItem>
                     </ListGroup>
                  
                  </Col>
               </Row>
            </>
         )}
      </>
   );
};

export default ProductScreen;
