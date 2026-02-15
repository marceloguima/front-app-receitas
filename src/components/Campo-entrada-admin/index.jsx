import React from "react";
import "./styles.css";

const CampoEntradaAdmin = ({ textLabel, id, tipo, accept, placeholder, children, ...rest}) => {
    return (
        <div className="grupo-input">
            <label htmlFor={id}>{textLabel}</label>
            {tipo === "textarea" && <textarea id={id} type={tipo} className="textarea" {...rest} required />}

            {tipo === "select" && <select id={id}  type={tipo} className="select" {...rest} >{children}</select>}
            {tipo !== "textarea" && tipo !== "select" && (
                <input type={tipo} id={id} placeholder={placeholder} {...rest}/>
            )}
        </div>
    );
};

export default CampoEntradaAdmin;
