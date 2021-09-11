import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import { orderCreateReducer, orderDetailsReducer, orderListUserReducer, orderPayReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailsReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   userUpdateProfile: userUpdateProfileReducer,
   orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderPay: orderPayReducer,
   orderListUser: orderListUserReducer
});

const storageCartItems = localStorage.getItem("cartItems") 
   ? JSON.parse(localStorage.getItem("cartItems"))
   : [];
const storageUserInfo = localStorage.getItem("userInfo") 
   ? JSON.parse(localStorage.getItem("userInfo"))
   : null;
const storageShippingAddress = localStorage.getItem("shippingAddress") 
   ? JSON.parse(localStorage.getItem("shippingAddress"))
   : {};
const storagePaymentMethod = localStorage.getItem("paymentMethod") 
   ? JSON.parse(localStorage.getItem("paymentMethod"))
   : "";

const initialState = {
   cart: {
      cartItems: storageCartItems,
      shippingAddress: storageShippingAddress,
      paymentMethod: storagePaymentMethod
   },
   userLogin: { userInfo: storageUserInfo },
   userRegister: {}
};

const middleware = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools( applyMiddleware( ...middleware ) )
);

export default store;