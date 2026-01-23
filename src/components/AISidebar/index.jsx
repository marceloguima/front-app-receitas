import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../Logo";

// icones
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { RiFileList3Line } from "react-icons/ri";
import { IoHome } from "react-icons/io5";

import "./styles.css";

const AISidebar = () => {
    const [sidBarOpen, setSidBarOpen] = useState(false);

    function togleSideBar() {
        setSidBarOpen(!sidBarOpen);
    }

    return (
        <aside
            className={
                sidBarOpen ? "sidbar sidbar-open" : "sidbar sidbar-close"
            }
        >
            <Logo className="logo-sidbar" />

            <div className="buttons">
                <button onClick={togleSideBar} className="btn-open-sidbar">
                    {sidBarOpen ? <MdClose /> : <RiMenuUnfoldFill />}
                </button>

                <ul className="list-sidbar">
                    <li>
                        <NavLink to="/" className="links">
                            <IoHome className="icon-home" />
                            {sidBarOpen ? "Home" : ""}
                        </NavLink>
                    </li>

                    <li>
                        <button className="btn-nova-receita">
                            <MdOutlineAddCircleOutline className="icon-nova-receita" />
                            {sidBarOpen ? " Nova conversa" : ""}
                        </button>
                    </li>
                    <li>
                        <p className="historico">
                            {sidBarOpen ? "Histórico" : ""}
                        </p>
                    </li>
                </ul>
                {sidBarOpen ? (
                    <ul className="lista-historico">
                        <li>
                            <Link>macarrão, carne</Link>
                        </li>
                        <li>
                            <Link>frango, batata</Link>
                        </li>
                        <li>
                            <Link>arroz, feijão, bife</Link>
                        </li>
                        <li>
                            <Link>tomate, cebola</Link>
                        </li>
                    </ul>
                ) : (
                    ""
                )}
            </div>
        </aside>
    );
};

export default AISidebar;
