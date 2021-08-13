import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
} from '../constants/constants';


export const addToCart = (productId, qty) => async (dispatch, getState) => {
 
  const { dataUsed } = await Axios.get(`http://localhost:8080/api/products` + '/' + productId);
  const {
    cart: { cartItems },
  } = getState();
  if (cartItems.length < 0) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't Add Item To Cart. `,
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: dataUsed.productName,
        image: dataUsed.photo,
        price: dataUsed.price,
        countInStock: dataUsed.quantityInStock,
        product: dataUsed.id,
        seller: dataUsed.seller,
        qty,
      },
    });
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (dataUsed) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: dataUsed });
  localStorage.setItem('shippingAddress', JSON.stringify(dataUsed));
};
export const savePaymentMethod = (dataUsed) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: dataUsed });
};