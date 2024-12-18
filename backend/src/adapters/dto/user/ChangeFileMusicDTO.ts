import DTO from "../DTO";

class ChangeFileMusicDTO extends DTO{
    protected musicId: string;
    protected file: string;
  constructor(musicId: string, file: string) {
    super();
    this.musicId = musicId;
    this.file = file;
  }
}

export default ChangeFileMusicDTO;
