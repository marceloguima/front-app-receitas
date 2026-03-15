import React from 'react'
import "./styles.css"
import { FaSearch } from "react-icons/fa";


const BarraDeBusca = ({onSubmit, onChange, value, variant}) => {
    
const classesBarraBusca = `form-buscar ${variant}`

  return (
    <form className={classesBarraBusca} onSubmit={onSubmit}>
                       <input
                           type="text"
                           placeholder="Buscar"
                           className="input-barra-busca"
                           value={value}
                           onChange={onChange}
                       />
                       <button type="submit" className="btn-buscar">
                           <FaSearch />
                       </button>
                   </form>
  )
}

export default BarraDeBusca;
