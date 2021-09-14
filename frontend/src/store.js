import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productUpdateReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from "./reducers/userReducers";
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderListUserReducer, orderPayReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailsReducer,
   productDelete: productDeleteReducer,
   productCreate: productCreateReducer,
   productUpdate: productUpdateReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   userUpdateProfile: userUpdateProfileReducer,
   userList: userListReducer,
   userDelete: userDeleteReducer,
   userUpdate: userUpdateReducer,
   orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderListUser: orderListUserReducer,
   orderList: orderListReducer,
   orderPay: orderPayReducer,
   orderDeliver: orderDeliverReducer
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