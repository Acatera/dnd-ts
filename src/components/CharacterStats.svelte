<script lang="ts">
    import { Player } from "../types/Player";
    import ProgressBar from "./ProgressBar.svelte";
    import { playerStore } from "../stores/player";

    let player: Player;

    playerStore.subscribe((value) => {
        player = value;
    });
</script>

<main>
    <h1>Character</h1>
    <ProgressBar
        maxValue={player.maxHealth}
        value={player.health}
        backgroundColor="rgb(91, 1, 1)"
        barColor="rgb(214, 0, 0)"
    />
    <ProgressBar
        maxValue={player.experienceToLevelUp}
        value={player.experience}
        backgroundColor="rgb(65, 35, 0)"
        barColor="rgb(255, 204, 0)"
    />
    <p>Level: {player.level}</p>
    <p>Skill points: {player.skillPoints}</p>
    <p>Attack Rating: {player.attackRating}</p>
    <p>Experience: {player.experience}</p>
</main>
