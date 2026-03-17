import React from 'react'
import { NavLink } from 'react-router-dom'
import "./styles.css"

const CardNavegacao = ({src, titulo}) => {
  return (
    <NavLink className='card-nav'>
      <img src={src} alt="" />
      <h4>{titulo}</h4>
    </NavLink>
  )
}

export default CardNavegacao;
