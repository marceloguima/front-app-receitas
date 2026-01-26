import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../Logo";


import "./styles.css";

const Header = () => {

   

    return (
        <header className="header">
            <nav>
                <div className="logo-btn-ia">
                    <Logo className="logo-home" />
                    <div className="link-ia">
                        <NavLink to="/ia" className="btn-link-ia">
                            Crie receitas com IA
                        </NavLink>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
