import React from "react";
import imagemLogo from "/logo.png"
import "./styles.css"

function Logo() {
    return (
        <div className="logo">
            <img src={imagemLogo} alt="logo" />
        </div>
    );
}

export default Logo;
