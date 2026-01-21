import React from 'react'
import "./styles.css"

const Modal = (props) => {
  return (
    <div className='modal-alerta'>
      <p>Desculpe, não encontrei receita com <strong>{props.ingrediente}</strong>.</p>
    </div>
  )
}

export default Modal
