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
import SlideSecundary from "../../components/secao-prato-principal";
import ReceitaInfo from "../../components/ReceitaInfo";

// seções
import SecaoEntradas from "../../components/secao-entradas";
import SecaoSobremesas from "../../components/secao-sobremesas";
import SecaoBebidas from "../../components/secao-bebidas";

// css
import "./home.css";

// ICONES
import { RiDrinks2Fill } from "react-icons/ri";
import { GiCakeSlice } from "react-icons/gi";
import { BiSolidBowlHot } from "react-icons/bi";
import { MdDinnerDining } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { RiExpandDiagonalSFill } from "react-icons/ri";
import { PiChefHatBold } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";

export default function Home() {
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
            setPaginaAtual(0); // Volta pro começo se acabou a lista
        } else {
            setPaginaAtual(paginaAtual + 1); // Vai pro próximo lote
        }
        setCardClicado(null); // Zera o clique para o novo lote assumir o topo
    };

    console.log("cards mini", cardsMini);
    // -----------------------------------------------------------------------
    // para veerificar------------------
    const [categoriaAtiva, setCategoriaAtiva] = useState("todas");
    // para veerificar------------------

    const [chefOpen, setChefOpen] = useState(false);
    const [chefExpandido, setChefExpandido] = useState(false);

    const [busca, setBusca] = useState("");
    // loader para cards (ele é um skeleton)
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [mensagemIA, setMensagemIA] = useState(false);

    const [resultadosBusca, setResultadosBusca] = useState([]);
    const [fezBusca, setFezBusca] = useState(false);

    const [showFormulario, setShowFormulario] = useState(false);
    // loader spinner
    const [isLogin, setIsLogin] = useState(false);

    const [usuarioLogado, setUsuarioLogado] = useState(null);

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
        closeFormulario();
        setChefOpen(true);
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

    // cadastro/login de usuario
    const controleEntrada = () => {
        setShowFormulario(true);
    };

    const closeFormulario = () => {
        setShowFormulario(false);
    };

    const alternaFormulario = () => {
        setIsLogin(!isLogin);
    };

    // lista só com as receitas que NÃO são o destaque atual

    return (
        <>
            <Header
                login={controleEntrada}
                usuario={
                    usuarioLogado ? `Olá, ${usuarioLogado.nome}` : "Faça login"
                }
            >
                {" "}
                <form className="form-buscar" onSubmit={handleBuscar}>
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
                </form>{" "}
            </Header>
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
                        <div className="title-serach-bar">
                            <h1>As melhores receitas você encontra aqui!</h1>
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
                    </section>
                )}

                <p className="mensagem-pratos-do-dia">{mensagem}</p>
                {/* Início seção entradas */}
                <SecaoEntradas>
                    {" "}
                    {loading
                        ? Array.from({ length: 4 }).map((_, i) => (
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
                </SecaoEntradas>
                {/* Fim seção entradas */}

                {/* Início seção pratos principal */}
                <SlideSecundary>
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
                                      onClick={() => setCardClicado(receita)}
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
                </SlideSecundary>
                {/* ----Fim  seção pratos principal------ */}

                {/* Início seção sobremesas*/}
                <SecaoSobremesas
                    cardReceita={
                        loading
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
                                  ))
                    }
                />
                {/* FIm seção sobremesas*/}

                {/* bebidas */}
                <SecaoBebidas>
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
                </SecaoBebidas>

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
        </>
    );
}
