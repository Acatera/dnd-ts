<script lang="ts">
    import { inventoryStore } from "../stores/inventory";
    import { GameScreen, gameScreenStore } from "../stores/gameScreen";
    import { Inventory } from "../types/Inventory";

    let inventory: Inventory;

    inventoryStore.subscribe((value) => {
        inventory = value;
    });

    function goBack() {
        gameScreenStore.update(() => GameScreen.Game);
    }
</script>

<main>
    <h1>Inventory</h1>

    <ul>
        {#each inventory.items as itemStack}
            {#if itemStack.quantity > 1}
                <li>{itemStack.item.name} x{itemStack.quantity}</li>
            {:else}
                <li>{itemStack.item.name}</li>
            {/if}
        {/each}
    </ul>

    <button on:click={goBack}>Back</button>
</main>

<style>
    /* Show center of screen  */
    main {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 50vh;
        height: 50vh;
        transform: translate(-50%, -50%);
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 2px solid #d4a14e;
        box-shadow: 0 0 5px rgba(212, 161, 78, 0.9);
    }

    main ul {
        list-style-type: none;
    }

    main ul li {
        margin: 0.25rem;
    }

    /* On hover, add shadow to text */
    main ul li:hover {
        text-shadow: 0 0 5px #d4a14e;
        cursor: pointer;
    }

    /* Align button bottom right */
    main button {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
    }
</style>
