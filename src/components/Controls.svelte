<script lang="ts">
    import { Game } from "../types/Game";
    import { playerStore } from "../stores/player";

    let game: Game;

    export { game };

    function startCombat() {
        game.startCombat();
    }

    function gainExperience() {
        game.player.gainExperience(100);
        playerStore.update((player) => player);
    }
</script>

<main>
    <h2>Controls</h2>

    <button on:click={startCombat}>Start Combat</button>
    <button on:click={gainExperience}>Gain 100 XP</button
    >
</main>

<style>
    main {
        margin: 1rem;
    }
</style>
