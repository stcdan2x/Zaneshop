import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'


const ProductListScreen = (props) => {
const dispatch = useDispatch();

const productList = useSelector(state => state.productList);
const { loading, error, products } = productList;

const userLogin = useSelector(state => state.userLogin);
const { userInfo } = userLogin;

const productDelete = useSelector(state => state.productDelete);
const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete;

const productCreate = useSelector(state => state.productCreate);
const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate;

const toUSD = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
   minimumFractionDigits: 2
});

useEffect(() => {
   if (!userInfo.isAdmin) {
      props.history.push("/login");
   }

   if (successCreate) {
      props.history.push(`/admin/product/${createdProduct._id}/edit`)
   }

   if(userInfo && userInfo.isAdmin){
      dispatch(listProducts())
   } else {
      props.history.push("/login")
   }
}, [dispatch, props.history, userInfo, successDelete, successCreate, createdProduct])

const deleteHandler = (id, name) => {
   if (window.confirm(`User ${name} will be deleted from the database. This action cannot be undone. Continue?`)) {
      dispatch(deleteProduct(id));
   }
}

const createProductHandler = () => {
   dispatch(createProduct());
}


   return (
      <>
         <Row className="align-items-center" >
            <Col>
               <h1>Products</h1>
            </Col>
            <Col className="text-end" >
               <Button className="my-3" onClick={createProductHandler} >
                  <i className="fas fa-plus" ></i> Add Product
               </Button>
            </Col>
         </Row>
         {loadingCreate && <Loader />}
         {errorCreate && <Message variant="danger">{errorCreate}</Message>}
         {loadingDelete && <Loader />}
         {errorDelete && <Message variant="danger">{errorDelete}</Message>}
         {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
         (
            <Table striped bordered hover responsive className="table-sm">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>NAME</th>
                     <th>PRICE</th>
                     <th>CATEGORY</th>
                     <th>STOCK COUNT</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {products.map(product => (
                     <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{toUSD.format(product.price)}</td>
                        <td>{product.category}</td>
                        <td>{product.countInStock}</td>
                        <td>
                        <LinkContainer to={`/admin/product/${product._id}/edit`} >
                           <Button variant="light" className="btn-sm">
                              <i className="ss fas fa-pencil-alt"></i>
                           </Button>
                        </LinkContainer>
                        <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id, product.name)}>
                           <i className="ss fas fa-trash"></i>
                        </Button>
                        </td>
                     </tr>
                  )
                  )}
               </tbody>
            </Table>
         )}
         
      </>
   )
}

export default ProductListScreen;