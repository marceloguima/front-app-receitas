import React, { useState } from "react";

// ícones
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";

const ListaMensagens = ({ mensagens }) => {
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
        <>
            {mensagens.map((mensagem) => (
                <div
                    key={mensagem.id}
                    className={`caixa-texto ${mensagem.remetente}`}
                >
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
                    <div className="btn-like">
                        <button onClick={darLike}>
                            {like ? <BiSolidLike /> : <BiLike />}
                        </button>
                        <button onClick={darDesLike}>
                            {desLike ? <BiSolidDislike /> : <BiDislike />}
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ListaMensagens;
