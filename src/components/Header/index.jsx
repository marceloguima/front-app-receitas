import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import Logo from "../Logo";

// ICONES
import { MdSearchOff } from "react-icons/md";
import { MdSearch } from "react-icons/md";

import { FaSearch } from "react-icons/fa";
import "./styles.css";

const Header = (props) => {
    const [formulariovisivel, setFormularioVisivel] = useState(false);

    const mostrarFormulario = () => {
        setFormularioVisivel(!formulariovisivel);
        setTimeout(() => {
            setFormularioVisivel(false);
        }, 8000);
    };

  
    return (
        <header
            className={formulariovisivel ? "header header-expandido" : "header"}
        >
            <nav>
                <div className="logo-btn_search-menu">
                    <Logo className="logo-home" />
                    <div className="div-btn_search-menu">
                        <button
                            className="btn-abrir-busca"
                            onClick={mostrarFormulario}
                        >
                            {/* <FaSearch /> */}
                            {formulariovisivel ? <MdSearchOff /> : <MdSearch />}
                        </button>
                        <Menu />
                    </div>
                </div>

                {formulariovisivel && (
                    <form className="form-buscar" onSubmit={props.onSubmit}>
                        <input
                            type="text"
                            placeholder="Digite sua receita"
                            className="input-barra-busca"
                            value={props.value}
                            onChange={(e) => props.onChange(e.target.value)}
                        />
                        <button type="submit" className="btn-buscar">
                            <FaSearch />
                        </button>
                    </form>
                )}
            </nav>
        </header>
    );
};

export default Header;
