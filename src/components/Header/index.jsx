import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import BarraDeBusca from "../Barra-busca";

import "./styles.css";
// icones
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

const Header = ({ login, usuario, onSubmit, value, onChange }) => {
const [isMobile, setIsMobile] = useState(false)

const showMenu = ()=>{
setIsMobile(!isMobile)
}

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
             

                <ul className={`menu ${isMobile ? "show-menu-mobile" : "hidden-menu" }`}>
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
                   <button className="btn-login" onClick={login}>
                    <FaRegCircleUser />
                    {usuario}
                </button>

                <button className="btn-menu" onClick={showMenu}>
                    <IoMenu />
                </button>
            </nav>
        </header>
    );
};

export default Header;
