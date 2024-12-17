import DTO from "../DTO";
import Music from "../../../core/domain/entities/music/Music";

class ChangeFileMusicDTO extends DTO{
    protected music: Music;
    protected file: string;
  constructor(music: Music, file: string) {
    super();
    this.music = music;
    this.file = file;
  }
}

export default ChangeFileMusicDTO;
