import React, {useContext, useEffect, useState} from "react";
import {SET_USER} from "../../constants/constants";
import store from "../../store/store";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import {APIConfig} from "../../store/API-Config";
import {useDispatch} from "react-redux";


const  Profile = () =>{
    const APIs = useContext(APIConfig);
    const [firstName, setFirstName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [phNumber, setPhNumber] = useState('');
    const [userInfo, setUserInfo ] = useState(null);
    const dispatch = useDispatch();
    const state = store.getState();
    const [lastName, setLastName] = useState('');
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + state.oAuthToken,
    }

const loadCurrentData = ()=>{
    axios(APIs.userAPI + "/current",{headers})
        .then(response=>{
            const info = JSON.stringify(response.data);
            dispatch({
                type: SET_USER,
                payload: info
            })
            setUserInfo(state.userInfo);
            setFirstName(state.userInfo.firstName);
            setLastName(state.userInfo.lastName);
            setPhNumber(state.userInfo.phoneNumber);

        }).catch(error => {
        alert(error.message);
    })
}

useEffect(()=>{
    loadCurrentData();

},[]);

    const submitUserprofileHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {

            axios.post(APIs.userAPI + "/update", {
                username:userInfo.username,
                firstName:firstName,
                lastName:lastName,
                password:password,
                phoneNumber:phNumber

            }, {headers}).then(response => {
                alert("Updated successfully");
                const info = JSON.stringify(response.data);
                dispatch({
                    type: SET_USER,
                    payload: info
                })
                document.location.href = '/';
            })
                .catch(error => {
                    alert(error.message);
                })

        }
    };

    return (

        <div>
            <form className="form" onSubmit={submitUserprofileHandler}>

                <div>
                    <h1>User Profile</h1>
                </div>
                {userInfo && (
                <div className="form" >
                    <div>
                        <TextField
                        label="First Name"
                            type="text"
                            id="firstName"
                            placeholder="Enter First name"
                            required
                            onChange={(e) => setFirstName(e.target.value)}
                            defaultValue={userInfo.firstName} variant="outlined"/>
                    </div>
                    <div>
                    <TextField
                    label="Last Name"
                    type="text"
                    id="LastName"
                    placeholder="Enter Last name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    defaultValue={userInfo.lastName} variant="outlined"/>
                    </div>
                    <div>
                    <TextField
                    label="Phone Number"
                    type="number"
                    id="phNumber"
                    placeholder="Enter Phone Number"
                    defaultValue={userInfo.phoneNumber}
                    required
                    onChange={(e) => setPhNumber(e.target.value)} variant="outlined">
                        
                    </TextField>
                    </div>
                    <div>
                    <TextField
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    ></TextField>
                    </div>
                    <div>
                    <TextField
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    placeholder="Enter confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    ></TextField>
                    </div>

                    <div>
                    <label />
                    <Button color="primary" type="submit" size="large" variant="contained" >
                    Update
                    </Button>
                    </div>
                </div>
                )}


            </form>
        </div>

    );
}

export default  Profile;