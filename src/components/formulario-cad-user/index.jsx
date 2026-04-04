import React, { useState } from "react";
import "./styles.css";
import CampoInput from "../Campo-entrada";
import Botao from "../Botao";
import Loader from "../Loader";
import axios from "axios";
import CaixaErroForm from "../CaixaErroForm";
import CamposDeSenha from "../CamposDeSenha";

const FormularioCadastroUsuario = ({ alternaCadastroParaLogin }) => {
    // mensagem sucesso
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");
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

         const regexSenha =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#\-_=+^<>~|/\\{}[\]()])[A-Za-z\d@$!%*?&#\-_=+^<>~|/\\{}[\]()]{8,}$/;
        const isSenhaValida = regexSenha.test(senha) && senha === confirmaSenha; 
            if (!isSenhaValida) {
            setTimeout(() => setMensagemErro(""), 3000);
            return;
            }
        // Se TUDO for true, aí sim envio pro servidor!
        if (isNomeValido && isEmailValido) {
          

            const novoUsuario = {
                nome,
                email,
                senha,
            };

            setLoading(true);
            const urlDaApi = import.meta.env.VITE_API_URL;
            try {
                const resposta = await axios.post(
                    `${urlDaApi}/usuarios/cadastro`,
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
                setLoading(false);
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
                setLoading(false);
            }
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

    return (
        <form className="formulario-cadastro" onSubmit={enviarDadosUsuario}>
            <h1>Cadastro</h1>
            <div className="mensagens">
                <p className="p-sucess">{mensagemSucesso}</p>
                <p className="p-erro">{mensagemErro}</p>
            </div>
            <CampoInput
                id="nome"
                type="text"
                textLabel="Nome"
                placeholder="Informe seu primeiro nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <CaixaErroForm mensagem={mensagemValidaNome} />
            <CampoInput
                id="email"
                type="text"
                textLabel="Email"
                placeholder="Informe seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />{" "}
            <CaixaErroForm mensagem={mensagemValidaEmail} />

            {/* Campo senha é um componente que já traz os 2 inputs "senha e confirme sena"  ja com validações */}
            <CamposDeSenha senha={senha}
                setSenha={setSenha}
                confirmaSenha={confirmaSenha}
                setConfirmaSenha={setConfirmaSenha}/>
           
            <div className="area-botao-cadastro">
                <Botao variant="btn-acao-formulario-cadastro">
                    {loading ? (
                        <Loader variant="spinner-botao" texto="Aguarde..." />
                    ) : (
                        "Cadastrar"
                    )}
                </Botao>
            </div>
        </form>
    );
};

export default FormularioCadastroUsuario;
