import React from "react";
import "./styles.css"; // Assumindo que o CSS do skeleton está aqui

const LoaderSkeletonCard = () => {
    return (
        // Usamos as mesmas classes do Card real
        <div className="card skeleton-card">
            <div className="card-interno">
                
                {/* O gradient escuro do card original fica mantido */}
                {/* <div className="overlay-card"></div> */}
                
                {/* Pílula de dificuldade (Skeleton) */}
                <div className="dif">
                    <div className="skeleton-pilula"></div>
                </div>

                {/* Botão de favorito (Skeleton) */}
                <div className="btn-favorito skeleton-pilula skeleton-btn-fav"></div>

                {/* A Imagem (Fundo cinza piscando com a sua logo opcional) */}
                <div className="img-card skeleton-bg">
                   <img src="./logo-skeleton-loader.png" alt="" className="skeleton-img-logo" /> 
                </div>

                {/* Informações de Título e Tempo/Porções (Skeletons) */}
                <div className="info-card">
                    <div className="skeleton-texto-titulo"></div>
                    <div className="temp-porcoes">
                        <div className="skeleton-pilula"></div>
                        <div className="skeleton-pilula"></div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoaderSkeletonCard;