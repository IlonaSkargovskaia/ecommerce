import React from "react";
import { STATUS } from "../../utils/status";
import "./ProductList.scss";
import { setModalData, setIsModalVisible } from "../../store/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import SingleProduct from "../SingleProduct/SingleProduct";

const ProductList = ({ products, status }) => {
    const dispatch = useDispatch();
    const { isModalVisible } = useSelector((state) => state.modal);

    const viewModalHandler = (data) => {
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    };

    if (status === STATUS.ERROR) return <Error />;
    if (status === STATUS.LOADING) return <Loader />;

    return (
        <section className="product py-5 bg-ghost-white" id="products">
            {isModalVisible && <SingleProduct />}

            <div className="container">
                <div className="product-content">
                    <div className="section-title">
                        <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                            All Products
                        </h3>
                    </div>
                    <div className="product-items grid">
                        {products.map((product) => {
                            return (
                                <div
                                    className="product-item bg-white"
                                    key={product.id}
                                    onClick={() => viewModalHandler(product)}
                                >
                                    <div className="product-item-img">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                        />
                                        <div className="product-item-cat text-white fs-13 text-uppercase bg-gold fw-6">
                                            {product.category}
                                        </div>
                                    </div>
                                    <div className="product-item-body">
                                        <h6 className="product-item-title text-regal-blue fw-4 fs-15">
                                            {product.title}
                                        </h6>
                                    </div>
                                    <div className="product-item-price text-regal-blue fw-7 fs-18">
                                        {product.price} ₪
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductList;
