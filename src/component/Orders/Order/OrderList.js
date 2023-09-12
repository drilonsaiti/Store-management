/*
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
                    {props.orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.products.}</TableCell>
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
    orders: state.orders,
});

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);*/
