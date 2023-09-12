import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Button,
    Typography,
    IconButton,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete
import * as actions from '../../store/actions/index';
import Scanner from '../Scanner/Scanner';

const Sale = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [products, setProducts] = useState({
        product: [],
    });
    const [total, setTotal] = useState(0);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const finishSaleButtonRef = useRef();
    useEffect(() => {
        props.onFetchProducts();
    }, []);

    useEffect(() => {
        // When the Confirm Dialog opens, focus the Finish Sale button
        if (confirmDialogOpen && finishSaleButtonRef.current) {
            finishSaleButtonRef.current.focus();
        }
    }, [confirmDialogOpen]);

    useEffect(() => {
        setTotal(
            products.product.reduce((total, p) => total + p.price * p.quantity, 0)
        );
    }, [products.product]);

    useEffect(() => {
        const handleEnterKeyPress = (e) => {
            if (e.key === 'Enter') {
                if (confirmDialogOpen) {
                    handleConfirmFinishSale();
                } else {
                    handleAddProductToSale();
                }
            }
        };



        const handleKeyDown = (e) => {
            if (e.key === 'Control') {
                e.preventDefault(); // Prevent default browser behavior for Ctrl key press
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === 'Control') {
                handleFinishSale();
            }
            if (e.key === 'Escape') {
                if (confirmDialogOpen) {
                    handleCancelFinishSale();
                }
            }
        };

        document.addEventListener('keydown', handleEnterKeyPress);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleEnterKeyPress);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [confirmDialogOpen]);

    const handleInputChange = (e, value) => {
        setInputValue(value.split(' - ')[0]);
    };

    const handleAddProductToSale = () => {
        const existingProduct = props.products.find(
            (p) =>
                p.barCode === inputValue ||
                p.name.toLowerCase() === inputValue.toLowerCase()
        );

        if (existingProduct) {
            const existProductOnState = products.product.find(
                (p) => p.idProduct === existingProduct.id
            );
            if (existProductOnState) {
                const updatedProducts = products.product.map((p) => {
                    if (p.idProduct === existingProduct.id) {
                        return {
                            ...p,
                            quantity: p.quantity + 1,
                        };
                    }
                    return p;
                });

                setProducts((prevState) => ({
                    ...prevState,
                    product: updatedProducts,
                }));
            } else {
                const product = {
                    idProduct: existingProduct.id,
                    name: existingProduct.name,
                    price: existingProduct.price,
                    purchasePrice: existingProduct.purchasePrice,
                    quantity: 1,
                    date: new Date().toISOString(),
                };

                setProducts((prevState) => ({
                    ...prevState,
                    product: [...prevState.product, product],
                }));
            }
        }

        setInputValue('');
    };

    const handleUpdateProductQuantity = (productId, newQuantity) => {
        const updatedProducts = products.product.map((p) => {
            if (p.idProduct === productId) {
                return {
                    ...p,
                    quantity: parseInt(newQuantity),
                };
            }
            return p;
        });

        setProducts((prevState) => ({
            ...prevState,
            product: updatedProducts,
        }));
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = products.product.filter(
            (p) => p.idProduct !== productId
        );

        setProducts((prevState) => ({
            ...prevState,
            product: updatedProducts,
        }));
    };

    const handleFinishSale = () => {
        setConfirmDialogOpen(true);
    };

    const handleConfirmFinishSale = () => {
        const newSale = {
            date: new Date().toISOString(),
            products: products.product,
            totalPrice: total,
        };

        props.onFinishSale(newSale);
        setInputValue('');
        setProducts({ product: [] });
        setTotal(0);
        setConfirmDialogOpen(false);
    };

    const handleCancelFinishSale = () => {
        setConfirmDialogOpen(false);
    };

    const onDetected = (result) => {
        const existingProduct = props.products.find(
            (p) => Number(p.barCode) === Number(result.codeResult.code)
        );

        if (existingProduct) {
            const existProductOnState = products.product.find(
                (p) => p.idProduct === existingProduct.id
            );
            if (existProductOnState) {
                const updatedProducts = products.product.map((p) => {
                    if (p.idProduct === existingProduct.id) {
                        return {
                            ...p,
                            quantity: p.quantity + 1,
                        };
                    }
                    return p;
                });

                setProducts((prevState) => ({
                    ...prevState,
                    product: updatedProducts,
                }));
                return true;
            } else {
                const product = {
                    idProduct: existingProduct.id,
                    name: existingProduct.name,
                    price: existingProduct.price,
                    purchasePrice: existingProduct.purchasePrice,
                    quantity: 1,
                    date: new Date().toISOString(),
                };

                setProducts((prevState) => ({
                    ...prevState,
                    product: [...prevState.product, product],
                }));
                return true;
            }
        }
        return false;
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4">Sale</Typography>
            <div style={{ alignItems: 'center' }}>
                <Paper
                    variant="outlined"
                    style={{  height: 10, visibility: 'hidden' }}
                >
                    <div style={{ width: '50%', height: '100%' }}>
                        <Scanner onDetected={onDetected} hidden style={{ width: '50%', height: '100%' }} />
                    </div>
                </Paper>
                <Autocomplete
                    freeSolo
                    options={props.products}
                    getOptionLabel={(option) => option.name +' - '+option.barCode }
                    inputValue={inputValue}
                    onInputChange={handleInputChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Scan or enter product barcode/name"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    if (params.inputProps.onKeyDown) {
                                        params.inputProps.onKeyDown(e);
                                    }
                                    handleAddProductToSale();
                                }
                            }}
                            style={{ marginLeft: 16,width:310 }}
                        />
                    )}
                />
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.product
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((p) => (
                            <TableRow key={p.idProduct}>
                                <TableCell>{p.name}</TableCell>
                                <TableCell>{p.price}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        value={p.quantity}
                                        onChange={(e) =>
                                            handleUpdateProductQuantity(p.idProduct, e.target.value)
                                        }
                                    />
                                </TableCell>
                                <TableCell>{p.price * p.quantity}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleRemoveProduct(p.idProduct)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Typography variant="h6">Total Price: {total}</Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleFinishSale}
                disabled={products.product.length === 0}
            >
                Finish Sale
            </Button>
            <Dialog open={confirmDialogOpen}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to finish the sale?
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleConfirmFinishSale}
                        onKeyDown={(e) => {
                            if (e.key === 'Alt') {
                                console.log("ALT TAPPED")
                                handleConfirmFinishSale();
                            }
                        }}
                        ref={finishSaleButtonRef}
                        color="primary"
                        autoFocus
                    >
                        Finish Sale
                    </Button>
                    <Button onClick={handleCancelFinishSale} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.products,
        sale: state.sale,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFinishSale: (sale) => dispatch(actions.addSale(sale)),
        onFetchProducts: () => dispatch(actions.fetchProducts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sale);
