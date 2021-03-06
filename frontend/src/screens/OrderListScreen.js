import { useEffect } from 'react'
import { Table, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAllOrders } from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'
import Meta from '../components/Meta'


const OrderListScreen = (props) => {
const dispatch = useDispatch();

const orderList = useSelector(state => state.orderList);
const { loading, error, orders} = orderList;

const userLogin = useSelector(state => state.userLogin);
const { userInfo } = userLogin;

const toUSD = new Intl.NumberFormat('en-US', {
   style: 'currency',
   currency: 'USD',
   minimumFractionDigits: 2
});

useEffect(() => {
   if(userInfo && userInfo.isAdmin){
      dispatch(listAllOrders())
   } else {
      props.history.push("/login")
   }
}, [dispatch, props.history, userInfo])


   return (
      <>
      <Meta title={"Orders List | Admin | SkyZen"}  />
         <Row className="align-items-center" >
            <Col>
               <h1>Orders</h1>
            </Col>
         </Row>
         {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
         (
            <Table striped bordered hover responsive className="table-sm">
               <thead>
                  <tr>
                     <th>ID</th>
                     <th>USER</th>
                     <th>DATE</th>
                     <th>TOTAL</th>
                     <th>PAID</th>
                     <th>DELIVERED</th>
                     <th></th>
                  </tr>
               </thead>
               <tbody>
                  {orders.map(order => (
                     <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{toUSD.format(order.totalPrice)}</td>
                        <td>{order.isPaid ? (order.paidAt.substring(0, 10)) :
                           ( <i className="fas fa-times" style={{ color: "red" }}></i> )}
                        </td>
                        <td>{order.isDelivered? (order.deliveredAt.substring(0, 10)) : 
                           (<i className="fas fa-times" style={{ color: "red" }}></i>)}
                        </td>
                        <td>
                           <LinkContainer to={`/order/${order._id}`}>
                              <Button variant='light' className='btn-sm'>
                                 Details
                              </Button>
                           </LinkContainer>
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

export default OrderListScreen;
