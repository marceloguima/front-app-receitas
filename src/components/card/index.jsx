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

    function favoritar(e) {
        // eventos para evitar que o card pegue o clique do botão
        e.preventDefault();
        e.stopPropagation();
        setFavorito(!favorito);
        console.log("clicou");
    }

    return (
        <NavLink to="/detalhes" className="navlink">
            <div className="card">
                <div className="overlay-card"></div>
                <div className="dif">
                    <p className="p-dif">{props.complexidade}</p>
                </div>

                <button className="btn-favorito" onClick={favoritar}>
                    {favorito ? <MdFavorite /> : <MdFavoriteBorder />}
                </button>

                <img src={props.src} className="img-card" alt={props.alt} />
                <div className="info-card">
                    <h3>{props.titulo}</h3>
                    <div className="temp-porcoes">
                        <div className="temp">
                            <p className="p-temp">
                                <FaRegClock /> {props.tempoPreparo}
                            </p>
                        </div>
                        <div className="porcoes">
                            <p className="p-porcoes">{`${props.porcoes} Porções`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default Card;
