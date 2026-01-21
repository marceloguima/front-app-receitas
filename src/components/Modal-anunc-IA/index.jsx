import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

const ModalIA = ({ texto, duracao, intervalo }) => {
    const [visivel, setVisivel] = useState(true);

    useEffect(() => {
         let hideTimeoutId;
        const tempo = setInterval(() => {
            setVisivel(true);

            hideTimeoutId = setTimeout(() => {
                setVisivel(false);
            }, duracao);
        }, intervalo);

        return () => {
            clearInterval(tempo);
            clearTimeout(hideTimeoutId);
        };
    }, [intervalo, duracao]);

    return (
        <div
            className={
                visivel
                    ? "mensagem-anuncio-IA show-anunc-iA"
                    : "mensagem-anuncio-IA hiden-anunc-IA"
            }
        >
            {/* {visivel && 
            <audio src="./som-entrada.mp3" autoPlay></audio>
            }  */}
            <img
                src="./avatar-ia.png"
                alt="imagem robô"
                className="img-robo"
            />
            <div className="msg-balao-IA">
                <p>{texto}</p>
                <NavLink to="/ia" className="link-anunc-IA">
                    Testar?
                </NavLink>
            </div>
        </div>
    );
};

export default ModalIA;
