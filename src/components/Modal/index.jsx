import React from "react";
import "./styles.css";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const Modal = ({ children, onClick }) => {
    const [mensagemFechar, setMensagemFechar] = useState("");

   

    return (
      // O children recebido aqui será o form-cadastro-admin
        <div className="modal">
            <button onClick={onClick} className="btn-fecha-modal-admin">
                <span className="msg-fechar-modal active">Fechar</span>
                <IoCloseSharp />
            </button>
            {children}
        </div>
    );
};

export default Modal;
