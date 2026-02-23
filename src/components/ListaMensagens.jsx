// import React, { useState } from "react";

// // ícones
// import { BiLike } from "react-icons/bi";
// import { BiSolidLike } from "react-icons/bi";
// import { BiSolidDislike } from "react-icons/bi";
// import { BiDislike } from "react-icons/bi";

// const ListaMensagens = ({ mensagens }) => {
//     const [like, setLike] = useState(false);
//     const [desLike, setDesLike] = useState(false);

//     const darLike = () => {
//         setLike(!like);
//         setDesLike(false);
//     };

//     const darDesLike = () => {
//         setDesLike(!desLike);
//         setLike(false);
//     };

//     return (
//         <>
//             {mensagens.map((mensagem) => (
//                 <div
//                     key={mensagem.id}
//                     className={`caixa-texto ${mensagem.remetente}`}
//                 >
//                     <div className={`mensagem ${mensagem.remetente}`}>
//                         {mensagem.remetente === "ia" ? (
//                             <div
//                                 className="container-resposta-chefinho"
//                                 dangerouslySetInnerHTML={{
//                                     __html: mensagem.texto,
//                                 }}
//                             />
//                         ) : (
//                             <p>{mensagem.texto}</p>
//                         )}
//                     </div>
//                     <div className="btn-like">
//                         <button onClick={darLike}>
//                             {like ? <BiSolidLike /> : <BiLike />}
//                         </button>
//                         <button onClick={darDesLike}>
//                             {desLike ? <BiSolidDislike /> : <BiDislike />}
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </>
//     );
// };

// export default ListaMensagens;





import React, { useState } from "react";

// ícones
import { BiLike, BiSolidLike, BiSolidDislike, BiDislike } from "react-icons/bi";

// 1. CRIAMOS O COMPONENTE FILHO: Ele cuida apenas de UMA mensagem e do seu próprio Like
const ItemMensagem = ({ mensagem }) => {
    const [like, setLike] = useState(false);
    const [desLike, setDesLike] = useState(false);

    const darLike = () => {
        setLike(!like);
        setDesLike(false);
    };

    const darDesLike = () => {
        setDesLike(!desLike);
        setLike(false);
    };

    return (
        <div className={`caixa-texto ${mensagem.remetente}`}>
            <div className={`mensagem ${mensagem.remetente}`}>
                {mensagem.remetente === "ia" ? (
                    <div
                        className="container-resposta-chefinho"
                        dangerouslySetInnerHTML={{
                            __html: mensagem.texto,
                        }}
                    />
                ) : (
                    <p>{mensagem.texto}</p>
                )}
            </div>
            
            {/* Opcional, mas recomendado: Só mostra o Like/Dislike se for mensagem da IA */}
            {mensagem.remetente === "ia" && (
                <div className="btn-like">
                    <button onClick={darLike}>
                        {like ? <BiSolidLike /> : <BiLike />}
                    </button>
                    <button onClick={darDesLike}>
                        {desLike ? <BiSolidDislike /> : <BiDislike />}
                    </button>
                </div>
            )}
        </div>
    );
};

// 2. O COMPONENTE PAI: Agora ele só faz o map e chama o filho
const ListaMensagens = ({ mensagens }) => {
    return (
        <>
            {mensagens.map((mensagem) => (
                <ItemMensagem key={mensagem.id} mensagem={mensagem} />
            ))}
        </>
    );
};

export default ListaMensagens;