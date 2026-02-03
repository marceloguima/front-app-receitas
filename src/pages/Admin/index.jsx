import React, { Children } from "react";
import "./styles.css";
import Botao from "../../components/Botao";
import Modal from "../../components/Modal";
import { useState } from "react";

// icones
import { PiChefHatFill } from "react-icons/pi";
import { TfiAnnouncement } from "react-icons/tfi";
import FormAdmin from "../../components/Form-cadastro-admin";
import CampoEntradaAdmin from "../../components/Campo-entrada-admin";

const TelaAdmin = () => {
    const [showModal, setShowModal] = useState(false);

    const fechaModal = () => {
        setShowModal(false);
    };



    const mostrarModalReceita = () => {
        setShowModal(
            <Modal onClick={fechaModal}>
                <FormAdmin
                    titulo="Nova Receita"
                    descricao="Prencha os dados da receita"
                >
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
                    <CampoEntradaAdmin
                        tipo="textarea"
                        textLabel="Descrição da receita"
                        placeholder="Descreva sua receita..."
                        rows={5}
                    />{" "}
                    <div className="line-inputs">
                        <CampoEntradaAdmin
                            textLabel="Tempo de preparo (min)"
                            placeholder="Ex: 20"
                            tipo="number"
                        />{" "}
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
                    <CampoEntradaAdmin
                        textLabel="Ingredientes"
                        placeholder="Ex: 2 xícaras de farinha"
                    />
                    <CampoEntradaAdmin
                        tipo="textarea"
                        textLabel="Modo de preparo"
                        placeholder="Descreva sua receita..."
                        rows={5}
                    />{" "}
                     <CampoEntradaAdmin
                        textLabel="Imagem"
                        placeholder="Insira a URL da imagem"
                    />
                </FormAdmin>
            </Modal>,
        );
    };

    const mostrarModalAnuncio = () => {
        setShowModal(
            <Modal onClick={fechaModal}>
                <FormAdmin titulo="Cadastre um anúncio">
                    <CampoEntradaAdmin
                        textLabel="Nome"
                        placeholder="Titulo do anúncio"
                    />
                </FormAdmin>
            </Modal>,
        );
    };


  

    return (
        <div className="container-admin">
            <h1 className="titulo-admin">Olá Marcelo</h1>
            <h2 className="subtitulo-admin">
                Cadastre suas receitas e anúncios
            </h2>
            {showModal}
            <div className="botoes-select">
                <Botao onClick={mostrarModalReceita}>
                    <span className="icon">
                        <PiChefHatFill />
                    </span>
                    Cadastrar Receita
                </Botao>
                <Botao variant="cad-anuncio" onClick={mostrarModalAnuncio}>
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
