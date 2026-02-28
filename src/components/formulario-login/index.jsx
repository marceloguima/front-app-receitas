import React, { useState } from "react";
import "./styles.css";
import CampoInput from "../Campo-entrada";
import Botao from "../Botao";
import Loader from "../Loader";

const FormularioLogin = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
        const [loading, setLoading] = useState(false);
    

    return (
        <form className="formulario-login">
            <h1>Login</h1>
            <CampoInput
                textLabel="E-mail"
                placeholder="Informe seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <CampoInput
                textLabel="Senha"
                placeholder="Informe sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />{" "}
            <div className="area-botoes-cadastro">
                <Botao variant="btn-acao-formulario-cadastro">
                    {loading ? (
                        <Loader variant="spinner-botao" texto="Aguarde..." />
                    ) : (
                        "Entrar"
                    )}
                </Botao>
            </div>
        </form>
    );
};

export default FormularioLogin;
