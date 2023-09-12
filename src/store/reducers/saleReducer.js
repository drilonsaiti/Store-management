import * as actionTypes from '../actions/actionsTypes';


const initialState = {
    sale: [],
};

const saleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FINISH_SALE_SUCCESS:
            return {
                ...state,
                sale: state.sale.concat(action.payload),
            };
        default:
            return state;
    }
};

export default saleReducer;
