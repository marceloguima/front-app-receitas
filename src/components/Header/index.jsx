import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import Botao from "../Botao";

import "./styles.css";
// icones
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

// import { IoHome } from "react-icons/io5";

const Header = ({ children, login, usuario }) => {
    return (
        <header className="header">
            <nav className="nav-header">
                <Logo />
                {children}
                <div className="btn-menu">
                    <IoMenu />
                </div>

                <ul className="menu">
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
                        <NavLink to="/" className="links">
                            Meu caderno
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <Botao variant="btn-login-header" onClick={login}>
                <FaRegCircleUser />
                {usuario}
            </Botao>
        </header>
    );
};

export default Header;
