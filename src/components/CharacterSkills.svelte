<script lang="ts">
    import { Player } from "../types/Player";
    import { SkillType } from "../types/SkillType";
    import Grid from "./Grid.svelte";
    import GridItem from "./GridItem.svelte";

    export let player: Player;
</script>

<main>
    <h1>Skills</h1>
    <!-- First 14 skills -->
     <Grid columns="1fr 1fr">
        <GridItem>
            {#each Object.keys(player.skills).slice(0, 13) as skill}
                <div class="skill">
                    <span>{skill}</span>
                    <span>{player.skills[skill]}</span>
                </div>
            {/each}
        </GridItem>
        <GridItem>
            {#each Object.keys(player.skills).slice(13) as skill}
                <div class="skill">
                    <span>{skill}</span>
                    <span>{player.skills[skill]}</span>
                </div>
            {/each}
        </GridItem>
    </Grid>
</main>

<style>
    h1 {
        text-align: center;
    }

    .skill {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    /* First span */
    div span:nth-child(1) {
        text-align: left;
    }

    /* Second span */
    div span:nth-child(2) {
        text-align: right;
    }
</style>