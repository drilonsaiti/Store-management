import React from 'react';
import * as actions from '../../../store/actions/index'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'
import {connect} from "react-redux";

const ProductsList = (props) => {
    return (
        <div>
            <h2>Products List</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Purchase Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Bar code</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.purchasePrice}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>{product.barCode}</TableCell>
                            <TableCell>
                                <IconButton aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="delete"
                                           onClick={() => props.onDeleteProduct(product.id)} >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

const mapStateToProps = (state) => ({
    products: state.products,
});

const mapDispatchToProps = dispatch => ({
    onDeleteProduct: (id) => dispatch(actions.deleteProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);