import React from "react";
import "./styles.css"


function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} App Receitas. Projeto desenvolvido Marcelo Guimarães.</p>
      <p>
        Receitas fornecidas pela API-Receitas (Denilson Rabelo). Assistente de receitas integrado à Google Gemini API.
      </p>
    </footer>
  );
}

export default Footer;
