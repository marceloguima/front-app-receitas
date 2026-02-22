import React from "react";
import { useState } from "react";
import ListaMensagens from "../ListaMensagens";
import { apiIA } from "../../conectaAxios/apiIA";
import Loader from "../Loader";

import "./styles.css";

import SaidaMensagem from "../Formulario-prompet";

// icones
import { IoCloseCircleOutline } from "react-icons/io5";

export default function OChefinho({
    className,
    variant,
    fechaIA,
    expandeIA,
    children,
}) {
    const classesChefinho = `${className || "minha-IA"}  ${variant}`;

    const [loading, setLoading] = useState(false);

    const [mensagens, setMensagens] = useState([
        {
            id: 1,
            remetente: "ia",
            texto: "Olá! Sou seu assistente de receitas. Diga-me quais ingredientes você tem, e eu criarei uma receita deliciosa para você!",
        },
    ]);

    const onEnviarMensagem = async (mensagem) => {
        if (loading || !mensagem.trim()) return;

        // 1. ADICIONAR MENSAGEM DO USUÁRIO AO CHAT
        const novaMensagemUsuario = {
            id: Date.now(),
            remetente: "user",
            texto: mensagem,
        };

        // Adiciona a mensagem do usuário ao histórico (UI)
        setMensagens((prevMensagens) => [
            ...prevMensagens,
            novaMensagemUsuario,
        ]);
        setLoading(true);

        // _______________________________________________________________________
        try {
            const resposta = await apiIA(mensagem);
            console.log("Resposta da API:", resposta);
            // ________________________________________________________________________
            const novaMensagemIA = {
                id: Date.now() + 1,
                remetente: "ia",

                texto: resposta || "Desculpe, não consegui gerar a receita.",
            };
            setLoading(false);

            setMensagens((prevMensagens) => [...prevMensagens, novaMensagemIA]);

            // ___________________________________________________________________
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);

            // ---------------------------------------------
            const erroMensagem = {
                id: Date.now() + 1,
                remetente: "ia",
                texto: "No momento estamos com problemas técnicos. Nossa equipe está trabalhando para resolver. Tente novamente mais tarde.",
            };
            setMensagens((prevMensagens) => [...prevMensagens, erroMensagem]);
        } finally {
            // 4. FINALIZA O LOADING
            setLoading(false);
        }
    };

    return (
        <>
            <main className={classesChefinho}>
                <header className="header-chef">
                    <div className="content-header-chef">
                        <img
                            src="./avatar-ia.png"
                            alt=""
                            className="imagem-ia-header"
                        />
                        <div className="title-chef-plano">
                        <h2 className="title-chef">O Chefinho</h2>
                        </div>
                    </div>
                    <div className="buttons-header-chef">
                        <button
                            className="botao-expandir-chef"
                            onClick={expandeIA}
                        >
                            {children}
                        </button>
                        <button className="botao-fechar-chef" onClick={fechaIA}>
                            <IoCloseCircleOutline />
                        </button>
                    </div>
                </header>

                <div className="area-chat">
                    <div className="mensagem_mensagens">
                        <ListaMensagens mensagens={mensagens} />
                    </div>

                    {loading && <Loader texto="Gerando sua receita..." />}
                    <div className="area-prompet">
                        <SaidaMensagem
                            onEnviarMensagem={onEnviarMensagem}
                            desabilitado={loading}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
