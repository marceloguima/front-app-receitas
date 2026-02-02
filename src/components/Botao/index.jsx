import React from "react";
import "./styles.css";

// Este botão sai daqui com uma classe padrão ".btn", um esqueleto, ao ser usado ele recebe outras classe, 
// "variant (padão da pg usada), classe extra(cancelar, perigo, sucesso etc)"  de acordo com a necessidade
const Botao = ({ children, variant = 'primary', className, ...rest }) => {
    const classesFinais = `btn
  ${variant}`


    return (
        <button className={classesFinais} {...rest}>
            {children}
        </button>
    );
};

export default Botao;
