<script lang="ts">
    import { logout } from "$lib/services/authService";
    let name = typeof window !== 'undefined' ? localStorage.getItem('fantasyName') : null
    let errorMessage = $state('');

    function handleSubmit() {
    try { 
        logout()
        window.location.href = "/";
    } catch (error){
        errorMessage = `${error}`;
    }
  }
</script>

<header class="w-full px-8 py-4 flex justify-between items-center bg-white border-b border-b-gray-300">
    <h2 class="text-xl">{name}</h2>
    <button onclick={handleSubmit} class="py-2 px-6 rounded-4xl cursor-pointer bg-red-600 text-white border border-red-700">Sair</button>
    {#if errorMessage}
        <span>Houve um erro ao sair</span>
    {/if}
</header>