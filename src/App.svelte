<script lang="ts">
	import AreaInfo from "./components/AreaInfo.svelte";
	import CharacterInfo from "./components/CharacterInfo.svelte";
	import Combat from "./components/Combat.svelte";
	import Controls from "./components/Controls.svelte";
	import EventLog from "./components/EventLog.svelte";
	import Grid from "./components/Grid.svelte";
	import GridItem from "./components/GridItem.svelte";
    import { loadAreaData } from "./types/Area";
	import { createGame, Game } from "./types/Game";
    import { loadMonsterData } from "./types/Monster";

	let assetsLoaded = false;
	let game: Game | null = null;

	async function loadAssets() {
		await loadAreaData();
		await loadMonsterData();

		game = createGame();
		game.loadArea("drone_factory");

		assetsLoaded = true;
	}

	loadAssets();
</script>

<main>
	{#if !assetsLoaded}
		<div class="loading-screen">
			<h1>Loading game data...</h1>
		</div>
	{:else if game === null}
		<div class="creating-game">
			<h1>Creating game...</h1>
		</div>
	{:else}
		<Grid columns="8fr 2fr" rows="3fr 2fr 5fr" gap="0.25rem">
			<GridItem maxHeight="30vh">
				<CharacterInfo />
			</GridItem>
			<GridItem rowSpan={2}>
				<AreaInfo {game} />
			</GridItem>
			<GridItem>
				<Combat />
			</GridItem>
			<GridItem>
				<EventLog />
			</GridItem>
			<GridItem>
				<Controls {game} />
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

	h1 {
		font-size: 2rem;
	}

	.creating-game {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}
</style>
