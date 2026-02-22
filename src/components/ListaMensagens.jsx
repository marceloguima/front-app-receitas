import React from "react";


const ListaMensagens = ({ mensagens }) => {
    
    return (
        <>
            {mensagens.map((mensagem) => (
                <div
                    key={mensagem.id}
                    className={`caixa-texto ${mensagem.remetente}`}
                >
                  
                    <div className={`mensagem ${mensagem.remetente}`}>
                        {mensagem.remetente === "ia" ? (<div 
                            className="container-resposta-chefinho"
                            dangerouslySetInnerHTML={{ __html: mensagem.texto }} 
                        />) : (<p>{mensagem.texto}</p>)}
                    </div>
                </div>
                
            ))}

          
        </>
    );
};

export default ListaMensagens;
