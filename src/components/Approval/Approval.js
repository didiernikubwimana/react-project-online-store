import React, {useContext, useEffect, useState} from 'react';
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Select from "@material-ui/core/Select";
import store from "../../store/store";
import { Button } from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import {APIConfig} from "../../store/API-Config";

const Approval = (props)=>{
    const APIs = useContext(APIConfig);
    const state = store.getState();
    const [sellers,setSellers] = useState([]);
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + state.oAuthToken,
    }
    const approveHandler = (seller) => {
        axios(APIs.adminAPI + '/approve?seller=' + seller.id , {headers})
            .then(response => {
            if(response.data === true){
                seller.approved = true;
                loadData();
            }
        }).catch(error => {
            alert(error.message);
        })
    };

    const loadData = ()=>{
        axios(APIs.sellerAPI,{headers})
            .then(response=>{
                const info = JSON.stringify(response.data);
                setSellers(response.data);
            }).catch(error => {
            alert(error.message);
        })
    }
    useEffect(()=>{
        loadData();
    },[]);
return (
   <div>
       <h1>List of Sellers</h1>
       <table className="table">
           <thead>
           <tr>
               <th>ID</th>
               <th>NAME</th>
               <th>APPROVAL STATUS</th>
           </tr>
           </thead>
           <tbody>
           {sellers && sellers.map((seller) => (
               <tr key={seller.id}>
                   <td>{seller.id}</td>
                   <td>{seller.user.firstName} {seller.user.lastName}</td>
                   <td>
                       {!seller.approved && (
                           <Button
                               type="button"
                               size="small"
                               color="primary" variant="contained"
                               onClick={() => approveHandler(seller)}
                           >
                               Approve
                           </Button>
                       ) }
                   </td>
               </tr>
           ))}
           </tbody>
       </table>
   </div>
);
}
export  default Approval;