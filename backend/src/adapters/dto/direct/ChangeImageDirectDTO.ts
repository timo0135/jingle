import DTO from "../DTO";

class ChangeImageDirectDTO extends DTO{
    protected image: string;
    protected directId: string;

    constructor(image: string, directId: string) {
        super();
        this.image = image;
        this.directId = directId;
    }
}

export default ChangeImageDirectDTO;
