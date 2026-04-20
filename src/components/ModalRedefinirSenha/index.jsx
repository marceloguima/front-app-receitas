import React from "react";
import { useState } from "react";
import CampoInput from "../Campo-entrada";
import Botao from "../Botao";
import CaixaErroForm from "../CaixaErroForm";

import axios from "axios";
import "./styles.css";

const ModalRedefinirSenha = ({ onClick }) => {
    const [email, setEmail] = useState("");
    const [mensagemEmail, setMensagemEmail] = useState("");
    const [msgInstrucao, setMsgInstrucao] = useState(
        "Informe o email associado à sua conta para receber as instruções de recuperação.",
    );

    const verificaCampoEmail = () => {
        if (email.trim() === "") {
            setMensagemEmail("* Informe seu email. *");
            return false;
        } else if (!email.includes("@") || !email.includes(".")) {
            setMensagemEmail("* Informe um email válido. *");
            return false;
        }
        setMensagemEmail("");

        return true;
    };

    const enviarEmailRecuperacao = async (e) => {
        e.preventDefault();
        const usuario = {
            email,
        };
        if (!verificaCampoEmail()) return;
        const urlDaApi = import.meta.env.VITE_API_URL;
        try {
            console.log(
                "URL que o Axios está chamando:",
                `${urlDaApi}/usuarios/recuperarConta`,
            );
            const resposta = await axios.post(
                `${urlDaApi}/usuarios/recuperarConta`,
                usuario,
            );
            setMsgInstrucao(resposta.data.mensagem);
        } catch (erro) {
            console.error("Erro detalhado:", erro.mensagem);
            setMsgInstrucao(erro.data.mensagem);

            console.error(
                "Status do erro:",
                erro.response ? erro.response.status : "Sem resposta",
            );
        }
    };

    return (
        <form onSubmit={enviarEmailRecuperacao}>
            <div className="modal-redefinir-senha">
                <h2>Recupere Sua Conta</h2>
                <span className="instrucao-usuario">{msgInstrucao}</span>
                <div className="input-msg-verificacao">
                    <CampoInput
                        id="email"
                        textLabel="E-mail"
                        placeholder="Informe seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <CaixaErroForm mensagem={mensagemEmail} />
                </div>
                <div className="footer-botoes-redefinir">
                    <Botao variant="btn-enviar">Enviar</Botao>
                    <Botao
                        variant="btn-cancelar"
                        onClick={onClick}
                        type="button"
                    >
                        Cancelar
                    </Botao>
                </div>
            </div>
        </form>
    );
};

export default ModalRedefinirSenha;
