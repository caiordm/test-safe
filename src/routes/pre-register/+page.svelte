<script lang="ts">
    import { onMount } from "svelte";
    import { getPreRegisterList, type PreRegisterDetails } from "$lib/services/preRegisterService";

    let preRegisterList: PreRegisterDetails[] = [];
    let error: string | null = null;

    onMount(async () => {
        try {
            preRegisterList = await getPreRegisterList();
        } catch (err) {
            error = (err as Error).message;
        }
    });
</script>


<section class="w-full">
    <div class="w-full h-screen px-8 py-4">
        <div class="w-full flex items-center justify-between py-8">
            <h1 class="text-3xl">Pré Registros</h1>
            <button class="p-4 bg-orange-500 text-white rounded-full">Novo pré-registro</button>
        </div>
        <div class="w-full h-auto flex border border-gray-200 rounded-2xl p-4">
            <table class="table-fixed border-collapse w-full text-lg leading-12">
                <thead class="border-b border-gray-200">
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {#each preRegisterList as item}
                    <tr class="border-b border-gray-200">
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.cpf}</td>
                      <td>{item.phone}</td>
                      <td>{item.status}</td>
                    </tr>
                  {/each}
                </tbody>
              </table>
        </div>
    </div>
</section>