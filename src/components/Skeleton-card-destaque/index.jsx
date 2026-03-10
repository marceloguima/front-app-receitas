import React from 'react';
import './styles.css'; // Importe o CSS criado abaixo

const SkeletonCardDestaque = () => {
  return (
    // Reutiliza a classe 'card-destaque' para manter as dimensões e o layout base.
    // Adiciona 'skeleton-wrapper' para controle específico se necessário.
    <div className="card-destaque skeleton-wrapper">
      
      {/* Placeholder da Imagem (altura de 250px) */}
      <div className="skeleton-block skeleton-img"> <img src="./logo-skeleton-loader.png" alt="" /></div>

      <div className="info-destaque">
        {/* Placeholder do Título */}
        <div className="skeleton-block skeleton-title"></div>

        {/* Container das pílulas de informação (reutiliza a classe .info para o flex space-between) */}
        <div className="info">
          <div className="skeleton-block skeleton-pill"></div>
          <div className="skeleton-block skeleton-pill"></div>
          <div className="skeleton-block skeleton-pill"></div>
        </div>

        {/* Placeholder do Botão (altura de 45px) */}
        <div className="skeleton-block skeleton-button"></div>
      </div>
    </div>
  );
};

export default SkeletonCardDestaque;