<script lang="ts">
  import { login, type AuthResponse } from "$lib/services/authService";

  let username: string = $state("");
  let password: string = $state("")
  let user: AuthResponse | null = null;
  let errorMessage: string | null = $state(null);

  async function handleSubmit() {
    try {
        console.log(username, password)
        user = await login(username, password)
        window.location.href = "/pre-register";
    } catch (error){
        errorMessage = "Credenciais inválidas";
    }
  }
</script>

<section class="w-full h-screen flex items-center justify-center">
    <form onsubmit={handleSubmit} class="flex flex-col items-center justify-start w-4/5 lg:w-1/3 gap-2">
        <div class="w-full flex flex-col gap-2">
            <label for="username">Nome de usuário:</label>
            <input bind:value={username} type="text" name="username" placeholder="Nome do usuário" class="p-2 border border-gray-300 rounded-2xl">
        </div>
        <div class="w-full flex flex-col gap-2">
            <label for="password">Senha:</label>
            <input bind:value={password} type="password" name="password" placeholder="Senha" class="p-2 border border-gray-300 rounded-2xl">
        </div>
        <button type="submit" class="w-full p-2 rounded-2xl bg-gray-700 text-white cursor-pointer">Entrar</button>
        {#if errorMessage}
            <p class="font-bold text-red-600">{errorMessage}</p>
        {/if}
    </form>
</section>