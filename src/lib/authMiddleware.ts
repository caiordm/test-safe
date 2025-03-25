import { goto } from "$app/navigation";

const authMiddleware = () => {
  const accessToken = localStorage.getItem('access');
  
  if (!accessToken) {
    alert("Por favor, faça o login.");
    goto('/login')
  }
};

export default authMiddleware;
