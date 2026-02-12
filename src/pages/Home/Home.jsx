import React from "react";
import Header from "../../components/Header";
import Card from "../../components/card";
import { useEffect, useState } from "react";
import apiBuscaReceitas from "../../conectaAxios/apiBuscaReceitas";
import LoaderSkeletonCard from "../../components/Loader-skeleton";
import Menu from "../../components/Menu";
import ModalIA from "../../components/Modal-anunc-IA";
import Footer from "../../components/Footer";

import { FaSearch } from "react-icons/fa";

import "./home.css";

export default function Home(props) {
    const [receitas, setReceitas] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    // const [tituloSecao, setatituloSecao] = useState("");
    const [mensagem, setMensagem] = useState("");

    useEffect(() => {
        async function carregarReceitas() {
            setLoading(true);
            try {
                const dados = await apiBuscaReceitas();
                setReceitas(dados);
                setLoading(false);
                console.log(dados);
            } catch (erro) {
                setLoading(false);
                setMensagem("Desculpe. Não consegui acessar o servidor.");
                console.error("erro ao carregar receitas", erro);
                console.log("deu erro");
            }




        }
        carregarReceitas();
    }, []);

    // buscar
    async function handleBuscar(evento) {
        evento.preventDefault();
        setLoading(true);
        try {
            const dados = await apiBuscaReceitas(busca);
            console.log("dados buscados " + dados);

            // verificação para alterar o título da seção conforme a busca evitando título vazio.
            if (busca == "") {
                setatituloSecao("Receitas do dia");
            } else {
                setatituloSecao(`Receita de ${busca}.`);
            }

            setLoading(false);
            // verificação para caso a busca não retorne resultados.
            if (dados == "") {
                //    alert("Não encontrei nenhuma receita com " + busca)
                setMensagem(
                    `Desculpe, no momento não encontramos receita com "${busca}". Fique à vontade para tentar outra!`,
                );
                setatituloSecao(tituloSecao);
                setTimeout(() => {
                    setMensagem("");
                }, 7000);

                carregarReceitas();
            } else {
                setMensagem("");
            }
            setLoading(false);

            setReceitas(dados);
        } catch (erro) {
            console.error("erro ao buscar receitas", erro);
            console.log("erro ao buscar");
            setLoading(false);
        }
    }

    return (
        <>
            <Header  />
            <div className="sections">
                <section className="hero">
                    <h1>As melhores receitas você encontra aqui!</h1>
                    <form className="form-buscar" value={busca} onChange={setBusca}  onSubmit={handleBuscar}>
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="input-barra-busca"
                            value={props.value}
                            onChange={(e) => onChange(e.target.value)}
                        />
                        <button type="submit" className="btn-buscar" >
                            <FaSearch />
                        </button>
                    </form>
                    <div className="conteudo-esquerdo"></div>
                </section>
                <Menu />

{/* Entradas */}
                <section className="pratos-do-dia">
                    <p className="mensagem-pratos-do-dia">{mensagem}</p>
                    <h2 className="titulo-secao">Entradas</h2>
                    <div className="cards_card">

                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                  <LoaderSkeletonCard key={i} />
                              ))
                            : Array.isArray(receitas) &&
                              receitas.filter(function(receita) {
                                return (
                                    receita.categoria === "Entrada" 
                                    
                                );
                              }).map((receita) => (
                                   
                                
                                  <Card
                                      key={receita.id}
                                      src={receita.imagem}
                                      alt={
                                          "imagem da receita de " + 
                                          receita.titulo
                                      }
                                      titulo={receita.titulo}
                                        tempoPreparo={`${receita.tempoPreparo} min`}
                                        complexidade={`${receita.complexidade}`}
                                        porcoes={`${receita.porcoes}`}
                                  />
                              ))} 
                    </div>
                </section>

{/* Pratos principais */}
                <section className="pratos-do-dia">
                    <h2 className="titulo-secao">Prato Principal</h2>
                    <div className="cards_card">

                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                  <LoaderSkeletonCard key={i} />
                              ))
                            : Array.isArray(receitas) &&
                              receitas.filter(function(receita) {
                                return (
                                    receita.categoria === "Prato Principal" 
                                    
                                );
                              }).map((receita) => (
                                   
                                
                                  <Card
                                      key={receita.id}
                                      src={receita.imagem}
                                      alt={
                                          "imagem da receita de " + 
                                          receita.titulo
                                      }
                                      titulo={receita.titulo}
                                        tempoPreparo={`${receita.tempoPreparo} min`}
                                        complexidade={`${receita.complexidade}`}
                                        porcoes={`${receita.porcoes}`}
                                  />
                              ))} 
                    </div>
                </section>

                
{/* bebidas */}
                <section className="pratos-do-dia">
                    <h2 className="titulo-secao">Bebidas</h2>
                    <div className="cards_card">

                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                  <LoaderSkeletonCard key={i} />
                              ))
                            : Array.isArray(receitas) &&
                              receitas.filter(function(receita) {
                                return (
                                    receita.categoria === "Bebidas" 
                                    
                                );
                              }).map((receita) => (
                                   
                                
                                  <Card
                                      key={receita.id}
                                      src={receita.imagem}
                                      alt={
                                          "imagem da receita de " + 
                                          receita.titulo
                                      }
                                      titulo={receita.titulo}
                                        tempoPreparo={`${receita.tempoPreparo} min`}
                                        complexidade={`${receita.complexidade}`}
                                        porcoes={`${receita.porcoes}`}
                                  />
                              ))} 
                    </div>
                </section>


                
{/* Sobremesas */}
                <section className="pratos-do-dia">
                    <h2 className="titulo-secao">Sobremesas</h2>
                    <div className="cards_card">

                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                  <LoaderSkeletonCard key={i} />
                              ))
                            : Array.isArray(receitas) &&
                              receitas.filter(function(receita) {
                                return (
                                    receita.categoria === "Sobremesa" 
                                    
                                );
                              }).map((receita) => (
                                   
                                
                                  <Card
                                      key={receita.id}
                                      src={receita.imagem}
                                      alt={
                                          "imagem da receita de " + 
                                          receita.titulo
                                      }
                                      titulo={receita.titulo}
                                        tempoPreparo={`${receita.tempoPreparo} min`}
                                        complexidade={`${receita.complexidade}`}
                                        porcoes={`${receita.porcoes}`}
                                  />
                              ))} 
                    </div>
                </section>

                <ModalIA
                    texto="Oie! Eu sou o chefinho, sou uma IA treinada para criar receitas para você!"
                    duracao={10000}
                    intervalo={21000}
                />
                <Footer />
            </div>
        </>
    );
}
