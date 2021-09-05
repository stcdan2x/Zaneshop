import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/userActions.js";
import FormContainer from "../components/FormContainer.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";


const LoginScreen = (props) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const dispatch = useDispatch()

const userLogin = useSelector(state => state.userLogin);
const { userInfo, loading, error } = userLogin;

const redirect = props.location.search ? props.location.search.split("=")[1] : "/";
const submitHandler = (e) => {
   e.preventDefault();
   dispatch(login(email, password))
}

useEffect(() => {
   if (userInfo) {
      props.history.push(redirect)
   }
}, [props.history, userInfo, redirect]);

   return (
      <FormContainer >
         <h1 className="pt-3" >Sign In</h1>
         {error && <Message variant="danger">{error}</Message>}
         {loading && <Loader />}
         <Form onSubmit={submitHandler} >
            <Form.Group controlId="email" className="py-2">
               <Form.Label>Email Address</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={ (e) => setEmail(e.target.value) }>
               </Form.Control>
            </Form.Group>
            <Form.Group controlId="password" className="py-2">
               <Form.Label>Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={ (e) => setPassword(e.target.value) }>
               </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3" >
               Sign In
            </Button>
         </Form>

         <Row className="py-3">
            <Col>
               New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"} >
               Register</Link>
            </Col>
         </Row>
      </FormContainer>
   )
}

export default LoginScreen;
