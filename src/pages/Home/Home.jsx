// Dependências
import React, { Children } from "react";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

// Função
import apiBuscaReceitas from "../../conectaAxios/apiBuscaReceitas";

// Skeletons de carregamento
import LoaderSkeletonCard from "../../components/Loader-skeleton";
import SkeletonCardCirculo from "../../components/Loader-skeleton-card-circle";
import SkeletonCardDestaque from "../../components/Skeleton-card-destaque";
import SkeletonCardMini from "../../components/Skeleton-card-mini";

// Componentes
import Header from "../../components/Header";
import Card from "../../components/card";
import Botao from "../../components/Botao";
import BotaoFavoritar from "../../components/Botao-favoritar";
import OChefinho from "../../components/Chefinho";
import Footer from "../../components/Footer";
import FormularioCadastroUsuario from "../../components/formulario-cad-user";
import FormularioLogin from "../../components/formulario-login";
import CardCirculo from "../../components/card-circular";
import ReceitaInfo from "../../components/ReceitaInfo";
import Slideprimary from "../../components/slide1";
import CardNavegacao from "../../components/Card-navegacao";

import { useContext } from "react";
import { AuthContext } from "../../context/Context";


// css
import "./home.css";

// ICONES
import { RiDrinks2Fill } from "react-icons/ri";
import { GiCakeSlice } from "react-icons/gi";
import { BiSolidBowlHot } from "react-icons/bi";
import { MdDinnerDining } from "react-icons/md";

import { MdOutlineCloseFullscreen } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiExpandDiagonalSFill } from "react-icons/ri";
import { PiChefHatBold } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";

