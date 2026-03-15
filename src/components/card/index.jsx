import React from "react";
import { Link, NavLink } from "react-router-dom";
// icones
import { FaRegClock } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";

import { PiChefHatBold } from "react-icons/pi";

import "./style.css";

// componentes
import ReceitaInfo from "../ReceitaInfo";
import BotaoFavoritar from "../Botao-favoritar";

const Card = (props) => {
   

    return (
        <NavLink to={`/detalhes/${props._id}`} className="card">
            <div className="card-interno">
                <div className="overlay-card"></div>
                <div className="dif">
                    <ReceitaInfo
                        icone={<PiChefHatBold />}
                        texto={props.complexidade}
                    ></ReceitaInfo>
                </div>
<BotaoFavoritar/>
               

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
