import React, {useEffect, useState} from 'react';
import {Button, Container, Typography} from '@mui/material';
//import { makeStyles } from '@mui/styles';
import ProductsList from '../../component/Products/Product/ProductsList'
import AddProductForm from '../../component/Products/AddEditProduct/AddEditProduct';
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import { useNavigate } from 'react-router-dom';
/*const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
}));*/

const ProductsPage = (props) => {
    //const classes = useStyles();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        props.onFetchProducts();
    }, [props.onFetchProducts]);

    const handleAddProduct = () => {
        navigate('/add-product'); // Redirect to the add product page
    };

    return (
        <Container >
            <Typography variant="h4" component="h1" >
                Products Page
            </Typography>
            <Button variant="contained" onClick={handleAddProduct}>
                Add Product
            </Button>
            <ProductsList products={props.products} />

        </Container>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
});

const mapDispatchToProps  = dispatch => {
    return{
        onFetchProducts: () => dispatch(actions.fetchProducts()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
