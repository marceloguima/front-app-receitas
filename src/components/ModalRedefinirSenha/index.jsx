import React from "react";
import { useState } from "react";
import CampoInput from "../Campo-entrada";
import Botao from "../Botao";
import "./styles.css";

const ModalRedefinirSenha = ({ onClick }) => {
    const [email, setEmail] = useState("");

    return (
        <>
            <div className="overlay"></div>
            <div className="modal-redefinir-senha">
                <h2>Recupere Sua Senha</h2>
                <span>
                    Informe seu email para que te enviarei um link para
                    recuperar sua senha:
                </span>
                <CampoInput
                    id="email"
                    textLabel="E-mail"
                    placeholder="Informe seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="footer-botoes-redefinir">
                    <Botao variant="btn-enviar">Enviar</Botao>
                    <Botao variant="btn-cancelar" onClick={onClick}>
                        Cancelar
                    </Botao>
                </div>
            </div>
        </>
    );
};

export default ModalRedefinirSenha;
