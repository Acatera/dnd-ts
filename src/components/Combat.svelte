<script lang="ts">
    import ProgressBar from "./ProgressBar.svelte";
    import { monsterStore } from "../stores/monsterStore";
    import { Monster } from "../types/Monster";

    let monster: Monster | null = null;

    monsterStore.subscribe((value) => {
        monster = value;
    });
</script>

<main>
    <h2>Combat</h2>

    {#if monster}
        <h3>{monster.name}</h3>
        <ProgressBar value={monster.health} maxValue={monster.maxHealth} />
    {:else}
        <p>No monster to fight</p>
    {/if}
</main>
