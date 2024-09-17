<script lang="ts">
    import { inventoryStore } from "../stores/inventory";
    import { GameScreen, gameScreenStore } from "../stores/gameScreen";
    import { Inventory } from "../types/Inventory";
    import {
        deleteItem,
        equipItem,
    } from "../stores/player";
    import { ItemBonuses } from "../types/Equippable";
    import { slide } from "svelte/transition";
    import { ItemManager } from "../types/ItemManager";
    import Modal from "./Modal.svelte";
    import { Item } from "../types/Item";
    import { EquippableComponent } from "../types/components/EquippableComponent";
    import ItemRequirementsComp from "./Equippable.svelte";
    import { SkillType } from "../types/SkillType";
    import { BonusesComponent } from "../types/components/BonusesComponent";
    import Bonuses from "./Bonuses.svelte";
    import { DamageComponent } from "../types/components/DamageComponent";
    import { DefenseComponent } from "../types/components/DefenseComponent";
    import Damage from "./Damage.svelte";

    let inventory: Inventory;
    let selectedItem: Item | null = null;
    let equippableComponent: EquippableComponent | null = null;
    let bonusesComponent: BonusesComponent | null = null;
    let damageComponent: DamageComponent | null = null;
    let defenseComponent: DefenseComponent | null = null;

    inventoryStore.subscribe((value) => {
        inventory = value;
    });

    function goBack() {
        gameScreenStore.update(() => GameScreen.Game);
    }

    function selectItem(item: Item | null) {
        if (!item) {
            return;
        }

        selectedItem = item;
        equippableComponent = item.getComponent<EquippableComponent>("EquippableComponent");
        bonusesComponent = item.getComponent<BonusesComponent>("BonusesComponent");
        damageComponent = item.getComponent<DamageComponent>("DamageComponent");
        defenseComponent = item.getComponent<DefenseComponent>("DefenseComponent");
    }

    function handleEquip(item: Item | null) {
        if (!item) {
            return;
        }

        equipItem(item);

        selectedItem = null;
    }

    function handleDelete(item: Item | null) {
        if (!item) {
            return;
        }

        deleteItem(item);

        selectedItem = null;
    }

    let showModal = false;
    function openModal() {
        showModal = true;
    }

    function handleClose() {
        showModal = false;
    }
</script>

<main>
    <Modal bind:isOpen={showModal} on:close={handleClose}>
        <h2>Requirements not met</h2>
        <p>You do not meet the requirements to equip this.</p>
    </Modal>

    <div class="inventory">
        <div class="inventory-main">
            <h1>Inventory</h1>

            <ul>
                {#each inventory.items as itemStack}
                    {#if itemStack.quantity > 1}
                        <li>
                            {ItemManager.getItem(itemStack.itemId)?.name} x{itemStack.quantity}
                        </li>
                    {:else}
                        <li
                            on:click={() =>
                                selectItem(
                                    ItemManager.getItem(itemStack.itemId),
                                )}
                            on:keypress={() =>
                                selectItem(
                                    ItemManager.getItem(itemStack.itemId),
                                )}
                        >
                            {ItemManager.getItem(itemStack.itemId)?.name}
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

                {#if damageComponent}
                    <Damage damageComponent={damageComponent} />
                {/if}

                {#if defenseComponent}
                    <h2>Defense</h2>
                    <p>{defenseComponent.defense}</p>
                {/if}

                {#if equippableComponent}
                    <ItemRequirementsComp equippableComponent={equippableComponent} />  
                {/if}

                {#if bonusesComponent}
                    <Bonuses bonusesComponent={bonusesComponent} />
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
