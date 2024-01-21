import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCategories,
    fetchProductsByCategory,
    resetCatProductAll,
} from "../../store/categorySlice";
import SingleCategory from "../../components/SingleCategory/SingleCategory";

const CategoryPage = () => {
    
    const { name } = useParams();
    const dispatch = useDispatch();

    const { catProductAll: productsByCategory, catProductAllStatus } =
        useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProductsByCategory(name, "all"));

        return () => {
            dispatch(resetCatProductAll());
        };
    }, [dispatch, name]);

    // console.log("productsByCategory:", productsByCategory);

    return (
        <main className="category-page bg-ghost-white">
            {productsByCategory[0] && (
                <SingleCategory
                    products={productsByCategory[0]}
                    status={catProductAllStatus}
                />
            )}
        </main>
    );
};

export default CategoryPage;
