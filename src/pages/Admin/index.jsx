import React, { useState } from "react";
import "./styles.css";

// Componentes
import Botao from "../../components/Botao";
import Modal from "../../components/Modal";
import FormAdmin from "../../components/Form-cadastro-admin";
import CampoEntradaAdmin from "../../components/Campo-entrada-admin";

// Ícones
import { PiChefHatFill } from "react-icons/pi";
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

    /**
     * Lista de ingredientes da receita
     * Cada ingrediente contém: id único, nome, unidade de medida e quantidade
     */
    const [listaIngredientes, setListaIngredientes] = useState([
        { id: Date.now(), nome: "", unidade: "", quantidade: "" },
    ]);

    // ============================================================================
    // FUNÇÕES DE CONTROLE DOS MODAIS
    // ============================================================================

    /**
     * Abre o modal de cadastro de receitas
     */
    const abrirModalReceita = () => {
        setModalReceitaAberto(true);
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

            {/* ====================================================================
                MODAL DE CADASTRO DE RECEITAS
            ==================================================================== */}
            {modalReceitaAberto && (
                <Modal onClick={fecharModais}>
                    <FormAdmin
                        titulo="Nova Receita"
                        descricao="Prencha os dados da receita"
                    >
                        {/* Linha de inputs: Título e Categoria */}
                        <div className="line-inputs">
                            <CampoEntradaAdmin
                                textLabel="Titulo"
                                placeholder="Ex: Torta de limão"
                            />

                            <CampoEntradaAdmin
                                textLabel="Categoria *"
                                placeholder="Ex: Sobremesa, Prato principal, Bebida"
                            />
                        </div>

                        {/* Campo de descrição da receita */}
                        <CampoEntradaAdmin
                            tipo="textarea"
                            textLabel="Descrição da receita"
                            placeholder="Descreva sua receita..."
                            rows={5}
                        />

                        {/* Linha de inputs: Tempo, Rendimento e Nível */}
                        <div className="line-inputs">
                            <CampoEntradaAdmin
                                textLabel="Tempo de preparo (min)"
                                placeholder="Ex: 20"
                                tipo="number"
                            />

                            <CampoEntradaAdmin
                                textLabel="Rendimento em porções"
                                placeholder="Ex: 4"
                                tipo="number"
                            />

                            <CampoEntradaAdmin tipo="select" textLabel="Nível">
                                <option value="facil">Fácil</option>
                                <option value="medio">Médio</option>
                                <option value="dificil">Difícil</option>
                                <option value="chef">Nível Chef</option>
                            </CampoEntradaAdmin>
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
                                                        {`Tem certeza que quer excluir o
                                            ingrediente`}
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
                                            <CampoEntradaAdmin
                                                placeholder="Ex: Farinha de trigo"
                                                value={ingrediente.nome}
                                                onChange={(evento) =>
                                                    atualizarIngrediente(
                                                        ingrediente.id,
                                                        "nome",
                                                        evento.target.value,
                                                    )
                                                }
                                            />

                                            {/* Campo: Unidade de medida */}
                                            <CampoEntradaAdmin
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
                                            <CampoEntradaAdmin
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

                        {/* Campo de modo de preparo */}
                        <CampoEntradaAdmin
                            tipo="textarea"
                            textLabel="Modo de preparo"
                            placeholder="Descreva o modo de preparo..."
                            rows={5}
                        />

                        {/* Campo de imagem */}
                        <CampoEntradaAdmin
                            textLabel="Imagem"
                            placeholder="Insira a URL da imagem"
                        />
                    </FormAdmin>
                </Modal>
            )}

            {/* ====================================================================
                MODAL DE CADASTRO DE ANÚNCIOS
            ==================================================================== */}
            {modalAnuncioAberto && (
                <Modal onClick={fecharModais}>
                    <FormAdmin titulo="Cadastre um anúncio">
                        <CampoEntradaAdmin
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
                        <PiChefHatFill />
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
