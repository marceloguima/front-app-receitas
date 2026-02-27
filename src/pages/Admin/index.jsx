import React, { useState } from "react";
import "./styles.css";
import axios from "axios";

// Componentes
import Botao from "../../components/Botao";
import Modal from "../../components/Modal";
import FormAdmin from "../../components/Form-cadastro-admin";
import CampoInput from "../../components/Campo-entrada";
import Loader from "../../components/Loader";

// Ícones
import { PiChefHatBold } from "react-icons/pi";
import { TfiAnnouncement } from "react-icons/tfi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiPencil } from "react-icons/ti";

import { IoMdAdd } from "react-icons/io";

/**
 * Componente responsável pela tela de administração
 * Permite cadastro de receitas e anúncios através de modais
 */
const TelaAdmin = () => {
    // ============================================================================
    // ESTADOS DO COMPONENTE
    // ============================================================================

    /** Controla visibilidade do modal de cadastro de receitas */
    const [modalReceitaAberto, setModalReceitaAberto] = useState(false);

    /** Controla visibilidade do modal de cadastro de anúncios */
    const [modalAnuncioAberto, setModalAnuncioAberto] = useState(false);

    /** Controla visibilidade do modal de confirmação de deleção */
    const [modalDelete, setModalDelete] = useState(false);

    const [modalTelaMin, setModalTelaMin] = useState(false);

    // Estados do formulário
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tempoPreparo, setTempoPreparo] = useState("");
    const [porcoes, setPorcoes] = useState("");
    /**
     * Lista de ingredientes da receita
     * Cada ingrediente contém: id único, nome, unidade de medida e quantidade
     */
    const [listaIngredientes, setListaIngredientes] = useState([
        { id: Date.now(), nome: "", unidade: "", quantidade: "" },
    ]);
    const [modoPreparo, setModoPreparo] = useState("");
    const [complexidade, setComplexidade] = useState("fácil");
    const [categoria, setCategoria] = useState("");

    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(null)

    const [imagemSelecionada, setImagemSelecionada] = useState(null);
const [carregandoImagem, setCarregandoImagem] = useState(false);



    // ============================================================================
    // FUNÇÕES DE CONTROLE DOS MODAIS
    // ============================================================================

    /**
     * Abre o modal de cadastro de receitas
     */
    const abrirModalReceita = () => {
        setModalReceitaAberto(true);
        setModalTelaMin(true);
    };

    /**
     * Abre o modal de confirmação para apagar
     */
    const abrirModalConfirmaDelete = () => {
        setModalDelete(true);
    };

    /**
     * Fecha o modal de confirmação para apagar
     */
    const fecharModalConfirmaDelete = () => {
        setModalDelete(false);
    };

    /**
     * Abre o modal de cadastro de anúncios
     */
    const abrirModalAnuncio = () => {
        setModalAnuncioAberto(true);
    };

    /**
     * Fecha todos os modais abertos
     */
    const fecharModais = () => {
        setModalReceitaAberto(false);
        setModalAnuncioAberto(false);
        setModalTelaMin(false);
    };




    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Função auxiliar que sobe a foto pro Cloudinary
