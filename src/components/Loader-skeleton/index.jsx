import React from "react";
import "./styles.css";
import { MdImage } from "react-icons/md";

const LoaderSkeletonCard = () => {
    return (
        <div className="card skeleton-card">
            <div className="skeleton skeleton-img">
                <MdImage className="skeleton-icon" />
            </div>
            <div className="skeleton skeleton-title" ></div>
       
            <div className="skeleton skeleton-btn"></div>
        </div>
    );
};

export default LoaderSkeletonCard;
