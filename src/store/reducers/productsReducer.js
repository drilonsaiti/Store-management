import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    products: [],
};

const productsReducer = (state = initialState.products, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return action.payload;
        case actionTypes.ADD_PRODUCT_SUCCESS:
            return [...state, action.payload];
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return state.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return state.filter((product) => product.id !== action.payload);
        default:
            return state;
    }
};

export default productsReducer;