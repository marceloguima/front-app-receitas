import React from "react";
import "./styles.css";
import Botao from "../Botao";

// icones
import { MdOutlineCheck } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";

const FormAdmin = ({ titulo, children, descricao }) => {
    const salvarDados = (e) => {
        e.preventDefault();
    };

    return (
        <form className="formulario">
            <h2 className="titulo-form">{titulo}</h2>
            <p className="desc-form">{descricao}</p>
            <div className="campos-entrada">{children}</div>
            <div className="botoes-finish">
                <Botao variant="btn-primario" onClick={salvarDados}>
                    <span>
                        <MdOutlineCheck />
                    </span>
                    Salvar
                </Botao>
                <Botao variant="btn-secundario">
                    <span>
                        <RiCloseLine />
                    </span>
                    Cancelar
                </Botao>
            </div>
        </form>
    );
};

export default FormAdmin;
