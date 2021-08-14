import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, BrowserRouter} from "react-router-dom";
import React, { useEffect, useState,useContext } from 'react';
import './App.css';
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from 'react-redux';
import {APIConfig} from "./store/API-Config";
import Home from "./containers/Home/Home";
import OrderManager from "./components/Seller/OrderManager";
import store from "./store/store";
import {LOGOUT, SET_USER} from "./constants/constants";
import Approval from "./components/Approval/Approval";
import ProductManager from "./components/ProductManager/ProductManagerComp";
import Products from './containers/Products/Products';
import ProductReview from "./components/ProductReview/ProductReview";
import {UserInfo} from "./store/AppContext";
import EditProduct from "./components/EditProduct/EditProduct";
import Orders from "./components/Orders/Orders";
import AddProduct from "./components/AddProduct/AddProducts";
import Profile from "./components/Profile/Profile";
import ShoppingCart from './containers/ShoppingCart/ShoppingCart';
import Footer from "./components/Footer";
import SignUp from "./components/SignUp/SignUpComp";
import Header from "./components/Header";


function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [userInfo, setUserInfo ] = useState(null);


  const state = store.getState();
  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch({
      type: LOGOUT
    });
    document.location.href = '/';
  };

  useEffect(()=>{
    setUserInfo(state.userInfo);
  },[]);


  return (
      <APIConfig.Provider value={
        {
          registerAPI: 'http://localhost:8080/signup',
          loginAPI: 'http://localhost:8080/authenticate',
          productAPI: 'http://localhost:8080/api/products',
          logoutAPI: 'http://localhost:8080/logout',
          sellerAPI: 'http://localhost:8080/api/sellers',
          orderAPI: 'http://localhost:8080/api/orders',
          userAPI: 'http://localhost:8080/api/users',
          categoryAPI: 'http://localhost:8080/api/categories',
          adminAPI: 'http://localhost:8080/api/admin',
          roleAPI: 'http://localhost:8080/api/roles',
          reviewAPI: 'http://localhost:8080/api/reviews'
        }
      }>
        <UserInfo.Provider value={{ userInfo, setUserInfo }}>
          <BrowserRouter>
            <Header/>
            <div className="grid-container">

              <header className="row">
                <div>

                  <Link className="brand" to="/">
                  Mini Market
                  </Link>
                </div>
                  <div>
                    {userInfo && userInfo.isBuyer && (
                  <Link to="/cart">
                    Cart
                  </Link>
                  )}

                  {userInfo && userInfo.isSeller && (
                      <div className="dropdown">
                        <Link to="#admin">
                          Seller <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                          <li>
                            <Link to="/productlist/seller">Products</Link>
                          </li>
                          <li>
                            <Link to="/orderlist/seller">Orders</Link>
                          </li>
                        </ul>
                      </div>
                  )}
                  {userInfo && userInfo.isAdmin && (
                      <div className="dropdown">
                        <Link to="#admin">
                          Admin <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                          <li>
                            <Link to="/dashboard">Dashboard</Link>
                          </li>
                          <li>
                            <Link to="/approval">Sellers</Link>
                          </li>
                          <li>
                            <Link to="/productreviews">Product Review</Link>
                          </li>
                        </ul>
                      </div>
                  )}
                    {userInfo ? (
                        <div className="dropdown">
                          <Link to="#">
                            {userInfo.username} <i className="fa fa-caret-down"></i>{' '}
                          </Link>
                          <ul className="dropdown-content">
                            <li>
                              <Link to="/profile">User Profile</Link>
                            </li>
                            {userInfo.isBuyer && (
                            <li>
                              <Link to="/orders">Order History</Link>
                            </li>
                            )}
                            <li>
                              <Link to="#signout" onClick={signoutHandler}>
                                Sign Out
                              </Link>
                            </li>
                          </ul>
                        </div>
                    ) : (
                        <div>
                        <Link to="/signin">Sign In</Link>
                        <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </div>
              </header>
             
              <main>
                <Route path="/cart" component={ShoppingCart}></Route>
                <Route path="/newproduct" component={AddProduct}></Route>
                <Route path='/editproduct/:id' exact component={EditProduct} />
                <Route path="/profile" component={Profile}></Route>
                <Route path="/productreviews" component={ProductReview}></Route>
                <Route path="/approval" component={Approval}></Route>
                <Route path="/signin" component={Login}></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="/productlist/seller" component={ProductManager}></Route>
                <Route path="/orders" component={Orders}></Route>
                <Route path="/orderlist/seller" component={OrderManager}></Route>
                <Route path="/product/:id" component={Products} exact></Route>
                <Route path="/" component={Home} exact></Route>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </UserInfo.Provider>
      </APIConfig.Provider>
  );
}

export default App;
