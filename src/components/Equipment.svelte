<script lang="ts">
    import { playerStore, unequip } from "../stores/player";
    import { EquipmentSlot } from "../types/EquipmentSlot";
    import { EquipmentSlotType } from "../types/EquipmentSlotType";
    import { Player } from "../types/Player";
    import Grid from "./Grid.svelte";
    import GridItem from "./GridItem.svelte";

    let player: Player;

    playerStore.subscribe((value) => {
        player = value;
    });

    function handleClick(slot: EquipmentSlotType) {
        unequip(slot);
    }
</script>

<main>
    <h1>Equipment</h1>
    <Grid columns="1fr 4fr" gap="0">
        <GridItem>Weapon:</GridItem>
        <GridItem>
            {#if player.weaponSlot && player.weaponSlot.item}
                <p class="clickable"
                    on:click={() => handleClick(EquipmentSlotType.Weapon)}
                    on:keypress={() => handleClick(EquipmentSlotType.Weapon)}
                >
                    {player.weaponSlot.item.name}
                </p>
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
                    <p class="clickable"
                        on:click={() => handleClick(armorSlot.slot)}
                        on:keypress={() => handleClick(armorSlot.slot)}
                    >
                        {armorSlot.item.name}
                    </p>
                {:else}
                    None
                {/if}
            </GridItem>
        {/each}
    </Grid>
</main>

<style>
    .clickable:hover {
        text-shadow: 0 0 5px #d4a14e;
        cursor: pointer;
    }
</style>
