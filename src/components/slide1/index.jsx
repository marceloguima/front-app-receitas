import React from 'react'
import { useRef } from 'react';
import "./styles.css"
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const Slideprimary = ({cardReceitas}) => {

        const slides = useRef(null);

    const handleLeft = (e) => {
        e.preventDefault();
        console.log(slides.current.offsetWidth);
        slides.current.scrollLeft += slides.current.offsetWidth
    };

    const handleRight = (e) => {
        e.preventDefault();
        console.log(slides.current.offsetWidth);
        slides.current.scrollLeft -= slides.current.offsetWidth
    };

  return (
        <section className="secao-entradas">
                    <h2 className="titulo-secao">Sobremesas</h2>
                    <div className="itens-secao-entradas-slides" ref={slides}>
                        {cardReceitas}
                       
                    </div>
                    <div className="buttons-slides">
                        <button className="prev" onClick={handleRight}>
                            <GrPrevious />
                        </button>
                        <button className="next" onClick={handleLeft}>
                            <GrNext />
                        </button>
                    </div>
                </section>
  )
}

export default Slideprimary
