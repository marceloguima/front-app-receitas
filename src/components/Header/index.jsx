import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";


import "./styles.css";
// icones
// import { IoHome } from "react-icons/io5";

const Header = () => {
    return (
        <header className="header">
            <nav className="nav-links-header">
                <ul className="links-header">
                    <li>
                        <NavLink to="/">
                            <Logo className="logo-header" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className="links_header">
                            {/* <IoHome /> */}
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/ia" className="btn-links-header">
                            Crie receitas com IA
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
