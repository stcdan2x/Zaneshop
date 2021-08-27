import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import Rating from "./Rating";
import { useEffect, useState } from "react";
import axios from "axios";


const ProductScreen = (props) => {
   const [product, setProduct] = useState({});

   useEffect(() => {
      const fetchProductData = async () => {
         const res = await axios.get(`/api/products/${props.match.params.id}`);
      setProduct(res.data);
      }
      fetchProductData();   
   }, [props.match])

   /* const product = products.find(x => x._id === props.match.params.id)
   console.log(product); */
   return (
      <>
         <Link className="btn btn-light my-3" to="/">Go Back</Link>
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
                     <ListGroupItem className="d-grid">
                        <Button disabled={product.countInStock === 0} >
                           Add to Cart
                        </Button>
                     </ListGroupItem>
                  </ListGroup>
               </Card>
            </Col>
         </Row>
      </>
   );
};

export default ProductScreen;
