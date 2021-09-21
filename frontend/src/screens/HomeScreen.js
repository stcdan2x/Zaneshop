import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";


const HomeScreen = (props) => {
   const dispatch = useDispatch();

   const keyword = props.match.params.keyword;
   const pageNumber = props.match.params.pageNumber || 1;

   const productList = useSelector(state => state.productList);
   const { products, page, pages, loading, error } = productList;



   useEffect( () => {
      dispatch( listProducts(keyword, pageNumber) )
   }, [dispatch, keyword, pageNumber]);

   return (
      <>
         <Meta />
         {!keyword && <ProductCarousel className="pb-3" />}
         <h1>Latest Products</h1>
         {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
         (
            <>
               <Row>
                  {products.map( product => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <Product product={product} />
                     </Col>
                  ))}
               </Row>
               <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
            </>
         )}
      </>
   )
}

export default HomeScreen;
