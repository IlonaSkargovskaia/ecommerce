import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../../store/categorySlice";
import { getCartTotal } from "../../store/cartSlice";
import { updateSearchTerm } from "../../store/searchSlice";


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { data: categories } = useSelector((state) => state.category);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); 

    const cartState = useSelector(state => state.cart);
    const {totalItems} = cartState;

    const handleSearch = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        dispatch(updateSearchTerm(term));

    };

    const handleSearchButtonClick = () => {
        const url = `/search?query=${searchTerm}`;
        console.log('Navigating to:', url);
        navigate(url);
    };

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(getCartTotal())
    }, [dispatch, cartState]);

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="container">
                    <div className="navbar-top flex flex-between">
                        <Link to="/" className="navbar-brand">
                            <span className="text-regal-blue">Shopping</span>
                            <span className="text-gold">Il.</span>
                        </Link>
                        <form className="navbar-search flex">
                            <input type="text" placeholder="Search here ..." onChange={handleSearch}/>
                            <button type="submit" className="navbar-search-btn" onClick={handleSearchButtonClick}>
                                <CiSearch />
                            </button>
                            
                        </form>

                        <div className="navbar-btns">
                            <Link to="/cart" className="add-to-cart-btn flex">
                                <span className="btn-ico">
                                    <FaShoppingCart />
                                </span>
                                <div className="btn-txt fw-5">
                                    cart
                                    <span className="cart-count-value">{totalItems}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="navbar-bottom bg-regal-blue">
                    <div className="container flex flex-between">
                        <ul
                            className={`nav-links flex ${
                                isSideBarOpen ? "show-nav-links" : ""
                            }`}
                        >
                            <button
                                type="button"
                                className="navbar-hide-btn text-white"
                                onClick={() => setIsSideBarOpen(false)}
                            >
                                <IoClose />
                            </button>
                            {categories.map((category, index) => {
                                return (
                                    <li key={index}>
                                        <Link
                                            to={`/category/${category}`}
                                            className="nav-link text-white"
                                            onClick = {() => {
                                                
                                                setIsSideBarOpen(false);
                                            }}
                                        >
                                            {category}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <button
                            type="button"
                            className="navbar-show-btn text-gold"
                            onClick={() => setIsSideBarOpen(true)}
                        >
                            <IoMenuOutline />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
