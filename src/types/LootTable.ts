export class LootTable<T> {
  private items: LootTableEntry<T>[];

  constructor(items: LootTableEntry<T>[]) {
    // Validate the items, ensuring that the weights are between 0 and 1.
    items.forEach((item) => {
      if (item.weight < 0 || item.weight > 1) {
        throw new Error(`Invalid weight: ${item.weight}`);
      }
    });

    this.items = items;
  }

  public getNextValues(): T[] {
    const result: T[] = [];

    for (const entry of this.items) {
      const rand = Math.random();
      console.log(rand);
      if (rand < entry.weight) {
        result.push(entry.value);
      }
    }

    return result;
  }
}

export interface LootTableEntry<T> {
  /**
   * The item in the weighted random selection.
   */
  value: T;

  /**
   * The weight (0 to 1) of the item in the weighted random selection.
   */
  weight: number;
}