import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// icones
import { FaRegClock } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

import "./style.css";

const Card = (props) => {
    const [favorito, setFavorito] = useState(false);
    

    function favoritar() {
        setFavorito(!favorito);
        console.log("clicou")
    };

    return (
        <div className="card">
           <div className="overlay-card"></div>
            
            <button className="btn-favorito" onClick={favoritar}>
                {favorito ?  <MdFavorite /> : <MdFavoriteBorder /> }
            </button>

            <img src={props.src} className="img-card" alt={props.alt} />
            <div className="info-card">
                <h3>{props.titulo}</h3>
                <div className="temp-dif">
                    <div className="temp">
                        <p className="p-temp">
                            <FaRegClock /> 30min
                        </p>
                    </div>
                    <div className="dif">
                        <p className="p-dif">Fácil</p>
                    </div>
                </div>
            </div>
            {/* <div className="div-btn-link">
                <NavLink to="/detalhes">Ver receita</NavLink>
            </div> */}
        </div>
    );
};

export default Card;
