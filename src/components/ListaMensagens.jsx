import React from "react";


const ListaMensagens = ({ mensagens }) => {
    
    return (
        <>
            {mensagens.map((mensagem) => (
                <div
                    key={mensagem.id}
                    className={`caixa-texto ${mensagem.remetente}`}
                >
                    <img
                        src={`./avatar-${mensagem.remetente}.png`}
                        alt={`imagem representando o ${mensagem.remetente}`}
                        className={`avatar-${mensagem.remetente}`}
                    />
                    <div className={`mensagem ${mensagem.remetente}`}>
                        <p>{mensagem.texto}</p>
                    </div>
                </div>
                
            ))}

            {/* {mensagens.map((msg, i) => (
                <div key={i} className={`mensagem ${msg.tipo}`}>
                    {msg.tipo === "usuario" && <p>{msg.texto}</p>}
                    {msg.tipo === "ia" && (
                        <div
                            className="receita-ia"
                            dangerouslySetInnerHTML={{ __html: msg.html }}
                        />
                    )}
                </div>
            ))} */}
        </>
    );
};

export default ListaMensagens;
