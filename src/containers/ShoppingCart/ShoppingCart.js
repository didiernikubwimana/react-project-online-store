import store from "../../store/store";
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { APIConfig } from '../../store/API-Config';
import { Link } from 'react-router-dom';
export default function ShoppingCart(props) {
    console.log(props.location.pathname);
    const productId = props.location.pathname
    ? Number(props.location.pathname.split('/')[2])
    : 1;
    console.log(productId);
    const APIs = useContext(APIConfig);
    const productAPI = APIs.productAPI;
    const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState([]);
    
    const dispatch = useDispatch();
    const state = store.getState();
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + state.oAuthToken,
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(productAPI + '/' + productId);
                setProduct(data);
                console.log("success 1");
                console.log(product.price);
                console.log("Success data");
              } catch (err) {
                console.log(err);
              }
            };
            fetchData();
          }, []);

      const removeFromCartHandler = (id) => {
      };
    const checkoutHandler = () => {
        axios.post("http://localhost:8080/api/shoppingcarts/1/createorder", {
        }, {headers}).then(response => {
            alert("Placed successfully");
            const info = JSON.stringify(response.data);
            dispatch({
                type: "Place Order",
                    payload: info
            })
            props.history.push('/orders');
        })
            .catch(error => {
                alert(error.message);
            })
        
    };
    return (
        <div className="row top">
        <div className="col-2">
            <h1>Shopping Cart</h1>
            <div className="row">
                <div>
                    <img
                        className="small"
                        src={product.photo}
                        alt={product.productName}
                    ></img>
              </div>
                    <div className="min-30">
                        {product.productName}
                    </div>
            
                <div>
                     Pirce : ${product.price}
                </div>
                <div>qty:{qty}</div>
            <div>
                        <Link to="/" color="primary">Delete</Link>
                    </div>
                    </div>
        </div>
        <div className="col-1">
            <div className="card card-body">
            <ul>
                <li>
                <h2>
                    Total: ${product.price * qty}
                </h2>
                </li>
                <li>
                <Button
                    type="button"
                    onClick={checkoutHandler}
                 
                    color="primary" size="large" variant="contained" 
                >
                    Proceed to Checkout
                </Button>
                </li>
            </ul>
            </div>
        </div>
        </div>
    );
}
