import React from "react";
import "./styles.css";

const SecaoEntradas = ({ children }) => {
    return (
        <section className="secoes" id="entradas">
            <h2 className="titulo-secao">Entradas</h2>
            <div className="cards-entradas">{children}</div>
        </section>
    );
};

export default SecaoEntradas;
