import React from 'react'
import Slideprimary from '../slide1'
import "./styles.css"

const SecaoSbremesas = ({cardReceita}) => {
  return (
   <section className='secoes'>
    <Slideprimary card={cardReceita}/>
   </section>
  )
}

export default SecaoSbremesas
