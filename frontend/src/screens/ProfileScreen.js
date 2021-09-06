import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateProfile } from "../actions/userActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants.js";


const ProfileScreen = (props) => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [rePassword, setRePassword] = useState("");
const [message, setMessage] = useState(null);

const dispatch = useDispatch();

const userDetails = useSelector(state => state.userDetails);
const { user, loading, error } = userDetails;

const userLogin = useSelector(state => state.userLogin);
const { userInfo } = userLogin;

const userUpdateProfile = useSelector(state => state.userUpdateProfile);
const { success, updateError } = userUpdateProfile;

const submitHandler = (e) => {
   e.preventDefault();
   if (password === rePassword) {
      dispatch(updateProfile({ id: user._id, name, email, password }));
   } else {
      setMessage("Passwords do not match!");
   }
};

useEffect(() => {
   if (!userInfo) {
      props.history.push("/login");
   } else {
      if(!user || !user.name || success) {
         dispatch({ type: USER_UPDATE_PROFILE_RESET });
         dispatch(getUserDetails("profile"));
      } else {
         setName(user.name);
         setEmail(user.email);
      }
   }
}, [props.history, dispatch, userInfo, user, success]);

   return <Row>
      <Col md={3}>
         <h2 className="pt-3" >User Profile</h2>
         {message && <Message variant="danger">{message}</Message>}
         {error && <Message variant="danger">{error}</Message>}
         {updateError && <Message variant="danger">Update Error: {updateError.split(":")[2]}</Message>}
         {success && <Message variant="success">Profile Updated!</Message>}
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
               Update
            </Button>
         </Form>
      </Col>

      <Col md={9}>
      </Col>
   </Row>
}

export default ProfileScreen;
