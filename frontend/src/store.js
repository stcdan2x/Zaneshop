import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productListReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
   productList: productListReducer,
   productDetails: productDetailsReducer,
   cart: cartReducer
});

const storageCartItems = localStorage.getItem("cartItems") 
   ? JSON.parse(localStorage.getItem("cartItems"))
   : [];

const initialState = {
   cart: { cartItems: storageCartItems }
};

const middleware = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools( applyMiddleware( ...middleware ) )
);

export default store;