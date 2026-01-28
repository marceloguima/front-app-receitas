import React from "react";
import "./styles.css";
import { MdImage } from "react-icons/md";

const LoaderSkeletonCard = () => {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-img">
                <MdImage className="skeleton-icon" />
            </div>
            <div className="skeleton skeleton-title"></div>

            <div className="skeleton-info">
                <div className="skeleton skeleton-temp"></div>
                <div className="skeleton skeleton-dif"></div>
            </div>
        </div>
    );
};

export default LoaderSkeletonCard;
