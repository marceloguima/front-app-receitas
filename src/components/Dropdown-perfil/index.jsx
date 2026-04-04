import React, { useState } from "react";
import "./styles.css";

import { MdLogout } from "react-icons/md";
import { LuSettings } from "react-icons/lu";

import { FaRegCircleUser } from "react-icons/fa6";

import { useContext } from "react";
import { AuthContext } from "../../context/Context";

const DropdownPerfil = ({ children, textoBotao, texto, texto2, onClick }) => {
    const { usuarioLogado, setShowFormulario, setIsLogin, setDropPerfil } =
        useContext(AuthContext);

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
                        <span className="nome-user">{texto}</span>
                    </div>
                        <div className="email-user">
                            <span className="email-user">{texto2}</span>
                        </div>
                    <hr />

                    <div className="botoes-drop">
                        {/* Botão de log out */}
                        <button className="btn-config">
                            <LuSettings className="icon-config" />
                            Configurações
                        </button>
                        <button className="btn-sair" onClick={onClick}>
                            {" "}
                            <MdLogout />
                            {textoBotao}
                        </button>

                        {/* Botão cancelar saida do usuário */}
                        {children}
                    </div>
                </div>
            ) : (
                <div className="menu-deslogado">
                    <span>Crie uma conta ou faça login.</span>

                    <div className="botoes-drop">
                        {/* Botão de login do dropdown */}
                        <button className="btn-entrar" onClick={abrirFormLogin}>
                            Entrar
                        </button>
                        {/* Botão de criar conta do dropdown */}
                        <button
                            className="btn-cria-conta"
                            onClick={abrirFormCadastro}
                        >
                            Criar conta
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownPerfil;
