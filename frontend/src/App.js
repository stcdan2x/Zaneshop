import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import CartScreen from "./screens/CartScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceorderScreen from "./screens/PlaceorderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {

const [paypalClientId, setPaypalClientId] = useState("")

const getClientID = async () => {
  const res = await axios.get('/api/config/paypal');
  setPaypalClientId(res.data.clientID)
}
 
useEffect(() => { 
  if (paypalClientId) {
    getClientID()
    console.log(paypalClientId);
  }
}, [paypalClientId])

  return (
    <Router>
      <Header />
        <main className="py-2" >
            <Container>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceorderScreen} />
          <PayPalScriptProvider options={{"client-id": paypalClientId}}>
              <Route path="/order/:id" component={OrderScreen} />
          </PayPalScriptProvider>
            </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
