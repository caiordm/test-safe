<script lang="ts">
  import { onMount } from "svelte";
  import { getPreRegisterDetails, type PreRegisterDetails } from "$lib/services/preRegisterService";

  export let params: { id: string };

  let details: PreRegisterDetails | null = null;
  let error: string | null = null;

  onMount(async () => {
      try {
          details = await getPreRegisterDetails(params.id);
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
          {#if error}
              <p class="error">{error}</p>
          {:else if details}
              <h1>Pré-registro de {details.name}</h1>
              <p>Email: {details.email}</p>
          {/if}
      </div>
  </div>
</section>