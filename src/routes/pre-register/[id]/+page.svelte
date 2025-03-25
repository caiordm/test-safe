<script lang="ts">
    import { getPreRegisterDetails,type PreRegisterDetails } from "$lib/services/preRegisterService";
    import Header from "../../../components/Header.svelte";
    import { onMount } from "svelte";
    import authMiddleware from "$lib/authMiddleware";
    import { page } from "$app/stores";
    import { get } from "svelte/store";

    let preRegister: PreRegisterDetails;
    let isLoading = true;
    let errorMessage: string | null = null;

    async function fetchPreRegister(id: string) {
        try {
           const response = await getPreRegisterDetails(Number(id));
           preRegister = response;
        } catch (error) {
            alert(error)
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        authMiddleware();
        const params = get(page).params;
        if (params.id) {
            fetchPreRegister(params.id);
        } else {
            isLoading = false;
            errorMessage = "ID não encontrado na URL.";
        }
    });
</script>

<div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

<section class="w-full">
    <Header></Header>
    <div class="w-full h-screen px-8 py-4">
        {#if isLoading}
            <span>Carregando...</span>
        {:else}
            <div class="w-full flex items-center justify-between py-2">
                <h2 class="text-xl">Detalhes do Pré-Registro</h2>
            </div>
            <div class="w-full flex flex-col items-start gap-2 flex-wrap">
                <div class="-w-4/5 flex gap-4 justify-between">
                    <p><strong>Nome:</strong> {preRegister.name}</p>
                    <p><strong>Email:</strong> {preRegister.email}</p>
                    <p><strong>Cedente:</strong> {preRegister.assignor.fantasy_name}</p>
                </div>
                <div class="w-full flex flex-col gap-2">
                    <h3 class="text-xl">Procedimentos:</h3>
                    <div class="w-full flex flex-col lg:flex-row flew-wrap gap-4">
                        {#each preRegister.procedures as proc }
                        <div class="w-full lg:max-w-3/12 flex flex-col justify-between">
                            <p><strong>Nome:</strong> {proc.procedure.name}</p>
                            <p><strong>Descrição:</strong> {proc.procedure.description}</p>
                            <p><strong>Cedente:</strong> {proc.procedure.assignor.fantasy_name}</p>
                            <p><strong>Preço:</strong> {proc.procedure.price}</p>
                            <p><strong>Quantidade:</strong> {proc.quantity}</p>
                        </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</section>


