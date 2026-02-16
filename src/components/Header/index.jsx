import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";

import "./styles.css";
// icones
import { HiSparkles } from "react-icons/hi2";

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

                    <div className="link-home-link-ia">
                        <li>
                            <NavLink to="/" className="links_home">
                                {/* <IoHome /> */}
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/ia" className="btn-links-header">
                                <HiSparkles />
                                Crie receitas
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
