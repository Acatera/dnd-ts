<script lang="ts">
    import { Game } from "../types/Game";
    import { playerStore } from "../stores/player";
    import { GameScreen, gameScreenStore } from "../stores/gameScreen";
    import { writable } from "svelte/store";
    import { Combat } from "../types/Combat";
    import { combatStore } from "../stores/combatStore";
    import { inventoryStore } from "../stores/inventory";

    let game: Game;
    let combat: Combat | null = null;


    combatStore.subscribe((value) => {
        combat = value;
    });

    export { game };

    function startCombat() {
        game.startCombat();
    }

    function abandonCombat() {
        game.abandonCombat();
    }

    function gainExperience() {
        game.player.gainExperience(100);
        playerStore.update((player) => player);
    }

    function openInventory() {
        gameScreenStore.update(() => GameScreen.Inventory);
    }

    function saveGame() {
        game.save();
    }

    function loadGame() {
        game.load();

        game = game;

        playerStore.update(() => game.player);
        inventoryStore.update(() => game.player.inventory);
    }
</script>

<main>
    <h2>Controls</h2>

    <div>
        <button on:click={startCombat} disabled={combat !== null}
        >Start Combat</button>
        <!-- This next button should be disabled -->
        <button on:click={abandonCombat} disabled={combat === null} 
        >Abandon Combat</button>
        
        <button on:click={openInventory}>Inventory</button>
    </div>

    <h2>Debug</h2>

    <div>
        <button on:click={gainExperience}>Gain 100 XP</button>
        <button on:click={saveGame}>Save</button>
        <button on:click={loadGame}>Load</button>
    </div>
</main>

<style>
    main {
        margin: 1rem;
    }

    div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
    }

    button {
        margin: 0;
        padding: 0.5rem;
        display: block;
        width: 100%;
    }
</style>
