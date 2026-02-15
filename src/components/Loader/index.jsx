import React from "react";
import "./styles.css"
import { BiLoaderAlt } from "react-icons/bi";


function Loader({texto, variant}) {
const classesSpiner = `caixa-spinner ${variant}`

    return (
        <div className={classesSpiner}>
            <BiLoaderAlt className="spinner"/>
            <p>{texto}</p>
        </div>
    );
}

export default Loader;
