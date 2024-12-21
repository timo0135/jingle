import DTO from "../DTO";

class ChangeDescriptionPlaylistDTO extends DTO{
    protected description: string;
    protected playlistId: string;

    constructor(description: string, playlistId: string) {
        super();
        this.description = description;
        this.playlistId = playlistId;
    }
}

export default ChangeDescriptionPlaylistDTO;