const uploadImagemParaCloudinary = async () => {
    if (!imagemSelecionada) return "";

    const dadosImagem = new FormData();
    dadosImagem.append("file", imagemSelecionada);
    
    dadosImagem.append("upload_preset", "ideia_de_sabor"); 
dadosImagem.append("cloud_name", "dpkyxrgal");    
    try {
        console.log("2. Enviando para o Cloudinary (via Fetch)...");
        
        // Usamos o fetch nativo para evitar qualquer interferência do Axios
        const resposta = await fetch(
            "https://api.cloudinary.com/v1_1/dpkyxrgal/image/upload",
            
            {
                method: "POST",
                body: dadosImagem,
            }
        );

        // O Cloudinary sempre devolve um JSON, mesmo quando dá erro
        const dados = await resposta.json();

        // Se a resposta não for um sucesso (ex: deu o maldito 401)
        if (!resposta.ok) {
            console.error("🚨 MOTIVO EXATO DO BLOQUEIO:", dados.error.message);
            alert("Erro no Cloudinary: " + dados.error.message);
            return "";
        }

        console.log("3. Sucesso! Link da imagem:", dados.secure_url);
        return dados.secure_url;
        
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        return "";
    }
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


    const salvarReceita = async (e) => {
        e.preventDefault();
        setLoading(true);

        let urlDaImagem = "";
console.log("1. Arquivo selecionado no input:", imagemSelecionada);

    if (imagemSelecionada) {
        console.log("2. Iniciando envio para o Cloudinary...");
        urlDaImagem = await uploadImagemParaCloudinary();
    
    console.log("3. URL devolvida pelo Cloudinary:", urlDaImagem);
    } else {
        console.log("AVISO: Nenhuma imagem foi selecionada.");
    }
        
        const novaReceita = {
            titulo,
            descricao,
            tempoPreparo: Number(tempoPreparo),
            porcoes: Number(porcoes),
            complexidade,
            categoria,
            imagem: urlDaImagem, // Usa a URL retornada do Cloudinary
            modoPreparo,
            ingredientes: listaIngredientes,
        };
        console.log("tentando enviar " + novaReceita);
        console.log(novaReceita.titulo);
        console.log(novaReceita.modoPreparo);
        
        try {
            const resposta = await axios.post(
                "http://localhost:3001/api/receitas",
                novaReceita,
            );
            console.log("Resposta do servidor:", resposta);
            
                
            
            setLoading(false);
            setMensagem("Receita cadastrada com sucesso!")
            setTimeout(() => {
                setMensagem("")
            }, 4000);

        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            console.error(
                "Erro detalhado:",
                erro.response ? erro.response.data : erro.message,
            );
            alert("Erro ao salvar receita. Veja o console.");
            setLoading(false);
        }
    };

    // ============================================================================
    // FUNÇÕES DE GERENCIAMENTO DE INGREDIENTES
    // ============================================================================

    /**
     * Adiciona um novo campo de ingrediente à lista
     * Gera um ID único baseado no timestamp atual
     */
    const adicionarNovoIngrediente = () => {
        const novoIngrediente = {
            id: Date.now(),
            nome: "",
            unidade: "",
            quantidade: "",
        };

        setListaIngredientes([...listaIngredientes, novoIngrediente]);
    };

    /**
     * Atualiza um campo específico de um ingrediente
     * @param {number} ingredienteId - ID único do ingrediente a ser atualizado
     * @param {string} nomeDoCampo - Nome do campo a ser atualizado (nome, unidade ou quantidade)
     * @param {string} novoValor - Novo valor a ser inserido no campo
     */
    const atualizarIngrediente = (ingredienteId, nomeDoCampo, novoValor) => {
        const ingredientesAtualizados = listaIngredientes.map((ingrediente) => {
            // Se o ID do ingrediente corresponde, atualiza o campo específico
            if (ingrediente.id === ingredienteId) {
                return { ...ingrediente, [nomeDoCampo]: novoValor };
            }
            // Caso contrário, retorna o ingrediente sem alterações
            return ingrediente;
        });

        setListaIngredientes(ingredientesAtualizados);
    };

    /**
     * Remove um ingrediente da lista
     * Mantém pelo menos um ingrediente na lista (proteção)
     * @param {number} ingredienteId - ID único do ingrediente a ser removido
     */
    const removerIngrediente = (ingredienteId) => {
        // Verifica se existe mais de um ingrediente antes de remover
        // Isso garante que sempre haverá pelo menos um campo de ingrediente
        if (listaIngredientes.length > 1) {
            const ingredientesFiltrados = listaIngredientes.filter(
                (ingrediente) => ingrediente.id !== ingredienteId,
            );
            setListaIngredientes(ingredientesFiltrados);
        }
        fecharModalConfirmaDelete();
        alert("apagando...");
    };

    // ============================================================================
    // RENDERIZAÇÃO DO COMPONENTE
    // ============================================================================

    return (
        <div className="container-admin">
            {/* Cabeçalho da página administrativa */}
            <h1 className="titulo-admin">Olá Marcelo</h1>
            <h2 className="subtitulo-admin">
                Cadastre suas receitas e anúncios
            </h2>

            {/* conteúdo para ser exibido caso o formulário seja aberto em telas pequenas, 
                    decidi não deixar essa tela responsiva para aparelhos menores que 900px, no momento achei desnecessário. */}

            {modalTelaMin && (
                <Modal variant="modal-tela-min" onClick={fecharModais}>
                    {" "}
                    <div className="alerta-tela-minima">
                        <h3>ATENÇÃO</h3>
                        <p>
                            Para fazer o cadastro de uma receita você precisa
                            acessar de uma tela maior que 900px, o seu aparelho
                            não comporta o conteúdo da página.{" "}
                        </p>
                    </div>
                </Modal>
            )}

            {/* ====================================================================
                MODAL DE CADASTRO DE RECEITAS
            ==================================================================== */}
            {modalReceitaAberto && (
                <Modal onClick={fecharModais} variant="modal-form-cadastro">
                    <FormAdmin
                        onSubmit={salvarReceita}
                        titulo="Nova Receita"
                        descricao="Prencha os dados da receita"
                    >
                        {/* Linha de inputs: Título e Categoria */}
                        <div className="line-inputs">
                            <CampoInput
                                textLabel="Titulo *"
                                placeholder="Ex: Torta de limão"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                required
                            />

                            <CampoInput
                                textLabel="Categoria *"
                                placeholder="Ex: Sobremesa, Prato principal, Bebida"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                                                required

                            />
                        </div>

                        {/* Campo de descrição da receita */}
                        <CampoInput
                            tipo="textarea"
                            textLabel="Descrição da receita *"
                            placeholder="Descreva sua receita..."
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            rows={5}
                        />

                        {/* Linha de inputs: Tempo, Rendimento e Nível */}
                        <div className="line-inputs">
                            <CampoInput
                                textLabel="Tempo de preparo (min) *"
                                placeholder="Ex: 20"
                                value={tempoPreparo}
                                onChange={(e) =>
                                    setTempoPreparo(e.target.value)
                                }
                                tipo="number"
                                                                required

                            />

                            <CampoInput
                                textLabel="Rendimento em porções *"
                                placeholder="Ex: 4"
                                value={porcoes}
                                onChange={(e) => setPorcoes(e.target.value)}
                                tipo="number"
                                                                required

                            />

                            <CampoInput
                                tipo="select"
                                textLabel="Nível"
                                value={complexidade}
                                onChange={(e) =>
                                    setComplexidade(e.target.value)
                                }
                            >
                                <option value="fácil">Fácil</option>
                                <option value="médio">Médio</option>
                                <option value="difícil">Difícil</option>
                                <option value="nivel-chef">Nível Chef</option>
                            </CampoInput>
                        </div>

                        {/* Seção de ingredientes dinâmica */}
                        <div className="container_ingredientes">
                            <h4>Ingredientes</h4>

                            <div className="caixa-campo-ingredientes">
                                <div className="campo-ingredientes">
                                    {/* Cabeçalhos dos campos de ingredientes */}
                                    <div className="nome-campos">
                                        <p>Nome do ingrediente</p>
                                        <p>Unidade de medida</p>
                                        <p>Quantidade</p>
                                    </div>

                                    {/* Renderização dinâmica dos campos de ingredientes */}
                                    {listaIngredientes.map((ingrediente) => (
                                        <div
                                            className="ingrediente"
                                            key={ingrediente.id}
                                        >
                                            {modalDelete && (
                                                <Modal variant="modal-confirmacao-apagar-ingrediente">
                                                    <p>
                                                        {
                                                            "Tem certeza que quer excluir "
                                                        }
                                                        {
                                                            <strong>
                                                                {ingrediente.nome}
                                                            </strong>
                                                        }
                                                    </p>
                                                    <div className="botoes-confirmacao">
                                                        <Botao
                                                            variant="btn-secundario"
                                                            type="button"
                                                            onClick={
                                                                fecharModalConfirmaDelete
                                                            }
                                                        >
                                                            Não
                                                        </Botao>
                                                        <Botao
                                                            variant="btn-danger"
                                                            type="button"
                                                            onClick={() =>
                                                                removerIngrediente(
                                                                    ingrediente.id,
                                                                )
                                                            }
                                                        >
                                                            Sim
                                                        </Botao>
                                                    </div>
                                                </Modal>
                                            )}

                                            {/* Campo: Nome do ingrediente */}
                                            <CampoInput
                                                placeholder="Ex: Farinha de trigo"
                                                value={ingrediente.nome}
                                                onChange={(evento) =>
                                                    atualizarIngrediente(
                                                        ingrediente.id,
                                                        "nome",
                                                        evento.target.value,
                                                    )
                                                }
                                                                                required

                                            />

                                            {/* Campo: Unidade de medida */}
                                            <CampoInput
                                                placeholder="Ex: Xícara, colher, ml..."
                                                value={ingrediente.unidade}
                                                onChange={(evento) =>
                                                    atualizarIngrediente(
                                                        ingrediente.id,
                                                        "unidade",
                                                        evento.target.value,
                                                    )
                                                }
                                            />

                                            {/* Campo: Quantidade */}
                                            <CampoInput
                                                tipo="number"
                                                placeholder="Ex: 2"
                                                value={ingrediente.quantidade}
                                                onChange={(evento) =>
                                                    atualizarIngrediente(
                                                        ingrediente.id,
                                                        "quantidade",
                                                        evento.target.value,
                                                    )
                                                }
                                            />

                                            <Botao
                                                variant="btn-p btn-p-editar"
                                                type="button"
                                                onClick={() =>
                                                    atualizarIngrediente(
                                                        ingrediente.id,
                                                    )
                                                }
                                            >
                                                <span>
                                                    <TiPencil />
                                                </span>
                                            </Botao>

                                            {/* Botão para remover ingrediente */}
                                            <Botao
                                                variant="btn-p btn-p-deletar btn-danger"
                                                type="button"
                                                onClick={
                                                    abrirModalConfirmaDelete
                                                }
                                            >
                                                <span>
                                                    <RiDeleteBin6Line />
                                                </span>
                                            </Botao>
                                        </div>
                                    ))}

                                    {/* Botão para adicionar novo ingrediente */}
                                    <Botao
                                        type="button"
                                        variant="add-ingrediente"
                                        onClick={adicionarNovoIngrediente}
                                    >
                                        <span>
                                            <IoMdAdd />
                                        </span>
                                        Ad. ingrediente
                                    </Botao>
                                </div>
                            </div>
                        </div>
{loading && ( <Loader texto="Enviando Receita..." className="loader-form-receita" variant="spinner-form-receita"/>)  }
<p className="msg-sucesso">
{mensagem}
</p>
                    
  {/* Campo de modo de preparo */}
                        <CampoInput
                            tipo="textarea"
                            textLabel="Modo de preparo"
                            placeholder="Descreva o modo de preparo..."
                            value={modoPreparo}
                            onChange={(e) => setModoPreparo(e.target.value)}
                            rows={5}
                        />

                        {/* Campo de imagem */}
                        <CampoInput
                        type="file"
                          accept="image/*"
                            textLabel="Foto da Receita"
                            placeholder="Insira a URL da imagem"
                            // value={imagem}
                            onChange={(e) => setImagemSelecionada(e.target.files[0])}
                            />
                            {carregandoImagem && <Loader texto="Enviando imagem..." variant="spinner-pequeno" className="loader-upload-imagem"/>}



                    </FormAdmin>
                </Modal>
            )}

            {/* ====================================================================
                MODAL DE CADASTRO DE ANÚNCIOS
            ==================================================================== */}
            {modalAnuncioAberto && (
                <Modal onClick={fecharModais}>
                    <FormAdmin titulo="Cadastre um anúncio">
                        <CampoInput
                            textLabel="Nome"
                            placeholder="Titulo do anúncio"
                        />
                    </FormAdmin>
                </Modal>
            )}

            {/* ====================================================================
                BOTÕES DE AÇÃO PRINCIPAL
            ==================================================================== */}
            <div className="botoes-select">
                {/* Botão para abrir modal de cadastro de receitas */}
                <Botao onClick={abrirModalReceita}>
                    <span className="icon">
                       <PiChefHatBold />

                    </span>
                    Cadastrar Receita
                </Botao>

                {/* Botão para abrir modal de cadastro de anúncios */}
                <Botao variant="cad-anuncio" onClick={abrirModalAnuncio}>
                    <span className="icon">
                        <TfiAnnouncement />
                    </span>
                    Cadastrar Anúncio
                </Botao>
            </div>
        </div>
    );
};

export default TelaAdmin;
