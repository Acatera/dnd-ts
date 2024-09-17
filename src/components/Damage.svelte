<script lang="ts">
    import { DamageComponent } from "../types/components/DamageComponent";

    export let damageComponent: DamageComponent;
</script>

<main>
    <h2>Damage</h2>
    <p>{damageComponent.damage.min} - {damageComponent.damage.max}</p>
</main>

<style>
    p {
        margin-left: 0.5rem;
    }
</style>
