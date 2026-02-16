import React from "react";
import "./styles.css"
import Logo from "../Logo";


function Footer() {
  return (
   <footer className="footer-moderno">
    <div className="footer-conteudo">
        <div className="footer-marca">
            <Logo className="logo"/>
            <p>
                Descubra, crie e saboreie as melhores receitas com a ajuda 
                do nosso assistente inteligente, O Chefinho.
            </p>
        </div>

        <div className="footer-links">
            <h4>Categorias</h4>
            <ul>
                <li><a href="#entradas">Entradas</a></li>
                <li><a href="#pratos-principais">Pratos Principais</a></li>
                <li><a href="#bebidas">Bebidas</a></li>
                <li><a href="#sobremesas">Sobremesas</a></li>
            </ul>
        </div>

        <div className="footer-links">
            <h4>Ajuda & Contato</h4>
            <ul>
                <li><a href="#como-funciona">Como usar o Chefinho</a></li>
                <li><a href="#contato">Fale Conosco</a></li>
                <li><a href="#privacidade">Política de Privacidade</a></li>
                <li><a href="#termos">Termos de Uso</a></li>
            </ul>
        </div>
    </div>

    <div className="footer-bottom">
        <p>© {new Date().getFullYear()} IdeIA de Sabor. Todos os direitos reservados.</p>
    </div>
</footer>
  );
}

export default Footer;
