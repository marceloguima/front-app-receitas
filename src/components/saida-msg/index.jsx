import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import { useState } from "react";

import "./styles.css";

const SaidaMensagem = ({onEnviarMensagem, desabilitado}) => {
const[mensagem, setMensagem] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    if (mensagem.trim() === "") return;
    onEnviarMensagem(mensagem);
    setMensagem("");
}

    return (
        <div className="area-saida-chat">
            <form  onSubmit={handleSubmit} >
                <input
                    type="text"
                    placeholder="Ex: arroz, alho, sal, bife e feijão."
                    value={mensagem}
                    onChange={(e)=>setMensagem(e.target.value)}
                    disabled={desabilitado}
                />
                <div className="area-buttons">
                    <button type="submit">
                        <FaLocationArrow />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SaidaMensagem;
