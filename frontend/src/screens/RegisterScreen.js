import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions.js";
import FormContainer from "../components/FormContainer.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";


const RegisterScreen = (props) => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rePassword, setRePassword] = useState("");
const [message, setMessage] = useState(null);

const dispatch = useDispatch();

const userRegister = useSelector(state => state.userRegister);
const { userInfo, loading, error } = userRegister;

const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

const submitHandler = (e) => {
   e.preventDefault();
   if (password !== rePassword) {
      setMessage("Passwords do not match!");
   }
   dispatch(register(name, email, password, rePassword));
};

useEffect(() => {
   if (userInfo) {
      props.history.push(redirect)
   }
}, [props.history, userInfo, redirect]);

   return (
      <FormContainer >
         <h1 className="pt-3" >Sign Up</h1>
         {message && <Message variant="danger">{message}</Message>}
         {error && <Message variant="danger">{error}</Message>}
         {loading && <Loader />}
         <Form onSubmit={submitHandler} >
            <Form.Group controlId="name" className="py-2">
               <Form.Label>Name</Form.Label>
               <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={ (e) => setName(e.target.value) }>
               </Form.Control>
            </Form.Group>
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
               <Form.Label>Create Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={ (e) => setPassword(e.target.value) }>
               </Form.Control>
            </Form.Group>
            <Form.Group controlId="rePassword" className="py-2">
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={rePassword}
                  onChange={ (e) => setRePassword(e.target.value) }>
               </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3" >
               Register
            </Button>
         </Form>

         <Row className="py-3">
            <Col>
               Have an Account? {" "} <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} >
               Login</Link>
            </Col>
         </Row>
      </FormContainer>
   )
}

export default RegisterScreen;
