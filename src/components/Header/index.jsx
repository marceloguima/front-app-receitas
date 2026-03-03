import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";

import "./styles.css";
// icones
import { FaRegCircleUser } from "react-icons/fa6";

// import { IoHome } from "react-icons/io5";

const Header = ({ abrirChat, fecharChat, login, usuario }) => {
    return (
        <header className="header">
            <nav className="nav-links-header">
                <ul className="links-header">
                    <li>
                        <Logo className="logo-header" />
                    </li>

                    <div className="link-home-link-ia">
                        <li>
                            <NavLink to="/" className="links_home">
                                Início
                            </NavLink>
                        </li>
                        <li>
                            {/* <button onClick={fecharChat} className="links_home">
                                Nossas receitas
                            </button> */}
                        </li>
                        <li>
                            <button
                                className="btn-links-header"
                                onClick={login}
                            >
<FaRegCircleUser />
                                {usuario}
                            </button>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
