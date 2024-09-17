<script lang="ts">
    import { BonusesComponent } from "../types/components/BonusesComponent";

    export let bonusesComponent: BonusesComponent;
</script>

<main>
    <h2>Bonuses</h2>
    {#each Object.entries(bonusesComponent.bonuses) as [skill, level]}
        <p>{skill}: {level}</p>
    {/each}
</main>

<style>
    p {
        margin-left: 0.5rem;
    }
</style>
