import React from "react";
import "./styles.css"
import { BiLoaderAlt } from "react-icons/bi";


function Loader({texto, className, variant}) {
const classesSpiner = `spinner ${variant}`

    return (
        <div className={className}>
            <BiLoaderAlt className={classesSpiner} />
            <p>{texto}</p>
        </div>
    );
}

export default Loader;
