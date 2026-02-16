import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/Loader";
import "./style.css";
import Header from "../../components/Header";

const API_URL = import.meta.env.VITE_API_URL;
// icones
import { FaRegClock } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";
import { PiChefHatBold } from "react-icons/pi";

// componentes
import ReceitaInfo from "../../components/ReceitaInfo";

const DetalhesReceita = () => {
    const { id } = useParams();

    const [receita, setReceita] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const buscarReceita = async () => {
            setLoading(true);
            try {
               const resposta = await axios.get(`${API_URL}/${id}`);
                // `http://localhost:3001/api/receitas/${id}` || `https://receitas-backend.onrender.com/api/receitas/${id}`,
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
                texto="Buscando ingredientes..."
                variant="spinner-detalhes"
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

                    <div className="infos">
                        <ReceitaInfo
                            icone={<FaRegClock />}
                            texto={`${receita.tempoPreparo} min`}
                        />
                        <ReceitaInfo
                            icone={<IoRestaurantOutline />}
                            texto={`${receita.porcoes} porções`}
                        />
                        <ReceitaInfo
                            icone={<PiChefHatBold />}
                            texto={`${receita.complexidade}`}
                        />
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
