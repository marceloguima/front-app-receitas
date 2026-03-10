import React, { useRef } from "react";
import "./styles.css";
import { GrNext, GrPrevious } from "react-icons/gr";

const Slideprimary = ({ card }) => {
    const slides = useRef(null);

    // Mover para a Esquerda (Botão Prev)
    const handleLeft = (e) => {
        e.preventDefault();
        // Subtrai a largura visível da tela para voltar 1 "página" inteira
        slides.current.scrollLeft -= slides.current.offsetWidth;
    };

    // Mover para a Direita (Botão Next)
    const handleRight = (e) => {
        e.preventDefault();
        // Soma a largura visível da tela para avançar 1 "página"
        slides.current.scrollLeft += slides.current.offsetWidth;
    };

    return (
        <div className="slide-primary">
            <h2 className="titulo-secao">Sobremesas</h2>

            {/* O Container que vai rolar */}
            <div className="itens-slide-primary" ref={slides}>
                {card}
            </div>

            {/* Os botões de controle */}
            <button className="btn-slide prev" onClick={handleLeft}>
                <GrPrevious />
            </button>
            <button className="btn-slide next" onClick={handleRight}>
                <GrNext />
            </button>
        </div>
    );
};

export default Slideprimary;
