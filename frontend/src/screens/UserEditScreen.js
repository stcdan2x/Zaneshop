import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";




const UserEditScreen = (props) => {
   const userId = props.match.params.id

   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isAdmin, setIsAdmin] = useState(false);

   const dispatch = useDispatch();

   
   const userDetails = useSelector(state => state.userDetails);
   const { user, loading, error } = userDetails;
   
   const userUpdate = useSelector(state => state.userUpdate);
   const { loading:loadingUpdate, success:successUpdate, error:errorUpdate } = userUpdate;


   
   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: USER_UPDATE_RESET })
         props.history.push("/admin/userlist")
      } else {
         if (!user.name || user._id !== userId ) {
            dispatch(getUserDetails(userId))
         } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
            setPassword(user.password)
         }
      }
   }, [dispatch, userId, user, props.history, successUpdate]);
   
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateUser({ _id: userId, name, email, isAdmin, password }))
   };
   
      return (
         <>
            <Link to="/admin/userlist" className="btn btn-light my-3" >Go Back</Link>
         <FormContainer >
            <h1 className="pt-3" >Edit User</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
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
                  <Form.Label>Change Password</Form.Label>
                  <Form.Control
                     type="password"
                     placeholder="Enter password"
                     value={password}
                     onChange={ (e) => setPassword(e.target.value) }>
                  </Form.Control>
               </Form.Group>
               <Form.Group controlId="isadmin" className="py-2">
                  <Form.Check
                     type="checkbox"
                     label="Admin Access"
                     checked={isAdmin}
                     onChange={ (e) => setIsAdmin(e.target.checked) }>
                  </Form.Check>
               </Form.Group>
   
               <Button type="submit" variant="primary" className="mt-3" >
                  Update
               </Button>
            </Form>
            )}
         </FormContainer>
      </>

      )
   }

export default UserEditScreen;