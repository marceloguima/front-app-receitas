import React from "react";
import { useState } from "react";
import AISidebar from "../../components/AISidebar";
import ListaMensagens from "../../components/ListaMensagens";
import { apiIA } from "../../conectaAxios/apiIA";

import { BiLoaderAlt } from "react-icons/bi";
// import { PiChefHat } from "react-icons/pi";

import "./AIGenerator.css";

import SaidaMensagem from "../../components/saida-msg";

export default function AIRecipeGenerator() {
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
                texto: "⚠️ O Chefe IA está indisponível. Verifique o servidor Express (porta 3001).",
            };
            setMensagens((prevMensagens) => [...prevMensagens, erroMensagem]);
        } finally {
            // 4. FINALIZA O LOADING
            setLoading(false);
        }
    };

    return (
        <>
            <AISidebar />

            {console.log(<AISidebar />)}
            <main className="chat">
                <div className="area-chat">
                    <ListaMensagens mensagens={mensagens} />
                </div>

                {loading && (
                    <div className="loading-overlay">
                        {/* <PiChefHat className="hat-chef" /> */}
                        <BiLoaderAlt className="spinner" />
                        <p>Gerando sua receita aguarde...</p>
                        <div className="spinner"></div>
                    </div>
                )}
                <SaidaMensagem
                    onEnviarMensagem={onEnviarMensagem}
                    desabilitado={loading}
                />
            </main>
        </>
    );
}
