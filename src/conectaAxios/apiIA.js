import axios from "axios";  

const API_URL = import.meta.env.VITE_API_URL



export const apiIA = async (pergunta) =>{
try{
     const response = await axios.post(`${API_URL}receitas`, { pergunta });

     return response.data.resposta;

}catch(error){
console.error("Erro na chamada à API:", error);
throw error;
}

}