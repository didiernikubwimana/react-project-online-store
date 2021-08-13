
import { Redirect, Route } from 'react-router-dom';
import React from 'react';
import store from "../store/store";


export default function AdminRoute({ component: Component, ...rest }) {
  const { userInfo } = state.userInfo;
    const state = store.getState();
 
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
}
