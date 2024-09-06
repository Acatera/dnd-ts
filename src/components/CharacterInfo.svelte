<script lang="ts">
    import CharacterSkills from "./CharacterSkills.svelte";
    import CharacterStats from "./CharacterStats.svelte";
    import Equipment from "./Equipment.svelte";
    import Grid from "./Grid.svelte";
    import GridItem from "./GridItem.svelte";
</script>

<main>
    <Grid columns="2fr 3fr 5fr" gap="5px">
        <GridItem>
            <CharacterStats />
        </GridItem>
        <GridItem>
            <Equipment />
        </GridItem>
        <GridItem>
            <CharacterSkills />
        </GridItem>
    </Grid>
</main>
