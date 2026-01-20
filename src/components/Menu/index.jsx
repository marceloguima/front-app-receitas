import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

// ICONES
import { MdMenuOpen } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

import "./styles.css";

const Menu = () => {
    const [menuAtivo, setMenuAtivo] = useState(false);

    const toggleMenu = () => {
        setMenuAtivo(!menuAtivo);
    };

    return (
        <>
            <ul className={menuAtivo ? "show-menu nav-links" : "nav-links hide-menu"}>
                <li>
                    <NavLink
                        to="/"
                        
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <a href="#sobremesas">Sobremesas</a>
                </li>
                <li>
                    <a href="#entradas">Entradas</a>
                </li>
                <li>
                    <a href="#Prato-principal">Prato principal</a>
                </li>

                <li>
                    <NavLink
                        to="/ia"
                        className="link-ia"
                    >
                        Crie com a IA
                    </NavLink>
                </li>
            </ul>

            <button className="btn-menu-mobile" onClick={toggleMenu}>
                {menuAtivo ? <IoCloseSharp /> : <MdMenuOpen />}
            </button>
            
        </>
    );
};

export default Menu;
