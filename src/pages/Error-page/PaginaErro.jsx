import React from "react";
import "./PaginaErro.css";

const ErrorPage = () => {
    return (
        <div className="pg-error">
            <h1>Desculpe ocorreu um erro. A página não foi encontrada.</h1>
            <div className="cod-error">
                <h2>404!</h2>
            </div>
        </div>
    );
};

export default ErrorPage;
