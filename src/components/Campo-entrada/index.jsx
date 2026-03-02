import React from "react";
import { useState } from "react";

import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

import "./styles.css";

const CampoInput = ({
    textLabel,
    id,
    tipo,
    placeholder,
    children,
    ...rest
}) => {
    // estado para mudar o tipo do input senha para visualisar
    const [isSenha, setIsSenha] = useState(false);
    const verSenha = () => {
        setIsSenha(!isSenha);
    };

    return (
        <div className="grupo-input">
            <label htmlFor={id}>{textLabel}</label>
            {tipo === "textarea" && (
                <textarea
                    id={id}
                    type={tipo}
                    className="textarea"
                    {...rest}
                    required
                />
            )}

            {tipo === "select" && (
                <select id={id} type={tipo} className="select" {...rest}>
                    {children}
                </select>
            )}

            {tipo === "password" && (
                <div className="input-senha">
                    <input
                        className="input_input_senha"
                        type={isSenha ? "password" : "text"}
                        id={id}
                        placeholder={placeholder}
                        {...rest}
                    />
                    <button className="olho-input" onClick={verSenha}>
                        {isSenha ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </button>
                </div>
            )}

            {tipo !== "textarea" &&
                tipo !== "select" &&
                tipo !== "password" && (
                    <input
                        type={tipo}
                        id={id}
                        placeholder={placeholder}
                        {...rest}
                    />
                )}
        </div>
    );
};

export default CampoInput;
