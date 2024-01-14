import React, { useEffect } from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import {
    removeFromCart,
    clearCart,
    getCartTotal,
    toggleQty,
} from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { FiTrash2 } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa6";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartPage = () => {
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state.cart);
    const {
        data: cartProducts,
        totalItems,
        totalAmount,
        deliveryCharge,
    } = cartState;

    useEffect(() => {
        dispatch(getCartTotal());
    }, [dispatch, cartState]);

    const emptyCartMsg = <h4 className="text-red fw-6">No items found</h4>;

    return (
        <main className="cart-page">
            <div className="container">
                <div className="breadcrumb">
                    <ul className="breadcrumb-item flex">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <IoHome />
                                <span className="breadcrumb-separator">
                                    <FaChevronRight />
                                </span>
                            </Link>
                        </li>
                        <li>Cart</li>
                    </ul>
                </div>
            </div>

            <div className="bg-ghost-white py-5">
                <div className="container">
                    <div className="section-title bg-ghost-white">
                        <h3 className="text-uppercase fw-7 text-regal-blue ls-1">
                            My Cart
                        </h3>
                    </div>
                    {cartProducts.length === 0 ? (
                        emptyCartMsg
                    ) : (
                        <>
                            <div className="cart-content grid">
                                <div className="cart-left">
                                    <div className="cart-items grid">
                                        {cartProducts.map((cartProduct) => (
                                            <div
                                                className="cart-item grid"
                                                key={cartProduct.id}
                                            >
                                                <div className="cart-item-img flex flex-column">
                                                    <img
                                                        src={cartProduct.image}
                                                        alt={cartProduct.title}
                                                    />
                                                </div>

                                                <div className="cart-item-info">
                                                    <div className="flex flex-between">
                                                        <div>
                                                            <h6 className="fs-16 fw-5 text-light-blue">
                                                                {
                                                                    cartProduct.title
                                                                }
                                                            </h6>
                                                            <div className="qty flex">
                                                                <span className="text-light-blue qty-text">
                                                                    Quantity:
                                                                </span>
                                                                <div className="qty-change flex">
                                                                    <button
                                                                        className="qty-dec fs-14"
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                toggleQty({id: cartProduct.id, type: "DEC"})
                                                                            )
                                                                        }
                                                                    >
                                                                        <FaMinus />
                                                                    </button>
                                                                    <span className="qty-value flex flex-center">
                                                                        {
                                                                            cartProduct.quantity
                                                                        }
                                                                    </span>
                                                                    <button
                                                                        className="qty-dec fs-14"
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                toggleQty({id: cartProduct.id, type: "INC"})
                                                                            )
                                                                        }
                                                                    >
                                                                        <FaPlus />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="btn-square rmv-from-cart-btn"
                                                            onClick={() =>
                                                                dispatch(
                                                                    removeFromCart(
                                                                        cartProduct
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <span className="btn-square-icon">
                                                                <FiTrash2 />
                                                            </span>
                                                        </button>
                                                    </div>

                                                    <div className="flex flex-between">
                                                        <div className="text-light-blue fw-4 fs-15 price">
                                                            Price:{" "}
                                                            {cartProduct.price}{" "}
                                                            ₪
                                                        </div>
                                                        <div className="sub-total fw-6 fs-18 text-regal-blue">
                                                            <span>
                                                                Sub Total:{" "}
                                                            </span>
                                                            <span>
                                                                {
                                                                    cartProduct.totalPrice
                                                                }
                                                                ₪
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        className="btn-danger "
                                        onClick={() => dispatch(clearCart())}
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                                <div className="cart-right bg-white">
                                    <div className="cart-summary text-light-blue">
                                        <div className="cart-summary-title">
                                            <h6 className="fs-20 fw-5">
                                                Order Summary
                                            </h6>
                                        </div>
                                        <ul className="cart-summary-info">
                                            <li className="flex flex-between">
                                                <span className="fw-4">
                                                    Selected {totalItems}{" "}
                                                    items(s) Price
                                                </span>
                                                <span className="fw-7">
                                                    {totalAmount} ₪
                                                </span>
                                            </li>
                                            <li className="flex flex-between">
                                                <span className="fw-4">
                                                    Discount
                                                </span>
                                                <span className="fw-7">
                                                    <span className="fw-5 text-red">
                                                        -&nbsp; 0.00 ₪{" "}
                                                    </span>
                                                </span>
                                            </li>
                                            <li className="flex flex-between">
                                                <span className="fw-4">
                                                    Delivery Cost
                                                </span>
                                                <span className="fw-7">
                                                    <div className="fw-5 text-gold">
                                                        {deliveryCharge} ₪
                                                    </div>
                                                </span>
                                            </li>
                                        </ul>

                                        <div className="cart-summary-total flex flex-between fs-18">
                                            <span className="fw-6">
                                                Grand Total:{" "}
                                            </span>
                                            <span className="fw-6">
                                                {totalAmount + deliveryCharge} ₪
                                            </span>
                                        </div>
                                        <div className="cart-summary-btn">
                                            <button className="btn-secondary">
                                                Proceed to checkout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CartPage;
