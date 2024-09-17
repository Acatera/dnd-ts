<script lang="ts">
    import { EquippableComponent } from "../types/components/EquippableComponent";

    export let equippableComponent: EquippableComponent;
</script>

<main>
    <h2>Requirements</h2>
    {#each Object.entries(equippableComponent.requirements) as [skill, level]}
        <p>{skill}: {level}</p>
    {/each}
</main>

<style>
    p {
        margin-left: 0.5rem;
    }
</style>
