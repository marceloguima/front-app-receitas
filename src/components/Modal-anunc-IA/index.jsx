// import React from "react";
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import Botao from "../Botao";
// import { HiSparkles } from "react-icons/hi2";
// import "./styles.css";

// const ModalIA = ({ texto, duracao, intervalo }) => {
//     const [visivel, setVisivel] = useState(true);

//     useEffect(() => {
//         let hideTimeoutId;
//         const tempo = setInterval(() => {
//             setVisivel(true);

//             hideTimeoutId = setTimeout(() => {
//                 setVisivel(true);
//             }, duracao);
//         }, intervalo);

//         return () => {
//             clearInterval(tempo);
//             clearTimeout(hideTimeoutId);
//         };
//     }, [intervalo, duracao]);

//     return (
//         <div
//             className={
//                 visivel
//                     ? "mensagem-anuncio-IA show-anunc-iA"
//                     : "mensagem-anuncio-IA hiden-anunc-IA"
//             }
//         >
//             <div className="balao-IA">
//                 <p>{texto}</p>
//             </div>
//             <Botao variant="btn-img-ia">
//                 {/* <HiSparkles />
//                     Testar? */}
//                 <img
//                     src="./avatar-ia.png"
//                     alt="imagem robô"
//                     className="img-robo"
//                 />
//             </Botao>
//         </div>
//     );
// };

// export default ModalIA;
