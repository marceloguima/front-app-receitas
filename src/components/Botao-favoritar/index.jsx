import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { useState } from "react";
import { MdFavorite } from "react-icons/md";

import "./styles.css"

const BotaoFavoritar = () => {
 const [favorito, setFavorito] = useState(false);

    function favoritar(e) {
        e.preventDefault();
        e.stopPropagation();
        setFavorito(!favorito);
        controleEntrada()
    }


    return (
        <button type="button" className="btn-favorito" onClick={favoritar}>
            {favorito ? <MdFavorite /> : <MdFavoriteBorder />}
        </button>
    );
};

export default BotaoFavoritar;
