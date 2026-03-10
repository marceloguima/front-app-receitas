import React from "react";
import "./styles.css";

const SkeletonCardMini = () => {
    return (
        // Herda o layout do card-mini original, mas desativa o hover e o clique
        <div className="card-mini skeleton-wrapper">
            {/* O quadrado da foto */}
            <div className="skeleton-block skeleton-img-mini">
                <img src="./logo-skeleton-loader.png" alt="" />
            </div>

            {/* O espaço do texto (h4) */}
            <div className="skeleton-block skeleton-titulo-mini"></div>
        </div>
    );
};

export default SkeletonCardMini;
