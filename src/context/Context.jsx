import React, { createContext } from "react";
import { useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // cadastro/login de usuario
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    const [showFormulario, setShowFormulario] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isCadastro, setIsCadastro] = useState(false);
    const [dropPerfil, setDropPerfil] = useState(false);

    useEffect(() => {
      
        const crachaGuardado = localStorage.getItem("crachaDoUsuario");

     
        if (crachaGuardado) {
          
            const dadosDoUsuario = JSON.parse(crachaGuardado);

            // 4. Salva no estado do React, logando o usuário automaticamente!
            setUsuarioLogado(dadosDoUsuario);
        }
    }, []);

    
    const liberaEntrada = (usuario) => {
        setUsuarioLogado(usuario);
        setShowFormulario(false);
    };

   
    const fazerLogout = () => {
        localStorage.removeItem("crachaDoUsuario");
        setUsuarioLogado(null); 
        setShowFormulario(false);
        setDropPerfil(false); //fecha o dropdown
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
                setDropPerfil,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
