<script lang="ts">
    import { gameEvents } from "../stores/gameEvents";
    import { GameEvent, GameEventSource } from "../types/Game";
    let events: GameEvent[] = [];
    let mainElement: HTMLElement;

    // Subscribe to the gameEvents store and update the events array
    gameEvents.subscribe((value) => {
        events = value;
       
        // Scroll to the bottom after each new event
        if (mainElement) {
            mainElement.scrollTop = mainElement.scrollHeight;
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
        padding: 1rem;
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
