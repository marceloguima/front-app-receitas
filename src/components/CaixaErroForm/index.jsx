import React from "react";
import "./styles.css";

// Mensagens de erro para os formulários de login e cadastro. Recebe a mensagem por props e exibe na tela abaixo dos inputs.

const CaixaErroForm = ({mensagem}) => {
    return (
        <div className="mensagens">
            <span className="span-erro">{mensagem}</span>
        </div>
    );
};

export default CaixaErroForm;
