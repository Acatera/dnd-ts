<script lang="ts">
	import AreaInfo from "./components/AreaInfo.svelte";
	import CharacterInfo from "./components/CharacterInfo.svelte";
	import Combat from "./components/Combat.svelte";
	import Controls from "./components/Controls.svelte";
	import EventLog from "./components/EventLog.svelte";
	import Grid from "./components/Grid.svelte";
	import GridItem from "./components/GridItem.svelte";
	import { createArea, loadAreaData } from "./game/createArea";
	import { createMonster, loadMonsterData } from "./game/createMonster";
    import { createPlayer } from "./game/createPlayer";

	
	let assetsLoaded = false;
	let area = null;
	let player = null;
	
	async function loadAssets() {
		await loadAreaData();
		await loadMonsterData();
		
		area = createArea("drone_factory");
		
		const monster = createMonster("tiered_drone_scout");
		player = createPlayer();
		
		const damage = player.attack(monster);

		console.log(damage);

		assetsLoaded = true;
	}

	loadAssets();
</script>

<main>
	{#if !assetsLoaded}
		<div class="loading-screen">
			<h1>Loading game data...</h1>
		</div>
	{:else}
		<Grid columns="8fr 2fr" rows="3fr 2fr 5fr" gap="0">
			<GridItem maxHeight="30vh">
				<CharacterInfo {player} />
			</GridItem>
			<GridItem rowSpan={2}>
				<AreaInfo {area} />
			</GridItem>
			<GridItem>
				<Combat />
			</GridItem>
			<GridItem>
				<EventLog />
			</GridItem>
			<GridItem>
				<Controls />
			</GridItem>
		</Grid>
	{/if}
</main>

<style>
	.loading-screen {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
