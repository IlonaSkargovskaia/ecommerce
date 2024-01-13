import React from "react";
import { STATUS } from "../../utils/status";
import "./Category.scss";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const Category = ({ categories, status }) => {
    if (status === STATUS.ERROR) return <Error />;
    if (status === STATUS.LOADING) return <Loader />;

    return (
        <section className="categories py-3 bg-ghost-white" id="categories">
            <div className="container">
                <div className="categories-content">
                    

                    <div className="category-items grid">
                        {categories.slice(0, 5).map((categoryName, index) => {
                            return (
                                <Link
                                    to={`category/${categoryName}`}
                                    key={index}
                                >
                                    <div className="category-item-name text-center">
                                        <h6 className="fs-20">
                                            {categoryName}
                                        </h6>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Category;
