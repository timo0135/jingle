import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class RemovePodcastToPlaylistDTO extends DTO{

    @IsNotEmpty()
    protected podcastId: string;

    @IsNotEmpty()
    protected playlistId: string;
  constructor(podcastId: string, playlistId: string) {
    super();
    this.podcastId = podcastId;
    this.playlistId = playlistId;

  }
}

export default RemovePodcastToPlaylistDTO;
