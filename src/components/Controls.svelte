<script lang="ts">
    import { Game } from "../types/Game";

    let game: Game;

    export { game };

    function startCombat() {
        game.startCombat();
    }
</script>

<main>
    <h2>Controls</h2>

    <button on:click={startCombat}>Start Combat</button>
</main>

<style>
    main {
        margin: 1rem;
    }
</style>
