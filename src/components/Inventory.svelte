<script lang="ts">
    import { inventoryStore } from "../stores/inventory";
    import { GameScreen, gameScreenStore } from "../stores/gameScreen";
    import { Inventory } from "../types/Inventory";
    import { getItemType, Item } from "../types/Item";
    import { deleteItem, equipArmor, equipWeapon } from "../stores/player";
    import { Armor } from "../types/Armor";
    import { Weapon } from "../types/Weapon";
    import { ItemBonuses, ItemRequirements } from "../types/Equippable";
    import { slide } from "svelte/transition";

    let inventory: Inventory;
    let selectedItem: Item | null = null;
    let isEquippable: boolean;
    let requirements: ItemRequirements | null = null;
    let bonuses: ItemBonuses | null = null;

    inventoryStore.subscribe((value) => {
        inventory = value;
    });

    function goBack() {
        gameScreenStore.update(() => GameScreen.Game);
    }

    function selectItem(item: Item) {
        selectedItem = item;

        isEquippable =
            getItemType(item.id) === "Weapon" ||
            getItemType(item.id) === "Armor";

        if (isEquippable) {
            requirements = (item as Armor | Weapon).requirements;
            bonuses = (item as Armor | Weapon).bonuses;
        } else {
            requirements = null;
            bonuses = null;
        }
    }

    function handleEquip(item: Item | null) {
        if (!item) {
            return;
        }

        const itemType = getItemType(item.id);

        if (itemType === "Weapon") {
            equipWeapon(item as Weapon);
        } else if (itemType === "Armor") {
            equipArmor(item as Armor);
        }

        selectedItem = null;
    }

    function handleDelete(item: Item | null) {
        if (!item) {
            return;
        }

        deleteItem(item);

        selectedItem = null;
    }
</script>

<main>
    <div class="inventory">
        <div class="inventory-main">
            <h1>Inventory</h1>

            <ul>
                {#each inventory.items as itemStack}
                    {#if itemStack.quantity > 1}
                        <li>{itemStack.item.name} x{itemStack.quantity}</li>
                    {:else}
                        <li
                            on:click={() => selectItem(itemStack.item)}
                            on:keypress={() => selectItem(itemStack.item)}
                        >
                            {itemStack.item.name}
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
        <div class="inventory-buttons">
            <button on:click={goBack}>Back</button>
        </div>
    </div>

    {#if selectedItem}
        <div
            class="item-details"
            transition:slide={{ axis: "x", duration: 100 }}
        >
            <div class="item-details-main">
                <h1>{selectedItem.name}</h1>
                <p>{selectedItem.description}</p>

                {#if isEquippable && requirements && bonuses}
                    {#if selectedItem.type === "Weapon"}
                        <h2>Damage</h2>
                        <p>
                            {selectedItem.asWeapon()?.damageRange.min} - {selectedItem.asWeapon()
                                ?.damageRange.max}
                        </p>
                    {:else if selectedItem.type === "Armor"}
                        <h2>Defense</h2>
                        <p>{selectedItem.asArmor()?.defense}</p>
                    {/if}

                    <h2>Requirements</h2>
                    {#each Object.entries(requirements) as [key, value]}
                        <p>{key}: {value}</p>
                    {/each}

                    <h2>Bonuses</h2>
                    {#each Object.entries(bonuses) as [key, value]}
                        <p>{key}: {value}</p>
                    {/each}
                {/if}
            </div>
            <div class="item-details-buttons">
                <button on:click={() => handleEquip(selectedItem)}>Equip</button
                >
                <button on:click={() => handleDelete(selectedItem)}
                    >Delete</button
                >
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        gap: 0.5rem;
    }

    .inventory {
        background-color: var(--card-bg-color);
        width: 50vh;
        height: 50vh;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .inventory h1 {
        text-align: center;
    }

    .inventory ul {
        list-style-type: none;
        padding: 0;
    }

    .inventory ul li {
        margin: 0.25rem;
    }

    .inventory ul li:hover {
        text-shadow: 0 0 10px var(--tertiary-color);
        cursor: pointer;
    }

    .inventory-main {
        flex-grow: 1; /* Make this div stretch to fill available space */
        display: flex;
        flex-direction: column;
    }

    .inventory-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .item-details {
        background-color: var(--card-bg-color);
        display: flex;
        flex-direction: column;
        width: 50vh;
        height: 50vh;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid var(--border-color);
        position: relative;
    }

    .item-details p {
        margin-left: 0.5rem;
    }

    .item-details-main {
        flex-grow: 1; /* Make this div stretch to fill available space */
        display: flex;
        flex-direction: column;
    }

    .item-details-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }
</style>
