import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SingleProduct from "../SingleProduct/SingleProduct";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { STATUS } from "../../utils/status";
import "./SingleCategory.scss";
import { setIsModalVisible, setModalData } from "../../store/modalSlice";

const SingleCategory = ({ products, status }) => {
    const dispatch = useDispatch();
    const {isModalVisible} = useSelector(state => state.modal);

    const viewModalHandler = (data) => {
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    }

    if (status === STATUS.ERROR) return <Error />;
    if (status === STATUS.LOADING) return <Loader />;

    return (
        <section className="cat-single py-5 bg-ghost-white">
            {isModalVisible && <SingleProduct />}
            <div className="container">
                <div className="cat-single-content">
                    <div className="section-title">
                        <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                            {products[0].category}
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

export default SingleCategory;
