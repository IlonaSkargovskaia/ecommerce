import React from "react";
import "./Error.scss";
import { error } from "../../utils/images";

const Error = () => {
    return (
        <div className="container py-5">
            <div className="flex flex-center error">
                <img src={error} alt="error" />
            </div>
            <h3
                className="flex flex-center py-3"
                style={{ textTransform: "lowercase" }}
            >
                Something went wrong ...
            </h3>
        </div>
    );
};

export default Error;
