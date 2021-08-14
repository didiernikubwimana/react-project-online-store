import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import store from "../store/store";

export default function SellerRoute({ component: Component, ...rest }) {
  const { userInfo } = state.userInfo;
    const state = store.getState();

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isSeller ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
