<!-- Modal.svelte -->
<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let isOpen = false;
    const dispatch = createEventDispatcher();
    let modalElement;

    function closeModal() {
        dispatch("close");
    }

    function handleKeydown(event) {
        if (event.key === "Escape") {
            closeModal();
        }
    }

    onMount(() => {
        if (isOpen && modalElement) {
            modalElement.focus();
        }
    });
</script>

{#if isOpen}
    <div
        class="modal-backdrop"
        on:click={closeModal}
        on:keydown={handleKeydown}
        bind:this={modalElement}
        transition:fade
    >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="modal-content" on:click|stopPropagation transition:fade>
            <slot></slot>
            <button class="close-button" on:click={closeModal}>&times;</button>
        </div>
    </div>
{/if}

<style>
    /* Modal backdrop */
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    /* Modal content */
    .modal-content {
        background-color: var(--card-bg-color);
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        position: relative;
        min-width: 300px;
        max-width: 90%;
    }

    /* Close button */
    .close-button {
        position: absolute;
        top: 0.5rem;
        right: 0.75rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
</style>
