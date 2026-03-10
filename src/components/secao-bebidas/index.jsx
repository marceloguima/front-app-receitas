import React from 'react'
import "./styles.css"

const SecaoBebidas = ({children}) => {
  return (
    <section className="secoes" id="bebidas">
                      <h2 className="titulo-secao">Bebidas</h2>
  
                      <div className="circulos">
                       {children}
                      </div>
                  </section>
  )
}

export default SecaoBebidas
