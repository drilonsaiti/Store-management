import React, { useState, useEffect } from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from "react-redux";
import { Typography, TextField, Button, Grid,Container } from '@mui/material';

const ProductForm = ({ product, onAddProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [purchasePrice, setPurchasePrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [barCode,setBarCode] = useState(0);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setQuantity(product.quantity);
        }
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProduct = { id: product?.id, name, price, quantity,purchasePrice,barCode };
        onAddProduct(updatedProduct);
    };

    return (
        <Container maxWidth="md">
        <form onSubmit={handleSubmit}>
            <Typography variant="h2">{product ? 'Edit Product' : 'Add Product'}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Purchase Price"
                        type="number"
                        fullWidth
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Quantity"
                        type="number"
                        fullWidth
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Bar Code"
                        type="number"
                        fullWidth
                        value={barCode}
                        onChange={(e) => setBarCode(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                        {product ? 'Update' : 'Add'}
                    </Button>
                </Grid>
            </Grid>
        </form>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddProduct: (product) => dispatch(actions.addProduct(product)),
    };
};

export default connect(null, mapDispatchToProps)(ProductForm);
