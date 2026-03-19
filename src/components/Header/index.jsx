import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import BarraDeBusca from "../Barra-busca";

import { useContext } from "react";
import { AuthContext } from "../../context/Context";

import "./styles.css";
// icones
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import DropdownPerfil from "../Dropdown-perfil";


const Header = ({ onSubmit, value, onChange }) => {

const { usuarioLogado, dropPerfil, setDropPerfil, setShowformulario } = useContext(AuthContext);

    const [isMobile, setIsMobile] = useState(false);
    const [menuAberto, setMenuAberto] = useState(false)

    // pequeno modal para quando o usuário clicar no perfil ele sair ou entrar.
    const abreDropdowPerifl = ()=>{
        setDropPerfil(!dropPerfil)
    }

   
    // controla o menu, isMobile controla as classes que mostra e esconde o menu.
    // menu aberto controla a troca de botão, o de abrir pra o de fechar
    const showMenu = () => {
        setIsMobile(!isMobile);
        setMenuAberto(!menuAberto)
    };

    // =====================================================


    return (
        <header className="header">
            <nav className="nav-header">
                <Logo />
                <BarraDeBusca
                    variant="barra-busca"
                    onSubmit={onSubmit}
                    value={value}
                    onChange={onChange}
                />

                {/* Início menu mobile */}
                <ul
                    className={
                        isMobile ? "show-menu-mobile" : "hidden-menu-mobile"
                    }
                >
                    <li>
                        <NavLink to="/" className="link">
                            Início
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="link">
                            Favoritas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="link">
                            Meu caderno
                        </NavLink>
                    </li>
                </ul>
                {/* Fim menu mobile */}

                {/* Início menu descktop */}
                <ul className="menu-descktop">
                    
                    <li>
                        <NavLink to="/" className="link">
                            Início
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="link">
                            Favoritas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="link">
                            Meu caderno
                        </NavLink>
                    </li>
                </ul>
                {/* Fim menu descktop */}

                <button className="btn-login" onClick={abreDropdowPerifl}>
                    <FaRegCircleUser />

                    {/* bolinha verde/vermelha, o status do usuario */}
                    <span className={usuarioLogado ? "status-indicator-logado" : "status-indicator-logout"}></span>
                    {usuarioLogado ? `Olá, ${usuarioLogado.nome}!` : "Crie uma conta"}
                </button>
                

                <button className="btn-menu" onClick={showMenu}>
                    {menuAberto ? <IoClose /> : <IoMenu />}
                    
                  

                </button>
            </nav>

          
            {dropPerfil && (
                <DropdownPerfil/>
            )}
        </header>
    );
};

export default Header;
