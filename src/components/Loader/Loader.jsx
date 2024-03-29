import React from "react";
import "./Loader.scss";
import { spinner } from "../../utils/images";

const Loader = () => {
    return (
        <div className="container py-5">
            <div className="flex flex-center loader">
                <img src={spinner} alt="" />
            </div>
        </div>
    );
};

export default Loader;
