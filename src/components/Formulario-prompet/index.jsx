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
        <div className="area-input-chat">
            <form  onSubmit={handleSubmit} >
                <input
                    type="text"
                    placeholder="Escreva o seu pedido."
                    value={mensagem}
                    onChange={(e)=>setMensagem(e.target.value)}
                    disabled={desabilitado}
                />
                    <button type="submit">
                        <FaLocationArrow />
                    </button>
            </form>
        </div>
    );
};

export default SaidaMensagem;
