import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";

import "./styles.css";
// icones
import { HiSparkles } from "react-icons/hi2";

// import { IoHome } from "react-icons/io5";

const Header = ({ abrirChat, fecharChat, login }) => {
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
                                {/* <HiSparkles /> */}
                               Login
                            </button>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
