<script lang="ts">
    import { Area } from "../types/Area";
    import { getMonsterName } from "../game/createMonster";

    let area: Area;

    export { area };
</script>

<main>
    <h1>{area.name}</h1>
    <p>{area.description}</p>

    <h2>Enemies</h2>
    <ul>
        {#each area.enemies as enemy}
            <li>{getMonsterName(enemy)}</li>
        {/each}
    </ul>
</main>

<style>
    h1 {
        margin: 0 0 10px 0;
    }
</style>
