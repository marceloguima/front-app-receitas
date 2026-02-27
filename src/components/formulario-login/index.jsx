import React from 'react'
import "./styles.css"
import CampoInput from '../Campo-entrada'
import Botao from '../Botao'

const FormularioLogin = () => {
  return (
  <form  className="formulario-login">
    <h1>Login</h1>
           
                <CampoInput
                    textLabel="E-mail"
                    placeholder="Informe seu email"
                />
            
            <CampoInput
                textLabel="Senha"
                placeholder="Informe sua senha"
            />{" "}
          
            <div className="area-botoes-cadastro">
                <Botao variant="btn-acao-formulario-cadastro">
                    Entrar
                </Botao>

              
            </div>
        </form>
  )
}

export default FormularioLogin
