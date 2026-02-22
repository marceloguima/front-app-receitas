import React from "react";
import "./styles.css";


const ReceitaInfo = ({icone, texto, variant}) => {
const classesDasInfo = `info_rapida ${variant}`

    return (
        <div className={classesDasInfo}>
            <span className="icon-info">
                {icone}
            </span>
            <p>{texto}</p>
        </div>
    );
};

export default ReceitaInfo;
