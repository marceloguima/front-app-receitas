import React from "react";
import imagemLogo from "/logo.png"

import { NavLink } from "react-router-dom";

import "./styles.css"

function Logo() {
    
    return (
        <NavLink className="logo" to="/">
            <img src={imagemLogo} alt="logo" />
        </NavLink>
    );
}

export default Logo;
