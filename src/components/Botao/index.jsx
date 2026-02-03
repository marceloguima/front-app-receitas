import React from "react";
import "./styles.css";

// Este botão sai daqui com uma classe padrão ".btn", que é o btn principal, ao ser usado ele recebe outras classe se necessário,
// "variant  classe extra(cancelar, perigo, sucesso etc)"  de acordo com a necessidade, essas classes extras já estarão sendo criadas
//  aqui no css do botão, bastando apenas aplicar cada uma quando necessário onde for usar
const Botao = ({ children, variant = "primary", className, ...rest }) => {
    const classesFinais = `btn
  ${variant}`;

    return (
        <button className={classesFinais} {...rest}>
            {children}
        </button>
    );
};

export default Botao;
