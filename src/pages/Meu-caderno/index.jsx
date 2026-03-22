import React from 'react'
import "./styles.css"
import Header from '../../components/Header'

const TelaMeuCaderno = () => {
  return (
   <div className='meu-caderno'>
      <Header/>
      <h1>Breve a tela "meu caderno".</h1>
      <p>Aqui serão mostradas a receitas geradas pelo chefinho (a IA), caso o usuario queira salvar.</p>
    </div>
  )
}

export default TelaMeuCaderno
