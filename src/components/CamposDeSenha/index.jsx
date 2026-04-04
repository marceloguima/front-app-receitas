import React from "react";
import CampoInput from "../Campo-entrada";
import CaixaErroForm from "../CaixaErroForm";
import { useState } from "react";
import "./styles.css";

const CamposDeSenha = ({
    senha,
    setSenha,
    confirmaSenha,
    setConfirmaSenha,
}) => {
    const [mensagemValidaSenha, setMensagemValidaSenha] = useState("");
    const [mensagemValidaConfirmaSenha, setMensagemValidaConfirmaSenha] =
        useState("");

    // validação de senha, a senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.
    const regexSenha =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-_=+^<>~|/\\{}[\]()])[A-Za-z\d@$!%*?&#\-_=+^<>~|/\\{}[\]()]{8,}$/;
    const validaSenha = (valorSenha) => {
        if (senha.trim() === "") {
            setMensagemValidaSenha("* Senha é obrigatória *");
        } else if (!regexSenha.test(valorSenha)) {
            setMensagemValidaSenha("* Crie uma senha mais segura *");
        } else {
            setMensagemValidaSenha("");
        }
    };
    
    const validarConfirmaSenha = (valorConfirma, valorSenhaOriginal) => {
        if (valorConfirma.trim() === "") {
            setMensagemValidaConfirmaSenha("* Confirme sua senha. *");
        } else if (valorConfirma !== valorSenhaOriginal) {
            setMensagemValidaConfirmaSenha("As senhas não coincidem");
        } else {
            setMensagemValidaConfirmaSenha("");
        }
    };

    const lidaComMudancaSenha = (e) => {
        const novoValor = e.target.value;
        // Só valida enquanto digita se já tiver algum erro na tela (pra não assustar o usuário no 1º caractere)
        setSenha(novoValor);
        if (mensagemValidaSenha) validaSenha(novoValor);
    };

    const lidaComMudancaConfirmaSenha = (e) => {
        const novoValor = e.target.value;
        setConfirmaSenha(novoValor);
        if (mensagemValidaConfirmaSenha) validarConfirmaSenha(novoValor, senha);
    };

    return (
        <>
            <CampoInput
                id="password"
                tipo="password"
                textLabel="Senha"
                placeholder="Crie uma senha"
                value={senha}
                onChange={lidaComMudancaSenha}
                onBlur={() => validaSenha(senha)}
            />{" "}
            <CaixaErroForm mensagem={mensagemValidaSenha} />
            <CampoInput
                id="confirma-senha"
                tipo="password"
                textLabel="Confirme a senha"
                placeholder="Confirme a senha "
                value={confirmaSenha}
                onChange={lidaComMudancaConfirmaSenha}
                onBlur={() => validarConfirmaSenha(confirmaSenha, senha)}
            />
            <CaixaErroForm mensagem={mensagemValidaConfirmaSenha} />
            <div
                className={
                    senha !== "" && senha.length > 4 && !regexSenha.test(senha)
                        ? "aviso-senha-segura ativo"
                        : "aviso-senha-segura"
                }
            >
                <span className="span-senha-segura">
                    A senha deve ter pelo menos 8 caracteres, incluindo
                    maiúsculas, minúsculas, números e símbolos.
                </span>
            </div>
        </>
    );
};

export default CamposDeSenha;
