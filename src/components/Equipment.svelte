<script lang="ts">
    import { playerStore } from "../stores/player";
    import { EquipmentSlotType } from "../types/EquipmentSlotType";
    import { Player } from "../types/Player";
    import Grid from "./Grid.svelte";
    import GridItem from "./GridItem.svelte";

    let player: Player;

    playerStore.subscribe((value) => {
        player = value;
    });
</script>

<main>
    <h1>Equipment</h1>
    <Grid columns="1fr 4fr" gap="0">
        <GridItem>Weapon:</GridItem>
        <GridItem>
            {#if player.weaponSlot && player.weaponSlot.item}
                {player.weaponSlot.item.name}
            {:else}
                None
            {/if}
        </GridItem>

        {#each player.armorSlots as armorSlot}
            <GridItem>
                {armorSlot.slot}:
            </GridItem>
            <GridItem>
                {#if armorSlot.item}
                    {armorSlot.item.name}
                {:else}
                    None
                {/if}
            </GridItem>
        {/each}
    </Grid>
</main>

<style>
</style>
