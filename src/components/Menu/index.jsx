import React from "react";

// ICONES
import { RiDrinks2Fill } from "react-icons/ri";
import { GiCakeSlice } from "react-icons/gi";
import { FaHotjar } from "react-icons/fa";
import { BiSolidBowlHot } from "react-icons/bi";
import { MdDinnerDining } from "react-icons/md";

import "./styles.css";

const Menu = () => {
    return (
        <nav className="nav-menu">
            
            <ul className="nav-itens-menu">
                <li className="item-menu">
                        <BiSolidBowlHot />
                    <a className="links-menu-sections" href="#entradas">
                        Entradas
                    </a>
                </li>
                <li className="item-menu">
                        <MdDinnerDining />
                    <a className="links-menu-sections" href="#prato-principal">
                        Prato principal
                    </a>
                </li>
                <li className="item-menu">
                        <GiCakeSlice />
                    <a className="links-menu-sections" href="#sobremesas">
                        Sobremesas
                    </a>
                </li>
                <li className="item-menu">
                        <RiDrinks2Fill />
                    <a className="links-menu-sections" href="#sobremesas">
                        Bebidas
                    </a>
                </li>
                <li className="item-menu">
                        <FaHotjar />
                    <a className="links-menu-sections" href="#Mais vistas">
                        Mais vistas
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
