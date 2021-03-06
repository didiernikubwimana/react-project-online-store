
import Select from "@material-ui/core/Select";
import {APIConfig} from "../../store/API-Config";
import TextField from "@material-ui/core/TextField";
import store from "../../store/store";
import MenuItem from "@material-ui/core/MenuItem";
import {Link} from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";
import React, {useContext, useEffect, useState} from "react";
import InputLabel from "@material-ui/core/InputLabel";
const EditProduct = (props) =>{
    const APIs = useContext(APIConfig);
    const [producer, setProducer] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [color, setColor] = useState('');
    const [quantityInStock, setQuantityInStock] = useState('');
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [product,setProduct] = useState(null);
    const [size, setSize] = useState('');
    const state = store.getState();
    
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + state.oAuthToken,
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post(APIs.sellerAPI + "/updateproduct", {
            id:props.match.params.id,
            productName: productName,
            producer: producer,
            description: description,
            size: size,
            price: price,
            color: color,
            quantityInStock: quantityInStock,
            category: {
                id: category
            }
        },{headers}).then(response => {
            alert("Product Edited successfully");
            document.location.href = '/productlist/seller';
        })
            .catch(error => {
                alert(error.message);
            })
    }
    const loadData = ()=>{
        axios(APIs.productAPI + "/" + props.match.params.id,{headers})
            .then(response =>{
                const prdata = response.data;
                setProduct(prdata);
                setProductName(prdata.productName);
                setProducer(prdata.producer);
                setDescription(prdata.description);
                setSize(prdata.size);
                setPrice(prdata.price);
                setColor(prdata.color);
                setQuantityInStock(prdata.quantityInStock);
                setCategory(prdata.category.id);
            }).catch(error => {
            alert(error.message);
        }).catch(error=>{
            alert(error.message);
        })
    }
    useEffect(()=>{
        loadData();
    },[]);
    
    return (
      <div>
          {product && (
          <form className="form" onSubmit={handleSubmit}>
              <div>
                  <h1>Edit Product</h1>
              </div>
              <div>
                  <TextField
                  label="Product Name"
                      type="text"
                      id="productName"
                      placeholder="Enter Product name"
                      required
                      onChange={(e) => setProductName(e.target.value)}
                      defaultValue={product.productName}
                      variant="outlined"
                  ></TextField>
              </div>
              <div>
                  <TextField
                  label="Producer"
                      type="text"
                      id="producer"
                      placeholder="Enter Producer Name"
                      required
                      onChange={(e) => setProducer(e.target.value)}
                      defaultValue={product.producer}
                      variant="outlined"
                  ></TextField>
              </div>
              <div>
                  <TextField
                  label="Size"
                      type="text"
                      id="Size"
                      placeholder="Enter Size of Product"
                      required
                      onChange={(e) => setSize(e.target.value)}
                      defaultValue={product.size}
                      variant="outlined"
                  ></TextField>
              </div>
              <div>
                  <TextField
                  label="Color"
                      type="text"
                      id="color"
                      placeholder="Enter color of Product"
                      required
                      onChange={(e) => setColor(e.target.value)}
                      defaultValue={product.color}
                      variant="outlined"
                  ></TextField>
              </div>
              <div>
                  <TextField
                  label="Price"
                      type="number"
                      id="price"
                      placeholder="Enter Price of Product"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      defaultValue={product.price}
                      variant="outlined"
                  ></TextField>
              </div>
              <div>
                  <TextField
                  label="Quantity In Stock"
                      type="number"
                      id="quantityInStock"
                      placeholder="Enter Quantity of Productof Product In Stock"
                      required
                      onChange={(e) => setQuantityInStock(e.target.value)}
                      defaultValue={product.quantityInStock}
                      variant="outlined"
                  ></TextField>
              </div>

              <div>

                  <TextField name="Category" id="Category" variant="outlined"
            select label="Category" defaultValue={product.category.id} onChange={(e) => setCategory(e.target.value)}>
                
                      <MenuItem value="1">Electronics Items</MenuItem>
                      <MenuItem value="2">Food Items</MenuItem>
                      <MenuItem value="3">Fashion Items</MenuItem>
                      <MenuItem value="4">Toys Items</MenuItem>
                      <MenuItem value="5">Furniture Items</MenuItem>
                  </TextField>
              </div>
              <Link to="/productlist/seller">
                  <button color="secondary" size="large" variant="contained" >
                      Cancel
                  </button>
              </Link>
              <Button color="primary" size="large" variant="contained" type="submit">
                  Update
              </Button>
          </form>
          )}
      </div>
    );
}
export  default  EditProduct;