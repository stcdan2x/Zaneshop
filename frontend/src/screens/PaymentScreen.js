import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions.js";
import CheckoutSteps from "../components/CheckoutSteps.js";
import FormContainer from "../components/FormContainer.js";


const PaymentScreen = (props) => {
   const cart = useSelector( state => state.cart);
   const { shippingAddress } = cart;

   if(!shippingAddress) {
      props.history.push("/shipping")
   }

   const [paymentMethod, setPaymentMethod] = useState("PayPal")

   const dispatch = useDispatch();

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      props.history.push("/placeorder");
   }

   return <FormContainer>

      <CheckoutSteps step1 step2 step3/>
      <h1 className="my-3" >Payment Method</h1>
      <Form onSubmit={submitHandler}>
         <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
            <Form.Check
               type="radio"
               label="PayPal or Credit Card"
               id="paypal"
               name="paymentMethod"
               value="PayPal"
               defaultChecked
               onClick={(e) => setPaymentMethod(e.target.value)}         
            ></Form.Check>
            <Form.Check
               type="radio"
               label="GCash"
               id="gcash"
               name="paymentMethod"
               value="GCash"
               onClick={(e) => setPaymentMethod(e.target.value)}      
            ></Form.Check>
            </Col>
         </Form.Group>
         <Button type="submit" variant="primary" className="my-3" >
            Continue
         </Button>
      </Form>

   </FormContainer>
}

export default PaymentScreen;
