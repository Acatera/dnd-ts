<script lang="ts">
    import { tick } from "svelte";
    import { gameEvents } from "../stores/gameEvents";
    
    import { GameEvent } from "../types/GameEvent";
    import { GameEventSource } from "../types/GameEventSource";
    let events: GameEvent[] = [];
    let mainElement: HTMLElement;

    // Subscribe to the gameEvents store and update the events array
    gameEvents.subscribe(async (value) => {
        events = value;

        await tick();

        // Scroll to the bottom after each new event
        if (mainElement) {
            mainElement.scrollTop = mainElement.scrollHeight + mainElement.clientHeight;
        }
    });
</script>

<main bind:this={mainElement}>
    {#each events as event}
        <div class="{GameEventSource[event.source].toLowerCase()}-event">
            {event.message}
        </div>
    {/each}
</main>

<style>
    main {
        height: 100%;
        overflow-y: auto;
        padding: 0.25rem;
    }

    .player-event {
        color: lightgreen;
    }

    .enemy-event {
        color: lightcoral;
    }

    .environment-event {
        color: lightblue;
    }

    .item-event {
        color: lightgoldenrodyellow;
    }

    .game-event {
        color: gray;
    }

    .unknown-event {
        color: lightgray;
    }
</style>
