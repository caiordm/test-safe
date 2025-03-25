<script lang="ts">
  import { login, type AuthResponse } from "$lib/services/authService";

  let username: string = $state("");
  let password: string = $state("")
  let user: AuthResponse | null = null;
  let errorMessage: string | null = $state(null);
  let isLoading = $state(false);

  async function handleSubmit() {
    try {
        isLoading = true;
        errorMessage = null;
        user = await login(username, password)
        window.location.href = "/pre-register";
    } catch (error){
        errorMessage = `${error}`;
    } finally {
        isLoading = false;
    }
  }
</script>

<div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

<section class="w-full h-screen flex items-center justify-center">
    <form onsubmit={handleSubmit} class="flex flex-col items-center justify-start w-4/5 lg:w-1/3 gap-2">
        <div class="w-full flex flex-col gap-2">
            <label for="username">Nome de usuário:</label>
            <input bind:value={username} type="text" name="username" placeholder="Nome do usuário" class="bg-white p-2 border border-gray-300 rounded-2xl">
        </div>
        <div class="w-full flex flex-col gap-2">
            <label for="password">Senha:</label>
            <input bind:value={password} type="password" name="password" placeholder="Senha" class="bg-white p-2 border border-gray-300 rounded-2xl">
        </div>
        <button type="submit" class="w-full p-2 rounded-2xl bg-orange-600 text-white cursor-pointer">
            {#if isLoading}
                Carregando...
            {:else}
                Entrar
            {/if}
        </button>
        {#if errorMessage}
            <p class="font-bold text-red-600">{errorMessage}</p>
        {/if}
    </form>
</section>