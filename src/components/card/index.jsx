import React from "react";
import { Link, NavLink } from "react-router-dom";
// icones
import { FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";


import "./style.css";

const Card = (props) => {
    return (
        <div className="card">
            <img src={props.src} className="img-card" alt={props.alt} />
            <div className="info-card">
                <h3>{props.titulo}</h3>
                {/* <div className="temp-rend">
                    <p>
                        <FaRegClock />
                        {props.tempoPreparo}
                    </p>
                    <p>
                        <FiUsers />{props.quantPorcoes}
                    </p>
                </div> */}
            </div>
            <div className="div-btn-link">
                <NavLink to="/detalhes">Ver receita</NavLink>
            </div>
        </div>
    );
};

export default Card;
