<script lang="ts">
    import { inventoryStore } from "../stores/inventory";
    import { ItemStack } from "../types/ItemStack";

    let inventory: ItemStack[] = [];

    inventoryStore.subscribe((value) => {
        inventory = value;
    });

</script>

<main>
    <h1>Inventory</h1>

    <ul>
        {#each inventory as itemStack}
            <li>{itemStack.item.name} x{itemStack.quantity}</li>
        {/each}
    </ul>
</main>
