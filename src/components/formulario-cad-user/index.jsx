import React, { useState } from "react";
import "./styles.css";
import CampoInput from "../Campo-entrada";
import Botao from "../Botao";
import Loader from "../Loader";
import axios from "axios";

const FormularioCadastroUsuario = ({ alternaCadastroParaLogin }) => {
    // mensagem sucesso
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    // Mensagem rodapé input
    const [mensagemValidaSenha, setMensagemValidaSenha] = useState("");
    const [mensagemValidaConfirmaSenha, setMensagemValidaConfirmaSenha] =
        useState("");
    const [mensagemValidaNome, setMensagemValidaNome] = useState("");
    const [mensagemValidaEmail, setMensagemValidaEmail] = useState("");
    const [loading, setLoading] = useState(false);

    // valores do inputs
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    const enviarDadosUsuario = async (e) => {
        e.preventDefault();

        // Guarda o resultado de cada validação (true ou false)
        const isNomeValido = validaFormatoNome();
        const isEmailValido = validaEmail();
        const isSenhaValida = validaFormatoSenha();

        // Se TUDO for true, aí sim envio pro servidor!
        if (isNomeValido && isEmailValido && isSenhaValida) {
            console.log(
                "Formulário perfeito! Preparando para enviar ao banco:",
                { nome, email, senha },
            );

            const novoUsuario = {
                nome,
                email,
                senha,
            };
          

            setLoading(true);
            try {
                const resposta = await axios.post(
                    "http://localhost:3001/api/usuarios",
                    novoUsuario,
                );
                console.log("Resposta do servidor:", resposta);

                setMensagemSucesso("Conta criada com sucesso!");
                setLoading(false);

                setTimeout(() => {
                    alternaCadastroParaLogin();
                }, 2000);

                console.log(novoUsuario);

            } catch (erro) {
                setLoading(false)
                setMensagemErro("Erro ao cadastrar. Tente mais tarde.");

                // após 3 segundos limpo a mensagem e o formulário
                setTimeout(() => {
                    setMensagemErro("");
                    setConfirmaSenha("");
                    setEmail("");
                    setNome("");
                    setSenha("");
                }, 3000);

                console.error("Erro ao salvar:", erro);
                console.error(
                    "Erro detalhado:",
                    erro.response ? erro.response.data : erro.message,
                );

                // Mensagem caso o usuario já tenha cadastro.
                const mensagemDoBanco = erro.response.data.mensagem;
                setMensagemErro(mensagemDoBanco);
                setLoading(false)
            }
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
            setMensagemValidaSenha("* Crie uma senha mais segura *");
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
                <p className="p-erro">{mensagemErro}</p>
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
            <div className="area-botao-cadastro">
                <Botao variant="btn-acao-formulario-cadastro">
                    {loading ? <Loader variant="spinner-botao" texto="Aguarde..."/> : "Cadastrar"}
                </Botao>
            </div>
        </form>
    );
};

export default FormularioCadastroUsuario;
