<script lang="ts">
  import { IconX } from "@tabler/icons-svelte";

    export let show = false;
    export let title = "Modal";
    export let onClose = () => {};
  
    function closeModal() {
      show = false;
      onClose();
    }
  </script> 
  
  {#if show}
    <div class="fixed inset-0 flex items-center justify-center drop-shadow-2xl">
      <div class="bg-white p-3 rounded-lg w-10/12 lg:w-3/6">
        <div class="w-full flex items-center justify-between">
            <h2 class="text-xl font-semibold">{title}</h2>
            <button class="cursor-pointer" on:click={closeModal} name="Fechar"> <IconX/> </button>
        </div>
        <slot></slot>
      </div>
    </div>
  {/if}
  