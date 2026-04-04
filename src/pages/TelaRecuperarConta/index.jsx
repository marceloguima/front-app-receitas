import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import CamposDeSenha from "../../components/CamposDeSenha";
import Botao from "../../components/Botao";

const TelaRedefinirSenha = () => {
    const { token } = useParams();
    console.log("Token recebido na TelaRedefinirSenha:", token);

    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    const [mensagemErro, setMensagemErro] = useState("");

    const salvarNovaSenha = async (e) => {
        e.preventDefault();
        console.log("Token capturado da URL:", token);
        console.log("Senha digitada:", novaSenha);

        if (senha !== confirmaSenha) {
            setMensagemErro("As senhas não coincidem.");
            return;
        }
    };

    return (
        <div className="container-redefinir">
            <form onSubmit={salvarNovaSenha} className="form-redefinir">
                <h2>Crie uma nova senha</h2>
                <CamposDeSenha
                    senha={senha}
                    setSenha={setSenha}
                    confirmaSenha={confirmaSenha}
                    setConfirmaSenha={setConfirmaSenha}
                />
                <Botao variant="btn-salva-nova-senha">Salvar nova senha</Botao>
            </form>
        </div>
    );
};

export default TelaRedefinirSenha;
