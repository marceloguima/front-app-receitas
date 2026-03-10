import React from "react";
import "./styles.css"; // Importe o arquivo onde estão as animações do skeleton

const SkeletonCardCirculo = () => {
    return (
        // Usamos as mesmas classes base do componente original
        <div className="nav-link skeleton-wrapper-circle">
            <div className="imagem-circulo skeleton-bg skeleton-circulo-img">
                <img src="./logo-skeleton-loader.png" alt="" />
            </div>
            <div className="skeleton-bg skeleton-circulo-texto"></div>
        </div>
    );
};

export default SkeletonCardCirculo;