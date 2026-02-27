import React, { useState } from "react";
import "./styles.css";
import CampoInput from "../Campo-entrada";
import Botao from "../Botao";

const FormularioCadastroUsuario = ({alternaDeCadastroParaLogin}) => {
// mensagem sucesso
const [mensagemSucesso, setMensagemSucesso] = useState("")

    // Mensagem rodapé input
    const [mensagemValidaSenha, setMensagemValidaSenha] = useState("");
    const [mensagemValidaConfirmaSenha, setMensagemValidaConfirmaSenha] =
        useState("");
    const [mensagemValidaNome, setMensagemValidaNome] = useState("");
    const [mensagemValidaEmail, setMensagemValidaEmail] = useState("");

    // valores do inputs
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    const enviarDadosUsuario = (e) => {
        e.preventDefault();

        // Guarda o resultado de cada validação (true ou false)
        const isNomeValido = validaFormatoNome();
        const isEmailValido = validaEmail();
        const isSenhaValida = validaFormatoSenha();

        // Se TUDO for true, aí sim enviamos pro servidor!
        if (isNomeValido && isEmailValido && isSenhaValida) {
            console.log(
                "Formulário perfeito! Preparando para enviar ao banco:",
                { nome, email, senha },
                
            );
            setMensagemSucesso("Conta criada com sucesso!")
            setTimeout(() => {
               alternaDeCadastroParaLogin()
            }, 2000);
            // Aqui vai entrar o código de requisição do backend no futuro#####################################
        } else {
            console.log("Formulário tem erros. Corrija antes de enviar.");
        }
    };

    // garantir que usuários não cadastre apenas uma letra
    const validaFormatoNome = () => {
        if (nome.trim().length === 0) {
            setMensagemValidaNome("* Nome é obrigatório. *");
            return false;
        } else if (nome.length < 2) {
            setMensagemValidaNome(
                "* O nome presisa ter 2 ou mais caracteres. *",
            );
            return false;
        } else setMensagemValidaNome("");
        return true;
    };

    // Validação de email.
    const validaEmail = () => {
        if (email.trim() === "") {
            setMensagemValidaEmail("* Email é obrigatório. *");
            return false;
        } else if (!email.includes("@") || !email.includes(".")) {
            setMensagemValidaEmail("* Informe um email válido. *");
            return false;
        } else setMensagemValidaEmail("");
        return true;
    };

    // validação de senha, a senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.
    const regexSenha =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validaFormatoSenha = () => {
        let isValid = true;

        if (senha.trim() === "") {
            setMensagemValidaSenha("* Senha é obrigatório *");
            isValid = false;
        } else if (!regexSenha.test(senha)) {
            setMensagemValidaSenha(
                "* A senha deve ter pelo menos 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos. *",
            );
            isValid = false;
        } else {
            setMensagemValidaSenha("");
        }

        // 2. Valida a Confirmação separadamente (para não apagar o erro de cima)
        if (confirmaSenha.trim() === "") {
            setMensagemValidaConfirmaSenha("* Confirme sua senha. *");
            isValid = false;
        } else if (confirmaSenha !== senha) {
            setMensagemValidaConfirmaSenha("As senhas não coincidem");
            isValid = false;
        } else {
            setMensagemValidaConfirmaSenha("");
        }

        return isValid;
    };

    return (
        <form className="formulario-cadastro" onSubmit={enviarDadosUsuario}>
            <h1>Cadastro</h1>
             <div className="mensagens">
                <p className="p-sucess">{mensagemSucesso}</p>
            </div>
            <CampoInput
                type="text"
                textLabel="Nome"
                placeholder="Informe seu primeiro nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <div className="mensagens">
                <span className="span-erro">{mensagemValidaNome}</span>
            </div>
            <CampoInput
                type="text"
                textLabel="Email"
                placeholder="Informe seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <div className="mensagens">
                <span className="span-erro">{mensagemValidaEmail}</span>
            </div>
            <CampoInput
                type="password"
                textLabel="Senha"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />{" "}
            <div className="mensagens">
                <span className="span-erro">{mensagemValidaSenha}</span>
            </div>
            <CampoInput
                type="password"
                textLabel="Confirme a senha"
                placeholder="Confirme a senha "
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
            />
            <div className="mensagens">
                <span className="span-erro">{mensagemValidaConfirmaSenha}</span>
            </div>
            <div className="area-botoes-cadastro">
                <Botao variant="btn-acao-formulario-cadastro">Cadastrar</Botao>
            </div>
        </form>
    );
};

export default FormularioCadastroUsuario;
