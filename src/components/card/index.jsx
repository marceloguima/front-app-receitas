import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// icones
import { FaRegClock } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { IoRestaurantOutline } from "react-icons/io5";
import { PiChefHatFill } from "react-icons/pi";
import { PiChefHatBold } from "react-icons/pi";

import "./style.css";
// componentes
import ReceitaInfo from "../ReceitaInfo";

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
        <NavLink to={`/detalhes/${props._id}`} className="navlink">
            <div className="card">
                <div className="overlay-card"></div>
                <div className="dif">
                    <ReceitaInfo
                        icone={<PiChefHatBold />}
                        texto={props.complexidade}
                    ></ReceitaInfo>
                </div>

                <button className="btn-favorito" onClick={favoritar}>
                    {favorito ? <MdFavorite /> : <MdFavoriteBorder />}
                </button>

                <img src={props.src} className="img-card" alt={props.alt} />
                <div className="info-card">
                    <h3>{props.titulo}</h3>
                    <div className="temp-porcoes">
                        <div className="temp">
                            <ReceitaInfo
                                icone={<FaRegClock />}
                                texto={`${props.tempoPreparo}`}
                            />
                        </div>
                        <div className="porcoes">
                            <ReceitaInfo
                                icone={<IoRestaurantOutline />}
                                texto={`${props.porcoes} porções`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default Card;
