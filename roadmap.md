# Rogue-punk RPG Feature List

## Combat System

- [x] Configurable damage for mobs
- [x] Mobs scale in level based on area
- [x] Replace min/max with damage range
- [x] Implement real-time combat
- [x] Implement initiative skill
- [x] Implement attack rating
- [x] Implement evasion and miss chance
- [x] Buff fists damage
- [x] Add weapon types (fists and blaster)
- [x] Implement attack speed
- [x] Refactor combat events and models
- [x] Bound damage received by mobs
- [x] Add player attack method to Combat class
- [x] Add player and enemy combat log with attacker and defender names
- [x] Implement combat outcome
- [x] Crit chance and damage scaling
- [ ] Implement damage types and resistances
- [ ] Mobs should have armor class
- [ ] Magic system (with scripting or UI-based casting)
- [ ] Stealth mechanics (sneaking, ambushes, etc.)
- [ ] Environmental interactions during combat (traps, destructible objects, etc.)
- [ ] Group combat (multiple enemies vs. the player, or player allies)
- [ ] Status effects (poison, stun, etc.)
- [ ] Timed or cooldown-based abilities

## Player Progression

- [x] Introduce levels for players and mobs
- [x] Refactor player level up logic
- [x] Introduce max health for characters
- [x] Add player store for items
- [ ] Dynamic skill progression based on use (skills level up with usage)
- [ ] Implement crafting system
- [ ] Item scaling and rarity
- [ ] Item quality levels
- [ ] Implement mining system
- [ ] Implement trickle-down for skills
- [ ] Add implants
- [ ] Regeneration system
- [ ] Talent trees or specialization paths
- [ ] Faction reputation system (relationships with different in-game groups)
- [ ] Character customization (appearance, name, etc.)

## Inventory & Item Management

- [x] Add inventory to player
- [x] Equip/unequip items from inventory
- [x] Pick up items into inventory
- [x] Refine inventory window UI
- [x] Implement item bonuses (armor, weapons, etc.)
- [x] Add ItemStack class for managing item stacks
- [x] Implement weapon and armor creation logic
- [x] Add equipable weapons and armor
- [x] Refactor item creation into a factory using JSON files
- [x] Expand inventory functionality (drop items, unequip, etc.)
- [ ] Implement item materials
- [ ] Implement additional item types (materials, consumables, etc.)
- [ ] Implement consumables (healing items, batteries, etc.)
- [ ] Implement item requirements
- [ ] Implement item scaling and rarity
- [ ] Drop/delete items
- [ ] Inventory weight or capacity system
- [ ] Item durability and repair
- [ ] Unique items or legendary items with special attributes
- [ ] Item trading (with NPCs or other players if multiplayer is ever planned)
- [ ] Item socketing (gems, enhancements, etc.)

## UI & User Interaction

- [x] Refine and polish UI components
- [x] Update UI components with latest game changes
- [x] Update scrollbar aesthetics
- [x] Refine character info display and equipment panel
- [x] Improve health and experience bars UI
- [x] Add event log component and store for game events
- [x] Add color to character info panel and smooth scrolling to logs
- [x] Update combat log messages with attacker and defender names
- [x] Add area name and monster list in the map panel
- [x] Add main UI components for game interaction
- [ ] Show message when unable to equip items
- [ ] Refine inventory screen
- [ ] Add item display card
- [ ] Refine area screen (area image, other info)
- [ ] Implement themes (dark mode, etc.)
- [ ] Implement different UI for buffs and scripts
- [ ] In-game tutorial or onboarding guide for new players
- [ ] UI accessibility options (font size, color-blind mode, etc.)
- [ ] Hotkeys or shortcuts for inventory and skills
- [ ] Map exploration and fog of war (hidden parts of the map until explored)

## World & Area System

- [x] Implement travel system
- [x] Add area combat level
- [x] Display area name in map panel
- [ ] Implement area events (dynamic events in locations)
- [ ] Implement shops (buying and selling items)
- [ ] Add NPCs (interactions and quests)
- [ ] Add quests (with objectives and rewards)
- [ ] Weather effects (rain, fog, etc.) that influence gameplay
- [ ] Day/night cycle
- [ ] Procedurally generated dungeons or encounters
- [ ] Dynamic world changes based on player actions (e.g., destroyed towns, altered landscapes)

## Miscellaneous

- [x] Enable strict compilation flags
- [x] Refactor loot table
- [ ] Implement trickle-down effects for skills
- [ ] Refine exo-skeleton system
- [ ] Save/load game functionality
- [ ] Modding support or script editor for players
- [ ] Achievements or challenges
- [ ] Multiple game difficulty levels
