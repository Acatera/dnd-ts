<script lang="ts">
    import { Player } from "../types/Player";
    import CharacterSkills from "./CharacterSkills.svelte";
    import CharacterStats from "./CharacterStats.svelte";
    import Equipment from "./Equipment.svelte";
    import Grid from "./Grid.svelte";
    import GridItem from "./GridItem.svelte";

    export let player: Player;
</script>

<main>
    <Grid columns="2fr 3fr 5fr" gap="5px">
        <GridItem>
            <CharacterStats {player} />
        </GridItem>
        <GridItem>
            <Equipment {player} />
        </GridItem>
        <GridItem>
            <CharacterSkills {player} />
        </GridItem>
    </Grid>
</main>