<script lang="ts">
import { onMount } from "svelte";
import authMiddleware from "$lib/authMiddleware";
import { getPreRegisterList, createPreRegister, updatePreRegister ,type PreRegisterDetails, getAssignors, type Procedure, getProcedures } from "$lib/services/preRegisterService";
import Header from "../../components/Header.svelte";
import Modal from "../../components/Modal.svelte";
import { IconDetails, IconEdit } from "@tabler/icons-svelte";
import { goto } from "$app/navigation";
import type { Assignor } from "$lib/services/authService";

let preRegisterList: PreRegisterDetails[] = [];
let assignors: Assignor[] = [];
let procedures: Procedure[] = [];


let error: string | null = null;
let currentPage = 1;
const itemsPerPage = 5;
let totalPages = 1;
let showModal = false;
let isEditing = false;
let isLoading = true; 
let searchQuery = "";

let newPreRegister: Partial<PreRegisterDetails> = {
    id: 0,
    name: "",
    email: "",
    cpf: "",
    phone: "",
    status: "",
    procedureFic: 0,
    quantityProc: 0
};

async function fetchPreRegisterList(query = "") {
    try {
        const response = await getPreRegisterList(query);
        preRegisterList = response;
        totalPages = Math.ceil(preRegisterList.length / itemsPerPage);
        currentPage = 1;
    } catch (err) {
        error = (err as Error).message;
    } finally {
        isLoading = false;
    }
}

async function fetchAssignors() {
    try {
        const response = await getAssignors();
        assignors = response;
    } catch (err) {
        error = (err as Error).message;
    }
}

async function fetchProcedures() {
    try {
        const response = await getProcedures();
        procedures = response;
    } catch (err) {
        error = (err as Error).message;
    }
}

onMount(() => {
    authMiddleware();
    console.log("onmount aaqui");
    fetchPreRegisterList();
    fetchAssignors();
    fetchProcedures();
});

function searchPreRegister() {
    fetchPreRegisterList(`?q=${searchQuery}`);
}

async function submitPreRegister() {
    try {
        let response;
        if (isEditing) {
            await updatePreRegister(newPreRegister as PreRegisterDetails);
        } else {
            await createPreRegister(newPreRegister as PreRegisterDetails);
        }
        alert("Feito com sucesso!")
        await fetchPreRegisterList();
        showModal = false;
        resetForm();
    } catch (err) {
        error = (err as Error).message;
    }
}

function openEditModal(item: PreRegisterDetails) {
    newPreRegister = { ...item };
    isEditing = true;
    showModal = true;
}

function openCreateModal() {
    resetForm();
    isEditing = false;
    showModal = true;
}

function resetForm() {
    newPreRegister = { name: "", email: "", cpf: "", phone: "", status: "pending" };
}

function preRegisterDetails(preRegister: PreRegisterDetails) {
    goto(`/pre-register/${preRegister.id}`)
}

function preRegisterStatus(status: string){
if(status === 'pending') return "Pendente"; 
if(status === 'rejected') return "Rejeitado"; 
if(status === 'registered') return "Registrado"; 
}

$: paginatedItems = preRegisterList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

function nextPage() {
    if (currentPage < totalPages) currentPage++;
}

function prevPage() {
    if (currentPage > 1) currentPage--;
}
</script>

<div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

