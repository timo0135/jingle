abstract class DTO {
    get(propertyName: string): any {
        if (this.hasOwnProperty(propertyName)) {
            return (this as any)[propertyName];
        } else {
            console.error(`Property ${propertyName} does not exist on ${this.constructor.name}`);
            throw new Error(`Property ${propertyName} does not exist on ${this.constructor.name}`);
        }
    }
}

export default DTO;
