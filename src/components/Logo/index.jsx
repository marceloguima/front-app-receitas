import React from "react";
import imagemLogo from "/logo2.png"

function Logo({className}) {
    return (
        <div className={className}>
            <img src={imagemLogo} alt="logo" />
        </div>
    );
}

export default Logo;
