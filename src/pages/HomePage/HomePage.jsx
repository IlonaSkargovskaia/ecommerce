import React, { useEffect } from "react";
import Slider from "../../components/Slider/Slider";
import "./HomePage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCategories,
    fetchProductsByCategory,
} from "../../store/categorySlice";
import Category from "../../components/Category/Category";
import SingleCategory from "../../components/SingleCategory/SingleCategory";
import { fetchProducts } from "../../store/productSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    const { data: categories, status: categoryStatus } = useSelector(
        (state) => state.category
    );
    const { catProductAll: productsByCategory, catProductAllStatus } =
        useSelector((state) => state.category);
    const {data: products, status: productStatus} = useSelector(state => state.product);

    

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchProductsByCategory("electronics", "all"));
        dispatch(fetchProductsByCategory("jewelery", "all"));
    }, []);

    return (
        <main>
            <div className="home-page">
                <Slider />
                <Category categories={categories} status={categoryStatus} />

                <ProductList products = {products} status={productStatus} />

                {/* category 1 - all products */}
                <section>
                    {productsByCategory[0] && (
                        <SingleCategory
                            products={productsByCategory[0]}
                            status={catProductAllStatus}
                        />
                    )}
                </section>
                {/* category 2 - all products */}
                <section>
                    {productsByCategory[1] && (
                        <SingleCategory
                            products={productsByCategory[1]}
                            status={catProductAllStatus}
                        />
                    )}
                </section>
            </div>
        </main>
    );
};

export default HomePage;
