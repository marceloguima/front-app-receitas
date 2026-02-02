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
            <p>{descricao}</p>
            <div className="campos-entrada">{children}</div>
            <div className="botoes-admin">
                <Botao
                    children={
                        <span className="icon">
                            <MdOutlineCheck />
                            Salvar
                        </span>
                    }
                    variant="salva-receita"
                    onClick={salvarDados}
                />
                <Botao
                    children={
                        <span className="icon">
                            <RiCloseLine />
                            Cancelar
                        </span>
                    }
                    variant="salva-anuncio"
                />
            </div>
        </form>
    );
};

export default FormAdmin;