<section class="w-full">
    <Header></Header>
    <div class="w-full h-screen px-8 py-4">
        <div class="w-full flex flex-col gap-4 lg:gap-0 lg:flex-row items-center justify-between py-8 lg:py-4">
            <h1 class="text-3xl">Pré Registros</h1>
            <div class="w-full lg:w-1/2 flex items-center justify-center gap-1">
                <input type="text" bind:value={searchQuery} onkeydown={(e) => e.key === "Enter" && searchPreRegister()}  placeholder="Procure por nome, email, telefone, cpf etc..." class="w-3/6 border text-sm text-gray-600 py-2 lg:py-1  px-2 bg-gray-50 border-gray-300 rounded-lg">
                <button onclick={searchPreRegister} class="py-2 lg:py-1 px-2 rounded-lg bg-orange-600 text-sm text-white cursor-pointer">Pesquisar</button>
            </div>
            <button onclick={openCreateModal} class="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded-full">Novo pré-registro</button>
        </div>
        {#if isLoading}
            <p class="text-2xl">Carregando...</p>
        {:else}
            <div class="w-full h-auto flex border bg-gray-50 border-gray-200 rounded-2xl px-4 py-2">
                <div class="w-full overflow-x-auto"> 
                <table class="table-fixed border-collapse min-w-max lg:min-w-full overflow-x-auto">
                    <thead class="border-b border-gray-200 leading-10">
                    <tr>
                        <th class="font-medium text-start px-2 lg:px-0">Nome</th>
                        <th class="font-medium text-start px-2 lg:px-0">Email</th>
                        <th class="font-medium text-start px-2 lg:px-0">CPF</th>
                        <th class="font-medium text-start px-2 lg:px-0">Telefone</th>
                        <th class="font-medium text-start px-2 lg:px-0">Cedente</th>
                        <th class="font-medium text-start px-2 lg:px-0">Status</th>
                        <th class="font-medium text-start px-2 lg:px-0">Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each paginatedItems as item}
                            <tr class="border-t border-gray-200 leading-10">
                                <td class="px-2 lg:px-0">{item.name}</td>
                                <td class="px-2 lg:px-0">{item.email}</td>
                                <td class="px-2 lg:px-0">{item.cpf}</td>
                                <td class="px-2 lg:px-0">{item.phone}</td>
                                <td class="px-2 lg:px-0">{item.assignor.fantasy_name}</td>
                                <td class="px-2 lg:px-0">{preRegisterStatus(item.status)}</td>
                                <td class="h-full flex items-center justify-start gap-1">
                                    <button onclick={() => openEditModal(item)} class="flex items-center gap-1 cursor-pointer text-sm py-1 px-2 rounded-lg bg-yellow-600 text-yellow-400">Editar <IconEdit size="20"/></button>
                                    <button onclick={() => preRegisterDetails(item)} class="flex items-center gap-1 cursor-pointer text-sm py-1 px-2 rounded-lg bg-blue-600 text-blue-200">Detalhes <IconDetails size="20"/></button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            </div>

            <div class="w-full flex items-center justify-center text-sm gap-4 mt-4">
                <button 
                    class="p-2 bg-gray-200 text-black rounded-lg disabled:opacity-50 cursor-pointer"
                    onclick={prevPage} 
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>

                <span class="text-gray-500">Página {currentPage} de {totalPages}</span>

                <button 
                    class="p-2 bg-gray-200 text-black rounded-lg disabled:opacity-50 cursor-pointer"
                    onclick={nextPage} 
                    disabled={currentPage === totalPages}
                >
                    Próxima
                </button>
            </div>

            <!-- Modal para Cadastro/Edição -->
            <Modal title={isEditing ? "Editar Pré-Registro" : "Novo Pré-Registro"} bind:show={showModal}>
                <form onsubmit={submitPreRegister} class="flex flex-col gap-2">
                    <label for="name">Nome:</label>
                    <input type="text" name="name" bind:value={newPreRegister.name} placeholder="Nome" class="py-1 px-2 border border-gray-300 rounded-xl" required />
                    <label for="email">Email:</label>
                    <input type="email" name="email"  bind:value={newPreRegister.email} placeholder="Email" class="py-1 px-2 border border-gray-300 rounded-xl" required />
                    <label for="cpf">CPF:</label>
                    <input type="text" name="cpf" bind:value={newPreRegister.cpf} placeholder="CPF (apenas números)" class="py-1 px-2 border border-gray-300 rounded-xl" minlength="11" maxlength="11" required />
                    <label for="phone">Telefone:</label>
                    <input type="text" name="phone" bind:value={newPreRegister.phone} placeholder="Telefone (ex: 81988776655)" class="py-1 px-2 border border-gray-300 rounded-xl" minlength="11" maxlength="11" required />
                    {#if !isEditing}
                        <label for="procedure">Procedimento:</label>
                        <select class="py-1 px-2 border border-gray-300 rounded-xl" name="procedure" id="procedure" bind:value={newPreRegister.procedureFic}>
                            {#each procedures as proc}
                                <option value={proc.id}>{proc.name}</option>
                            {/each}
                        </select>
                        <label for="quantity">Quantidade:</label>
                        <input type="number" min="1" bind:value={newPreRegister.quantityProc} placeholder="Quantidade" class="py-1 px-2 border border-gray-300 rounded-xl"/>
                        <span class="text-xs">Obs: Após cadastrar, atualize a página, caso ela não atualize automaticamente</span>
                    {/if}

                    {#if isEditing}
                    <label for="status">Status:</label>
                    <select class="py-1 px-2 border border-gray-300 rounded-xl" name="status" id="status" bind:value={newPreRegister.status}>
                        <option value="pending">Pendente</option>
                        <option value="rejected">Rejeitado</option>
                        <option value="registered">Registrado</option>
                    </select>
                    {/if}
                    {#if error}
                        <span class="text-sm text-red-700">{error}</span>
                    {/if}
                    <button type="submit" class="w-full py-1 px-2 rounded-2xl bg-blue-700 text-white cursor-pointer">
                        {isEditing ? "Salvar Alterações" : "Cadastrar"}
                    </button>
                </form>
            </Modal>
        {/if}
    </div>
</section>