import { useEffect } from "react";
import { Carousel, CarouselItem, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { listTopProducts } from "../actions/productActions";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = () => {
   const dispatch = useDispatch();

   const productTop = useSelector(state => state.productTop);
   const { loading, error, products } = productTop;

   useEffect(() => {
      dispatch(listTopProducts())
   }, [dispatch])

   return loading ? <Loader /> : error ? <Message variant="danger" >{error}</Message> :
   (
      <Carousel pause='hover' className='bg-dark' >
         {products.map((product) => (
            <CarouselItem key={product._id} >
               <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className="carousel-caption" >
                     <h2>{product.name} (${product.price})</h2>
                  </Carousel.Caption>
               </Link>
            </CarouselItem>
         ))}

      </Carousel>
   );
};

export default ProductCarousel;