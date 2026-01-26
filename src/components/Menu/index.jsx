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
                {/* <li className="item-menu"><a className="links-menu-sections" href="#home">Home</a></li> */}
                <li className="item-menu">
                    <a className="links-menu-sections" href="#entradas">
                        <BiSolidBowlHot />
                        Entradas
                    </a>
                </li>
                <li className="item-menu">
                    <a className="links-menu-sections" href="#prato-principal">
                        <MdDinnerDining />
                        Prato principal
                    </a>
                </li>
                <li className="item-menu">
                    <a className="links-menu-sections" href="#sobremesas">
                        <GiCakeSlice />
                        Sobremesas
                    </a>
                </li>
                <li className="item-menu">
                    <a className="links-menu-sections" href="#sobremesas">
                        <RiDrinks2Fill />
                        Bebidas
                    </a>
                </li>
                <li className="item-menu">
                    <a className="links-menu-sections" href="#Mais vistas">
                        <FaHotjar />
                        Mais vistas
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
