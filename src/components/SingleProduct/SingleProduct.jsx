import React, { useState } from "react";
import "./SingleProduct.scss";
import { IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setIsModalVisible } from "../../store/modalSlice";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const SingleProduct = () => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: product } = useSelector((state) => state.modal);

    const increaseQty = () => {
        setQty((prevQty) => {
            let newQty = prevQty + 1;
            return newQty;
        });
    };

    const decreaseQty = () => {
        setQty((prevQty) => {
            let newQty = prevQty - 1;
            if (newQty < 1) {
                newQty = 1;
            }
            return newQty;
        });
    };

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("overlay-bg")) {
            dispatch(setIsModalVisible(false));
        }
    };

    const addToCartHandler = (product) => {
        let totalPrice = qty * product.price
        const tempProduct = {
          ...product,
          quantity: qty,
          totalPrice
        }

        dispatch(addToCart(tempProduct));
        dispatch(setIsModalVisible(false));

        // navigate('/cart');
    };

    return (
        <div className="overlay-bg" onClick={handleOverlayClick}>
            <div className="product-details-modal bg-white">
                <button
                    className="modal-close-btn flex flex-center fs-14"
                    onClick={() => dispatch(setIsModalVisible(false))}
                >
                    <IoIosClose />
                </button>
                <div className="details-content grid">
                    <div className="details-right">
                        <div className="details-img">
                            <img src={product.image} alt={product.title} />
                        </div>
                    </div>
                    <div className="details-left">
                        <div className="details-info">
                            <h3 className="title text-regal-blue fs-22 fw-5">
                                {product.title}
                            </h3>
                            <p className="description text-regal-blue">
                                {product.description}
                            </p>
                            <div className="price fw-7 fs-24">
                                {product.price} ₪
                            </div>
                            <div className="qty flex">
                                <span className="text-light-blue qty-text">
                                    Quantity:
                                </span>
                                <div className="qty-change flex">
                                    <button className="qty-dec fs-14" onClick={decreaseQty}>
                                        <FaMinus />
                                    </button>
                                    <span className="qty-value flex flex-center">
                                        {qty}
                                    </span>
                                    <button
                                        className="qty-dec fs-14"
                                        onClick={increaseQty}
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            <button
                                className="btn-primary add-to-cart-btn"
                                onClick={() => addToCartHandler(product)}
                            >
                                <span className="btn-ico">
                                    <FaShoppingCart />
                                </span>
                                <span className="btn-text">Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
