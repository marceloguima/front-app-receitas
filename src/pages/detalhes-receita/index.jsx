import React from "react";
import Header from "../../components/Header";
import { FaRegClock } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import "./style.css";

const DetalhesReceita = () => {
    return (
        <>
            <Header />
            <section className="receita_completa">
                <div className="imgtitulo">
                    <img src="./publica/img-card1.png" alt="" />
                    <h1>Nome do prato</h1>
                </div>
                <div className="tempo_preparo_porcao">
                    <p>
                        <FiUsers /> <span>2 pessoas</span>
                    </p>
                    <p>
                        <FaRegClock />
                        <span>30 minutos</span>
                    </p>
                </div>
                <div className="ingredientes">
                    <h2>Ingredientes</h2>
                    <ul>
                        <li>1 xícara de chá de água morna (240 ml)</li>
                        <li>1 colher de sopa de açúcar</li>
                        <li>
                            1 e 1/2 colher de chá de fermento biológico seco (5
                            gramas)
                        </li>
                        <li>3 colheres de sopa de azeite</li>
                        <li>
                            2 e 1/2 xícaras de farinha de trigo sem fermento
                        </li>
                        <li>2 colheres de chá rasas de sal</li>
                    </ul>
                </div>
                <div className="modo_preparo">
                    <h2>Modo de preparo</h2>
                    <ol>
                        <li>
                            Para essa receita, escolha o recheio de sua
                            preferência! Organize sua bancada e separe todos os
                            ingredientes;
                        </li>
                        <li>
                            Em uma tigela grande, coloque a água morna, o
                            açúcar, o fermento, o azeite e misture bem até
                            dissolver completamente;
                        </li>
                        <li>
                            Adicione a farinha de trigo aos poucos, mexendo com
                            a mão até formar uma massa cremosa;
                        </li>
                        <li>
                            Junte o sal e continue acrescentando farinha
                            gradualmente até a massa começar a soltar levemente
                            das mãos;
                        </li>
                        <li>
                            Com a massa na bancada enfarinhada e sove
                            delicadamente por alguns minutos, adicionando mais
                            farinha se necessário, até a massa ficar lisa e
                            macia;
                        </li>
                        <li>
                            Modele em forma de bola, cubra com um pano limpo e
                            deixe descansar por cerca de 30 minutos, ou até
                            dobrar de volume;
                        </li>
                        <li>
                            Jogue a massa sobre a bancada enfarinhada e divida
                            em duas partes. Abra com a ajuda de um rolo, em
                            formato de pizza. Se necessário, polvilhe mais
                            farinha durante esse processo;
                        </li>
                        <li>
                            Transfira a massa para uma forma (30 cm)
                            enfarinhada, ajustando bem as bordas na assadeira e
                            faça furos sobre a massa com um garfo;
                        </li>
                        <li>
                            Preaqueça o forno a 280°C. Enquanto isso, distribua
                            o recheio escolhido sobre a massa (fizemos de
                            escarola com bacon e calabresa);
                        </li>
                        <li>
                            Leve para assar por 15 minutos ou até a massa ficar
                            dourada. Depois, retire do forno e sirva-se de
                            algumas fatias. Bom apetite!
                        </li>
                    </ol>
                </div>
            </section>
        </>
    );
};

export default DetalhesReceita;