export default function Home() {
    const {
        usuarioLogado,
        setUsuarioLogado,
        showFormulario,
        setShowFormulario,
        isLogin,
        setIsLogin,
    } = useContext(AuthContext);

    const [receitas, setReceitas] = useState([]);

    // ---------------------------------------------------------

    useEffect(() => {
        const checarTamanhoDaTela = () => {
            setIsMobile(window.innerWidth < 768);
        };
        // roda no primeiro caregamento para saber o tamanho da tela
        checarTamanhoDaTela();

        window.addEventListener("resize", checarTamanhoDaTela);

        return () => window.removeEventListener("resize", checarTamanhoDaTela);
    }, []);

    // paginação seção pratos principal
    const [cardClicado, setCardClicado] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const [paginaAtual, setPaginaAtual] = useState(0);
    const itensPorPagina = isMobile ? 4 : 7;

    const indiceInicio = paginaAtual * itensPorPagina;
    const indiceFim = indiceInicio + itensPorPagina;
    const receitasDestaTela = receitas.slice(indiceInicio, indiceFim);

    const cardDestaque =
        cardClicado ||
        (receitasDestaTela.length > 0 ? receitasDestaTela[0] : null);

    const cardsMini = receitasDestaTela.filter(
        (card) => cardDestaque && card._id !== cardDestaque._id,
    );

    const irProximaPagina = () => {
        if (indiceFim >= receitas.length) {
            setPaginaAtual(0);
        } else {
            setPaginaAtual(paginaAtual + 1);
        }
        setCardClicado(null);
    };

    // -----------------------------------------------------------------------

   

    const [chefOpen, setChefOpen] = useState(false);
    const [chefExpandido, setChefExpandido] = useState(false);

    const [busca, setBusca] = useState("");
    // loader para cards (ele é um skeleton)
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [mensagemIA, setMensagemIA] = useState(false);

    const [resultadosBusca, setResultadosBusca] = useState([]);
    const [fezBusca, setFezBusca] = useState(false);

    // Carrega os dados no início quando a página carrega
    useEffect(() => {
        async function carregarReceitas() {
            setLoading(true);
            try {
                const dados = await apiBuscaReceitas();
                setReceitas(dados);
                setLoading(false);
                console.log(dados);
            } catch (erro) {
                setLoading(true);
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

    // Chamando após o login, feca o formulário de login e abre a IA
    const criarReceitaComIA = (dadosDoUsuario) => {
        setUsuarioLogado(dadosDoUsuario);
        setShowFormulario(false)
    };

    // expandir ou encolher
    const expandirChatIA = () => {
        setChefExpandido(!chefExpandido);
    };

    const fecharChatIA = () => {
        setChefOpen(false);
        setChefExpandido(false);
        console.log("fechar chat");
    };

    // Mede o fim da página
    const lidarComScroll = (evento) => {
        evento.preventDefault();

        const elemento = evento.target;
        const totalRolado = elemento.scrollTop;
        const tamanhoDaTela = elemento.clientHeight;
        const tamanhoTotal = elemento.scrollHeight;

        if (totalRolado + tamanhoDaTela >= tamanhoTotal - 300) {
            // Ao chegar no fim da página aparece um balão com mensagem da IA e some depois de 5 segundos
            setMensagemIA(true);
            setTimeout(() => {
                setMensagemIA(false);
            }, 5000);
        }
    };

    const controleEntrada = () => {
        // Ao cllicar no avatar se não tiver logado abre o form para logar
        if(!usuarioLogado){
            setShowFormulario(true)
        }else{
            setChefOpen(true)
        }
        
    };

    // para botão de fechar formulário
    const closeFormulario =()=>{
        setShowFormulario(false)
    }

   
// para alternar quando o usuario entrar no formulário errado (se tem conta e ta no cadastro ou se não tem conata e ta em login)
    const alternaFormulario = () => {
        setIsLogin(!isLogin);
    };

    return (
        <>
            {/*------------------------------- Formulario de cadastro/Login ---------------------------------*/}
            {showFormulario && (
                <div className="formulario-cadastro-overlay">
                    <div className="corpo-formulario">
                        <button
                            className="btn-fecha-form"
                            type="button"
                            onClick={closeFormulario}
                        >
                            {" "}
                            <IoCloseCircleOutline />
                        </button>{" "}
                        <span className="texto-btn-fechar">Fechar</span>
                        {/* O Chat com a ia será apenas para usuários logados */}
                        {isLogin ? (
                            <FormularioLogin
                                liberaEntrada={criarReceitaComIA}
                            />
                        ) : (
                            <FormularioCadastroUsuario
                                alternaCadastroParaLogin={alternaFormulario}
                            />
                        )}
                        <div className="alternar-formulario">
                            <p>
                                {isLogin
                                    ? "Não tem uma conta?"
                                    : "Já tem uma conta?"}
                            </p>
                            <button type="button" onClick={alternaFormulario}>
                                {isLogin ? "Crie agora" : "Entrar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*-------------------------------------- Fim Formulario de cadastro/Login ------------------------------ */}

            <Header
                onSubmit={handleBuscar}
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />

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

            {/* /A sections é uma div que engloba todas as seções e é responsável por informar a posição de scroll.  */}
            <div className="sections" onScroll={lidarComScroll}>
                <section className="hero">
                    <div className="content-hero">
                        <div className="title-hero">
                            <h1>As melhores receitas você encontra aqui!</h1>
                        </div>
                    </div>
                </section>

                <nav className="nav-menu">
                    <ul className="menu-secoes">
                        <li>
                            <CardNavegacao
                                href="#entradas"
                                src="./img-entrada.png"
                                titulo="Entradas"
                            />
                        </li>
                        <li>
                            <CardNavegacao
                                href="#prato-principal"
                                src="./img-prato-principal.png"
                                titulo="Prato Principal"
                            />
                        </li>
                        <li>
                            <CardNavegacao
                                href="#sobremesas"
                                src="./img-sobremesa.png"
                                titulo="Sobremesas"
                            />
                        </li>
                        <li>
                            <CardNavegacao
                                href="#bebidas"
                                src="./img-bebida.png"
                                titulo="Bebidas"
                            />
                        </li>
                        <li>
                            <CardNavegacao
                                src="./img-receita-favorita.png"
                                titulo="Favoritas"
                            />
                        </li>
                    </ul>
                </nav>

                {/* SEÇÃO DE RESULTADOS DA BUSCA */}

                {fezBusca && (
                    <div className="resultados-busca-container">
                        <h2 className="titulo-secao">
                            {` ${resultadosBusca.length} resultados para "${busca}"`}
                        </h2>
                        <p className="mensagem-pratos-do-dia">{mensagem}</p>

                        {/* <SecaoEntradas>
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
                        </SecaoEntradas> */}
                    </div>
                )}

                {mensagem && <p>{mensagem}</p>}

                {/* Início seção entradas */}
                <section className="secoes secao-entradas" id="entradas">
                    <h2 className="titulo-secao">Entradas</h2>
                    <Slideprimary>
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                  <LoaderSkeletonCard key={i} />
                              ))
                            : Array.isArray(receitas) &&
                              receitas
                                  .filter(function (receita) {
                                      return receita.categoria === "Entrada";
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
                    </Slideprimary>
                </section>
                {/* Fim seção entradas */}

                {/* Início seção pratos principal */}
                <section
                    className="secoes secao-prato-principal"
                    id="prato-principal"
                >
                    <h2 className="titulo-secao">Pratos principal</h2>

                    <div className="cards-prato-principal">
                        {loading ? (
                            <SkeletonCardDestaque />
                        ) : (
                            cardDestaque && (
                                <div
                                    className="card-destaque"
                                    key={cardDestaque._id}
                                >
                                    <div className="info-top">
                                        <ReceitaInfo
                                            icone={<PiChefHatBold />}
                                            variant="pilula-info"
                                            texto={cardDestaque.complexidade}
                                        />
                                        <BotaoFavoritar />
                                    </div>
                                    <img
                                        src={cardDestaque.imagem}
                                        alt={cardDestaque.titulo}
                                    />
                                    <div className="info-destaque">
                                        <h3 className="titulo-card-destaque">
                                            {cardDestaque.titulo}
                                        </h3>
                                        <div className="info">
                                            <ReceitaInfo
                                                icone={<FaRegClock />}
                                                variant="pilula-info"
                                                texto={`${cardDestaque.tempoPreparo} min.`}
                                            />

                                            <ReceitaInfo
                                                icone={<IoRestaurantOutline />}
                                                variant="pilula-info"
                                                texto={`${cardDestaque.porcoes} porções`}
                                            />
                                        </div>
                                        <Botao variant="btn-card-destaque">
                                            Ver receita
                                        </Botao>
                                    </div>
                                </div>
                            )
                        )}
                        <div className="coluna-pequenos">
                            {loading
                                ? // A variável (intensPorPagina) usada abaixo, tem o resultado que varia  a quantidade de cards em diferentes tamanhos de tela
                                  Array.from({ length: isMobile ? 4 : 8 }).map(
                                      (_, i) => <SkeletonCardMini key={i} />,
                                  )
                                : cardsMini.map((receita) => (
                                      <div
                                          key={receita._id}
                                          className="card-mini"
                                          // chamando o State que guarda o clique!
                                          onClick={() =>
                                              setCardClicado(receita)
                                          }
                                      >
                                          <img
                                              src={receita.imagem}
                                              alt={receita.titulo}
                                          />
                                          <h4 className="titulo-card-mini">
                                              {receita.titulo}
                                          </h4>
                                      </div>
                                  ))}
                            {receitas.length > itensPorPagina && (
                                <button
                                    className="btn-ver-outras"
                                    onClick={irProximaPagina}
                                >
                                    Ver mais
                                </button>
                            )}
                        </div>
                    </div>
                </section>

                {/* ----Fim  seção pratos principal------ */}

                {/* Início seção sobremesas*/}
                <section className="secoes secao-sobremesas" id="sobremesas">
                    <h2 className="titulo-secao">Sobremesas</h2>

                    <Slideprimary>
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                  <LoaderSkeletonCard key={i} />
                              ))
                            : Array.isArray(receitas) &&
                              receitas
                                  .filter(function (receita) {
                                      return receita.categoria === "Sobremesa";
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
                    </Slideprimary>
                </section>

                {/* FIm seção sobremesas*/}

                {/* bebidas */}
                <section className="secoes secao-bebidas" id="bebidas">
                    <h2 className="titulo-secao">Bebidas</h2>

                    <div className="circulos">
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                  <SkeletonCardCirculo key={i} />
                              ))
                            : Array.isArray(receitas) &&
                              receitas
                                  .filter(function (receita) {
                                      return receita.categoria === "Bebida";
                                  })
                                  .map((receita) => (
                                      <CardCirculo
                                          key={receita._id}
                                          imagem={receita.imagem}
                                          titulo={receita.titulo}
                                          alt={`imagem de ${receita.titulo}`}
                                      />
                                  ))}
                    </div>
                </section>

                {/* Área do botão com avatar do chefinho */}
                <div className="campo-chama-chefinho">
                    {/* por enquanto estaou chamando o login toda vez que o usuario tentar usar a IA. */}
                    <button onClick={controleEntrada}>
                        <img src="./avatar-ia.png" alt="" />
                    </button>

                    <div
                        className={
                            mensagemIA ? "fala-do-chef ativa" : "fala-do-chef"
                        }
                    >
                        <p>
                            {mensagemIA
                                ? `Não achou o que queria? Fique tranquilo ${usuarioLogado ? usuarioLogado.nome : ""}! Me diga o que tem na geladeira e eu crio uma receita exclusiva pra você.`
                                : `Oi ${usuarioLogado ? usuarioLogado.nome : " eu sou o Chefinho!"}, Que tal criarmos uma receita juntos?`}
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
            {/* Fim área do botão com avatar do chefinho */}
        </>
    );
}
