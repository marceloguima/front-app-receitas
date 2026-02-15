import React from "react";
import "./styles.css";
// icones

const ReceitaInfo = ({icone, texto}) => {
    return (
        <div className="info_rapida">
            <span className="icon-info">
                {icone}
            </span>
            <p>{texto}</p>
        </div>
    );
};

export default ReceitaInfo;
