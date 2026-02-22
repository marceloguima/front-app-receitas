import React, { Children } from "react";
import Header from "../../components/Header";
import Card from "../../components/card";
import { useEffect, useState } from "react";
import apiBuscaReceitas from "../../conectaAxios/apiBuscaReceitas";
import LoaderSkeletonCard from "../../components/Loader-skeleton";
import Botao from "../../components/Botao";
import OChefinho from "../../components/Chefinho";
import Footer from "../../components/Footer";
// import ModalIA from "../../components/Modal-anunc-IA";

// ICONES
import { RiDrinks2Fill } from "react-icons/ri";
import { GiCakeSlice } from "react-icons/gi";
import { BiSolidBowlHot } from "react-icons/bi";
import { MdDinnerDining } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import { MdOutlineCloseFullscreen } from "react-icons/md";
import { RiExpandDiagonalSFill } from "react-icons/ri";

import "./home.css";

export default function Home() {
    const [receitas, setReceitas] = useState([]);

    const [categoriaAtiva, setCategoriaAtiva] = useState("todas");
    const [chefOpen, setChefOpen] = useState(false);
    const [chefExpandido, setChefExpandido] = useState(false);

    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(true);
    const [mensagem, setMensagem] = useState("");
    const [mensagemIA, setMensagemIA] = useState(false);

    const [resultadosBusca, setResultadosBusca] = useState([]);
    const [fezBusca, setFezBusca] = useState(false);

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

        if (busca.trim() === "") {
            setFezBusca(false);
            setResultadosBusca([]);
            setLoading(false);
            return;
        }
        try {
            const dados = await apiBuscaReceitas(busca);
            console.log("dados buscados ", dados);

            setResultadosBusca(dados);
            setFezBusca(true);

            if (dados.length === 0) {
                setMensagem(
                    `Desculpe, não encontramos receita com "${busca}".`,
                );
                setTimeout(() => setMensagem(""), 7000);
            } else {
                setMensagem("");
            }

        } catch (erro) {
            console.error("erro ao buscar receitas", erro);
            console.log("erro ao buscar");
        }
        setLoading(false);
    }

    const criarReceitaComIA = () => {
        setChefOpen(true);
        console.log("abrir chat");
    };

    
    const expandirChatIA = () => {
        setChefExpandido(!chefExpandido);
        console.log("expandir chat");
    };

    const fecharChatIA = () => {
        setChefOpen(false);
        setChefExpandido(false);
        console.log("fechar chat");
    };



