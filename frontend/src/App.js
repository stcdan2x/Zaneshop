import { BrowserRouter as Router, Route } from "react-router-dom";
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
import UserListScreen from "./screens/UserListScreen.js";
import UserEditScreen from "./screens/UserEditScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import OrderListScreen from "./screens/OrderListScreen.js";


const App = () => {

  return (
    <Router>
      <Header />
        <main className="py-2" >
          <Container>
              <Route path="/" component={HomeScreen} exact />
              <Route path="/search/:keyword" component={HomeScreen} exact />
              <Route path="/page/:pageNumber" component={HomeScreen} exact />
              <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />
              <Route path="/login" component={LoginScreen} />
              <Route path="/register" component={RegisterScreen} />
              <Route path="/profile" component={ProfileScreen} />
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/placeorder" component={PlaceorderScreen} />
              <Route path="/order/:id" component={OrderScreen} />
              <Route path="/admin/userlist" component={UserListScreen} exact/>
              <Route path="/admin/userlist/:pageNumber" component={UserListScreen} exact/>
              <Route path="/admin/user/:id/edit" component={UserEditScreen} />
              <Route path="/admin/productlist" component={ProductListScreen} exact/>
              <Route path="/admin/productlist/:pageNumber" component={ProductListScreen} exact/>
              <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
              <Route path="/admin/orderlist" component={OrderListScreen} exact/>
              <Route path="/admin/orderlist/:pageNumber" component={OrderListScreen} exact/>
          </Container>
        </main>
      <Footer />
    </Router>
  );

}

export default App;
