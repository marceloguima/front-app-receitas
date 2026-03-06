import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";

const CardCirculo = ({ imagem, alt, titulo, to }) => {
    return (
        <NavLink to={to} className="nav-link">
            <div className="imagem-circulo">
                <img src={imagem} alt={alt} />
            </div>
            <h4>{titulo}</h4>
        </NavLink>
    );
};

export default CardCirculo;
