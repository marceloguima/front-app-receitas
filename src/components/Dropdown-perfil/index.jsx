import React, { useState } from "react";
import "./styles.css";
import Botao from "../Botao";

import { FaRegCircleUser } from "react-icons/fa6";

import { useContext } from "react";
import { AuthContext } from "../../context/Context";

const DropdownPerfil = () => {
    const {
        usuarioLogado,
        fazerLogout,
        setShowFormulario,
        setIsLogin,
        setDropPerfil,
    } = useContext(AuthContext);

    // para botão de login
    const abrirFormLogin = () => {
        // abre um overlay com formulários de cadastro e login...
        setShowFormulario(true);
        // ...e escolhe o de login
        setIsLogin(true);

        // fecha o dropdown perfil
        setDropPerfil(false);
    };

    // para botão de cadastro
    const abrirFormCadastro = () => {
        // abre um overlay com formulários de cadastro e login...
        setShowFormulario(true);

        // ...e escolhe o de cadastro
        setIsLogin(false);

        // fecha o dropdown perfil
        setDropPerfil(false);
    };

    return (
        <div className="dropdown">
            {/* a setinha do dropdown */}
            <div className="seta"></div>
            {usuarioLogado ? (
                <div className="menu-logado">
                    <div className="nome-perfil-drop">
                        <FaRegCircleUser />
                        <span className="nome-user">{usuarioLogado.nome}</span>
                    </div>
                    <Botao onClick={fazerLogout}>Sair</Botao>
                </div>
            ) : (
                <div className="menu-deslogado">
                    {/* <span>Faça login e aproveite cada detalhe.</span> */}

                    <div className="botoes-drop">
                        {/* Botão de login do dropdown */}
                        <Botao onClick={abrirFormLogin}>Entrar</Botao>

                        {/* Botão de criar conta do dropdown */}
                        <Botao variant="btn-criar-conta" onClick={abrirFormCadastro}>Criar conta</Botao>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownPerfil;
