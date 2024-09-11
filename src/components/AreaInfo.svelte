<script lang="ts">
    import { Area, getAreaName } from "../types/Area";
    import { Game } from "../types/Game";
    import { gameArea } from "../stores/gameArea";
    import { getMonsterName } from "../types/Monster";

    let area: Area;
    let game: Game;
    let mainElement: HTMLElement;

    export { game };

    gameArea.subscribe((value) => {
        area = value;
    });

    function travel(areaId: string) {
        game.travelToArea(areaId);
    }
</script>

<main bind:this={mainElement}>
    <h1>{area.name}</h1>
    <p>{area.description}</p>

    <h2>Enemies</h2>
    <ul>
        {#each area.enemies as enemy}
            <li>{getMonsterName(enemy)}</li>
        {/each}
    </ul>

    <h1>Travel</h1>
    <ul>
        {#each area.adjacentAreaIds as adjacentAreaId}
            <div
                class="area-button"
                on:click={() => travel(adjacentAreaId)}
                on:keypress={() => travel(adjacentAreaId)}
            >
                {getAreaName(adjacentAreaId)}
            </div>
        {/each}
    </ul>
</main>

<style>
    main {
        margin: 0 0.5rem;
    }

    /*  */
    .area-button {
        background-color: var(--button-bg-color);
        color: var(--primary-color);
        border: 1px solid var(--border-color);
        padding: 0.5rem;
        margin: 0.25rem 0;
        cursor: pointer;
        transition: 0.1s ease-in-out;
    }

    .area-button:hover {
        background-color: var(--primary-color);
        color: var(--button-bg-color);
    }
</style>
