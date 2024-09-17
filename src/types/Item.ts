import { Component, ComponentType } from "./components/Component";

export class Item {
    id: string;
    name: string;
    description: string;
    components: Map<ComponentType, Component>;

    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.components = new Map<ComponentType, Component>();
    }

    addComponent(name: ComponentType, component: Component) {
        this.components.set(name, component);
    }

    getComponent<T>(name: ComponentType): T | null {
        return this.components.get(name) as T || null;
    }

    hasComponent(name: ComponentType): boolean {
        return this.components.has(name);
    }
}

