import { createSlice } from "@reduxjs/toolkit";
import {BASE_URL} from '../utils/apiURL';
import {STATUS} from '../utils/status'

const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUS.IDLE
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        }
    }
});

export const {setProducts, setStatus} = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = () => {
    return async function fetchProductThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
            try {
                const response = await fetch(`${BASE_URL}`);
                const data = await response.json();
                
                dispatch(setProducts(data));
                dispatch(setStatus(STATUS.IDLE));
            } catch (error) {
                dispatch(setStatus(STATUS.ERROR));
                
            }
    }
}


export const searchProducts = (searchQuery) => {
    return async function searchProductThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            // Include search query in the API request
            const url = `${BASE_URL}?search=${searchQuery}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Error searching products: ${response.statusText}`);
            }

            const data = await response.json();
            
            dispatch(setProducts(data));
            dispatch(setStatus(STATUS.IDLE));

            return response; // Return the response to the caller
        } catch (error) {
            console.error(error.message);
            dispatch(setStatus(STATUS.ERROR));
            throw error; // Re-throw the error to the caller
        }
    };
};

