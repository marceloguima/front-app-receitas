import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";

import "./style.css";
import Header from "../../components/Header";

const DetalhesReceita = () => {
    const { id } = useParams();

    const [receita, setReceita] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarReceita = async () => {
            try {
                const resposta = await axios.get(
                    `http://localhost:3001/receitas/${id}`,
                );
                setReceita(resposta.data);
                setLoading(false);
            } catch (erro) {
                console.error("Erro ao buscar a receita:", erro);
                setLoading(false);
            }
        };

        buscarReceita();
    }, [id]); // O useEffect roda de novo se o ID mudar

    if (loading) {
        return (
            <Loader
                texto="Aguarde um instante"
                variant="spinner-form-receita"
            />
        );
    }

    if (!receita) {
        return <h2>Receita não encontrada! 😢</h2>;
    }

    return (
        <>
            <Header />
            <div className="container-detalhes">
                <h1>{receita.titulo}</h1>
                <p className="descricao">{receita.descricao}</p>

                <div className="imagem-container">
                    <img
                        src={receita.imagem}
                        alt={receita.titulo}
                        className="imagem-destaque"
                    />

                    {/* A info-rapida agora fica AQUI DENTRO, logo abaixo da img */}
                    <div className="info-rapida">
                        <span>⏱️ {receita.tempoPreparo} min</span>
                        <span>🍽️ {receita.porcoes} porções</span>
                    </div>
                </div>

                <div className="sessao-ingredientes">
                    <h3>Ingredientes</h3>
                    <ul>
                        {receita.ingredientes.map((ingrediente) => (
                            <li key={ingrediente._id}>
                                <strong>
                                    {ingrediente.quantidade}{" "}
                                    {ingrediente.unidade}
                                </strong>{" "}
                                de {ingrediente.nome}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="sessao-preparo">
                    <h3>Modo de Preparo</h3>
                    <p>{receita.modoPreparo}</p>
                </div>
            </div>
        </>
    );
};

export default DetalhesReceita;
