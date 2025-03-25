import { goto } from "$app/navigation";

const authMiddleware = () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    alert("Por favor, faça o login.");
    goto('/login')
  }
};

export default authMiddleware;
