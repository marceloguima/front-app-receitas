import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import CampoInput from "../Campo-entrada";
import Botao from "../Botao";
import Loader from "../Loader";

const FormularioLogin = ({ liberaEntrada, onclickRedefinir }) => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
    const [mensagemEmail, setMensagemEmail] = useState("");
    const [mensagemSenha, setMensagemSenha] = useState("");

    const logarUsuario = async (e) => {
        e.preventDefault();

        const campoEmailValido = verificaCampoEmail();
        const campoSenhaValido = verificaCampoSenha();

        // Se TUDO for true, aí sim envio pro servidor!
        if (campoEmailValido && campoSenhaValido) {
        
            setLoading(true);
            const usuario = {
                email,
                senha,
            };

            const urlDaApi = import.meta.env.VITE_API_URL;
            try {
                const resposta = await axios.post(
                    `${urlDaApi}/usuarios/login`,
                    usuario,
                );


                setMensagemSucesso(
                    `Seja bem vindo ! ${resposta.data.usuario.nome}`,
                );
                localStorage.setItem(
                    "crachaDoUsuario",
                    JSON.stringify(resposta.data.usuario),
                );

                setLoading(false);
                setTimeout(() => {
                    // garda os dados do usuário para usar na home fora do formulário.
                    liberaEntrada(resposta.data.usuario);
                }, 2000);

            } catch (erro) {
                setLoading(false);
                console.error(
                    "Erro detalhado:",
                    erro.response ? erro.response.data : erro.message,
                );
                setMensagemErro(erro.response.data.mensagem);
                setTimeout(() => {
                    setMensagemErro("");
                }, 3000);
            }
        } 
    };

    // verifica email se ta vazio, se tem formato de email e se tá no banco
    const verificaCampoEmail = () => {
        if (email.trim() === "") {
            setMensagemEmail("* Informe seu email. *");
            return false;
        } else if (!email.includes("@") || !email.includes(".")) {
            setMensagemEmail("* Informe um email válido. *");
            return false;
        } else setMensagemEmail("");
        return true;
    };

    // verifica se o campo ta vazio
    const verificaCampoSenha = () => {
        if (senha.trim() === "") {
            setMensagemSenha("* Informe sua senha. *");
            return false;
        } else setMensagemSenha("");
        return true;
    };

    return (
        <form className="formulario-login" onSubmit={logarUsuario}>
          
            <h1>Login</h1>
            <div className="mensagens">
                <p className="p-sucess">{mensagemSucesso}</p>
                <p className="p-erro">{mensagemErro}</p>
            </div>
            <CampoInput
                id="email"
                textLabel="E-mail"
                placeholder="Informe seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mensagens">
                <span className="span-erro">{mensagemEmail}</span>
            </div>
            <CampoInput
                id="senha"
                tipo="password"
                textLabel="Senha"
                placeholder="Informe sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />{" "}
            <div className="mensagens">
                <span className="span-erro">{mensagemSenha}</span>
            </div>
            {/* Área para redefinir e escolher a opção  de salvar a senha. */}
            <div className="suporte-login">
                <div className="lembrar-usuario">
                    <input type="checkbox" id="salvar-senha" />
                    <label htmlFor="salvar-senha">Lembrar de mim</label>
                </div>
                <button type="button" onClick={onclickRedefinir}>
                    Esqueceu a senha?
                </button>
            </div>
            {/* Botão principal, quando está aguardando o texto troca para um loader */}
            <div className="area-botoes-cadastro">
                <Botao variant="btn-acao-formulario-cadastro">
                    {loading ? (
                        <Loader
                            variant="spinner-botao"
                            texto="Verificando..."
                        />
                    ) : (
                        "Entrar"
                    )}
                </Botao>
            </div>

        </form>
    );
};

export default FormularioLogin;
