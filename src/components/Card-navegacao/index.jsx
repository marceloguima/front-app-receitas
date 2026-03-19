import React from 'react'
import "./styles.css"

const CardNavegacao = ({src, titulo, href}) => {
  return (
    <a className='card-nav' href={href}>
      <img src={src} alt="" />
      <h4>{titulo}</h4>
    </a>
  )
}

export default CardNavegacao;
