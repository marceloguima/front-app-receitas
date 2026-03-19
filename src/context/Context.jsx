import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // cadastro/login de usuario
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    const [showFormulario, setShowFormulario] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isCadastro, setIsCadastro] = useState(false);
        const [dropPerfil, setDropPerfil] = useState(false)


    useEffect(() => {
        // 1. Vai na gaveta do navegador e procura o crachá
        const crachaGuardado = localStorage.getItem("crachaDoUsuario");

        // 2. Se achou o crachá...
        if (crachaGuardado) {
            // 3. Transforma o texto (JSON) de volta em objeto JavaScript
            const dadosDoUsuario = JSON.parse(crachaGuardado);

            // 4. Salva no estado do React, logando o usuário automaticamente!
            setUsuarioLogado(dadosDoUsuario);
        }
    }, []); // <-- Esse array vazio é vital. Significa "rode só na montagem da tela".

    // Função que você já passa pro FormularioLogin
    const liberaEntrada = (usuario) => {
        setUsuarioLogado(usuario);
        setShowFormulario(false)
    };

    // Bônus: Função para o botão de "Sair"
    const fazerLogout = () => {
        localStorage.removeItem("crachaDoUsuario"); // Joga o crachá fora
        setUsuarioLogado(null); // Tira da memória do React
        setShowFormulario(false)
        setDropPerfil(false) //fecha o dropdown
    };
    // ---------------------------------------------------------------------

    return (
        <AuthContext.Provider
            value={{
                usuarioLogado,
                setUsuarioLogado,
                fazerLogout,
                liberaEntrada,
                showFormulario,
                setShowFormulario,
                isLogin,
                setIsLogin, 
                isCadastro,
                setIsCadastro,
                dropPerfil,
                setDropPerfil
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