// Mede o fim da página
const lidarComScroll = (evento) => {
    evento.preventDefault()
    const elemento = evento.target;
    
    const totalRolado = elemento.scrollTop;
    const tamanhoDaTela = elemento.clientHeight;
    const tamanhoTotal = elemento.scrollHeight;

    if (totalRolado + tamanhoDaTela >= tamanhoTotal - 80) {
        console.log("Chegou no fim da página! Hora de chamar mais receitas!");
        
      setMensagemIA(true)
    }
    if(totalRolado + tamanhoDaTela < tamanhoTotal - 500)
    setMensagemIA(false)
};


    return (
        <>
            <Header abrirChat={criarReceitaComIA} />
            <OChefinho
                variant={
                    chefOpen
                        ? chefExpandido
                            ? "expandido"
                            : "aberto"
                        : "fechado"
                }
                fechaIA={fecharChatIA}
                expandeIA={expandirChatIA}
                children={
                    chefExpandido ? (
                        <MdOutlineCloseFullscreen />
                    ) : (
                        <RiExpandDiagonalSFill />
                    )
                }
            />

            <div className="sections" onScroll={lidarComScroll}>
                <section className="hero">
                    <div className="content-hero">
                        <div className="title-serach-bar">
                            <h1>As melhores receitas você encontra aqui!</h1>
                            <form
                                className="form-buscar"
                                onSubmit={handleBuscar}
                            >
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    className="input-barra-busca"
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                />
                                <button type="submit" className="btn-buscar">
                                    <FaSearch />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                <nav className="nav-menu">
                    <ul className="nav-itens-menu">
                        <li>
                            <Botao
                                onClick={() => setCategoriaAtiva("entradas")}
                            >
                                {" "}
                                <BiSolidBowlHot /> Entradas
                            </Botao>
                        </li>
                        <li>
                            <Botao
                                onClick={() =>
                                    setCategoriaAtiva("pratoPrincipal")
                                }
                            >
                                {" "}
                                <MdDinnerDining /> Prato principal
                            </Botao>
                        </li>
                        <li>
                            <Botao
                                onClick={() => setCategoriaAtiva("sobremesas")}
                            >
                                {" "}
                                <GiCakeSlice /> Sobremesas
                            </Botao>
                        </li>
                        <li>
                            <Botao onClick={() => setCategoriaAtiva("bebidas")}>
                                {" "}
                                <RiDrinks2Fill /> Bebidas
                            </Botao>
                        </li>
                    </ul>
                </nav>

                {/* SEÇÃO DE RESULTADOS DA BUSCA */}
                {fezBusca && (
                    <section className="pratos-do-dia resultados-busca">
                        <h2 className="titulo-secao">
                            {` ${resultadosBusca.length} resultados para "${busca}"`}
                        </h2>
                        <p className="mensagem-pratos-do-dia">{mensagem}</p>

                        <div className="cards_card">
                            {loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <LoaderSkeletonCard key={i} />
                                ))
                            ) : resultadosBusca.length > 0 ? (
                                resultadosBusca.map((receita) => (
                                    <Card
                                        _id={receita._id}
                                        key={receita._id}
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
                                ))
                            ) : (
                                <p>
                                    Nenhuma receita encontrada. Que tal
                                    perguntar para O Chefinho?
                                </p>
                            )}
                        </div>
                        <hr />
                    </section>
                )}

                {/* Entradas */}
                {(categoriaAtiva === "entradas" ||
                    categoriaAtiva === "todas") && (
                    <section className="pratos-do-dia" id="entradas">
                        <p className="mensagem-pratos-do-dia">{mensagem}</p>
                        <h2 className="titulo-secao">Entradas</h2>
                        <div className="cards_card">
                            {loading
                                ? Array.from({ length: 8 }).map((_, i) => (
                                      <LoaderSkeletonCard key={i} />
                                  ))
                                : Array.isArray(receitas) &&
                                  receitas
                                      .filter(function (receita) {
                                          return (
                                              receita.categoria === "Entrada"
                                          );
                                      })
                                      .map((receita) => (
                                          <Card
                                              _id={receita._id}
                                              key={receita._id}
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
                )}

                {/* Pratos principais */}
                {(categoriaAtiva === "pratoPrincipal" ||
                    categoriaAtiva === "todas") && (
                    <section className="pratos-do-dia" id="prato-principal">
                        <h2 className="titulo-secao">Prato Principal</h2>
                        <div className="cards_card">
                            {loading
                                ? Array.from({ length: 8 }).map((_, i) => (
                                      <LoaderSkeletonCard key={i} />
                                  ))
                                : Array.isArray(receitas) &&
                                  receitas
                                      .filter(function (receita) {
                                          return (
                                              receita.categoria.toLowerCase() ===
                                              "prato principal"
                                          );
                                      })
                                      .map((receita) => (
                                          <Card
                                              _id={receita._id}
                                              key={receita._id}
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
                )}

                {/* bebidas */}
                {(categoriaAtiva === "bebidas" ||
                    categoriaAtiva === "todas") && (
                    <section className="pratos-do-dia" id="bebidas">
                        <h2 className="titulo-secao">Bebidas</h2>
                        <div className="cards_card">
                            {loading
                                ? Array.from({ length: 8 }).map((_, i) => (
                                      <LoaderSkeletonCard key={i} />
                                  ))
                                : Array.isArray(receitas) &&
                                  receitas
                                      .filter(function (receita) {
                                          return (
                                              receita.categoria === "Bebidas"
                                          );
                                      })
                                      .map((receita) => (
                                          <Card
                                              _id={receita._id}
                                              key={receita._id}
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
                )}

                {/* Sobremesas */}
                {(categoriaAtiva === "sobremesas" ||
                    categoriaAtiva === "todas") && (
                    <section className="pratos-do-dia" id="sobremesas">
                        <h2 className="titulo-secao">Sobremesas</h2>
                        <div className="cards_card">
                            {loading
                                ? Array.from({ length: 8 }).map((_, i) => (
                                      <LoaderSkeletonCard key={i} />
                                  ))
                                : Array.isArray(receitas) &&
                                  receitas
                                      .filter(function (receita) {
                                          return (
                                              receita.categoria === "Sobremesa"
                                          );
                                      })
                                      .map((receita) => (
                                          <Card
                                              _id={receita._id}
                                              key={receita._id}
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
                )}

                

                <div className="campo-chama-chefinho">
                    <button onClick={criarReceitaComIA}>
                        <img src="./avatar-ia.png" alt="" />
                    </button>

                    <div className={mensagemIA ? "fala-do-chef ativa" : "fala-do-chef"}>
                <p>{mensagemIA ? "Não achou o que queria? Fique tranquilo! Me diga o que tem na geladeira e eu crio uma receita exclusiva pra você." : "Oi, sou o Chefinho! Que tal criarmos uma receita juntos?"}</p>
                    </div>
                </div>
                <Footer />
            </div>
            {/* </div> */}
        </>
    );
}
