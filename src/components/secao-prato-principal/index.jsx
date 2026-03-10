import React from 'react'
import "./styles.css"

const slideSecundary = ({children}) => {
  return (
     <section className="secoes" id="prato-principal">
                    <h2 className="titulo-secao">Prato Principal</h2>
                    <div className="cards-prato-principal">
                       {children}
                    </div>
                </section>
  )
}

export default slideSecundary
