import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: [],
        status: STATUS.IDLE,
        catProductAll: [],
        catProductAllStatus: STATUS.IDLE,
        catProductSingle: [],
        catProductSingleStatus: STATUS.IDLE,
    },
    reducers: {
        setCategories(state, action) {
            state.data = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setCategoriesProductAll(state, action) {
            state.catProductAll.push(action.payload);
        },
        setCategoriesStatusAll(state, action) {
            state.catProductAllStatus = action.payload;
        },
        setCategoriesProductSingle(state, action) {
            state.catProductSingle.push(action.payload);
        },
        setCategoriesStatusSingle(state, action) {
            state.catProductSingleStatus = action.payload;
        },
        resetCatProductAll: (state) => {
            state.catProductAll = [];
          },
    },
});

export const {
    setCategories,
    setStatus,
    setCategoriesProductAll,
    setCategoriesStatusAll,
    setCategoriesProductSingle,
    setCategoriesStatusSingle,
    resetCatProductAll
} = categorySlice.actions;

export default categorySlice.reducer;


export const fetchCategories = () => {
    return async function fetchCategoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await fetch(`${BASE_URL}categories`);
            const data = await response.json();
            
            dispatch(setCategories(data.slice(0, 5)));
            // console.log("data from slice /=>", data);
            dispatch(setStatus(STATUS.IDLE));
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

export const fetchProductsByCategory = (categoryName, dataType) => {
    return async function fetchCategoryProductThunk(dispatch) {
        if (dataType === "all") dispatch(setCategoriesStatusAll(STATUS.LOADING));
        if (dataType === "single") dispatch(setCategoriesStatusSingle(STATUS.LOADING));

        try {
            const response = await fetch(`${BASE_URL}category/${categoryName}`);
            const data = await response.json();
            // console.log("data from slice products /=>", data);
            if(dataType === "all") {
                dispatch(setCategoriesProductAll(data.slice(0,5)))
                dispatch(setCategoriesStatusAll(STATUS.IDLE));
            }

            if(dataType === "single"){
                dispatch(setCategoriesProductSingle(data.slice(0,20)));
                dispatch(setCategoriesStatusSingle(STATUS.IDLE))
            }
        } catch (error) {
            if(dataType === "all") dispatch(setCategoriesStatusAll(STATUS.ERROR));
            if(dataType === "single") dispatch(setCategoriesStatusSingle(STATUS.ERROR));
            
        }
    }
}