import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; 

export default async function apiBuscaReceitas(q = "") {
  const response = await axios.get(`${API_URL}/receitas`, {
    params: { q },
  });
  return response.data; 
}


