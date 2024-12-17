import DTO from "../DTO";
import Podcast from "../../../core/entities/podcast/Podcast";
import Playlist from "../../../core/entities/playlist/Playlist";
import {IsNotEmpty} from "class-validator";

class RemovePodcastToPlaylistDTO extends DTO{

    @IsNotEmpty()
    protected podcast: Podcast;

    @IsNotEmpty()
    protected playlist: Playlist;
  constructor(podcast: Podcast, playlist: Playlist) {
    super();
    this.podcast = podcast;
    this.playlist = playlist;

  }
}

export default RemovePodcastToPlaylistDTO;
