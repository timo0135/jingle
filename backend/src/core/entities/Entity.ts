abstract class Entity {
    protected id: string | null = null;

    protected constructor() {
        if (new.target === Entity) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    getId(): string | null {
        return this.id;
    }

    setId(id: string): void {
        this.id = id;
    }

}

export default Entity;