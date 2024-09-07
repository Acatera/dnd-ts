<script lang="ts">
	import { tick } from "svelte";
	import AreaInfo from "./components/AreaInfo.svelte";
	import CharacterInfo from "./components/CharacterInfo.svelte";
	import Combat from "./components/Combat.svelte";
	import Controls from "./components/Controls.svelte";
	import EventLog from "./components/EventLog.svelte";
	import Grid from "./components/Grid.svelte";
	import GridItem from "./components/GridItem.svelte";
	import Inventory from "./components/Inventory.svelte";
	import { GameScreen, gameScreenStore } from "./stores/gameScreen";
	import { loadAreaData } from "./types/Area";
	import { createGame, Game } from "./types/Game";
	import { loadItemData } from "./types/Item";
	import { createLeveledMonster, loadMonsterData } from "./types/Monster";

	let game: Game | null = null;
	let gameScreen: GameScreen;

	gameScreenStore.subscribe((value) => {
		gameScreen = value;
	});

	async function loadAssets() {
		await loadItemData();
		await loadAreaData();
		await loadMonsterData();

		game = createGame();
		game.loadArea("drone_factory_entrance");
		await tick();
		gameScreenStore.update(() => GameScreen.Game);

		// const monster = createLeveledMonster("tiered_drone_scout", 5);
		// console.log(monster);
	}

	loadAssets();
</script>

<main>
	{#if gameScreen === GameScreen.Loading}
		<div class="loading-screen">
			<h1>Loading game data...</h1>
		</div>
	{:else if game === null}
		<div class="creating-game">
			<h1>Creating game...</h1>
		</div>
	{:else if gameScreen === GameScreen.Inventory}
		<Inventory />
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
