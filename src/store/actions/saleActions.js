import * as actionTypes from './actionsTypes';
import axios from "../../axios-store";


export const finishSaleSuccess = sale => ({
    type: actionTypes.FINISH_SALE_SUCCESS,
    payload: sale
});


export const addSale = (sale) => {
    return (dispatch) => {
        axios.post('/sale.json', sale)
            .then((response) => {
                dispatch(finishSaleSuccess(response.data));

            })
            .catch((error) => {
                console.error('Error adding product:', error);
            });
    };
};