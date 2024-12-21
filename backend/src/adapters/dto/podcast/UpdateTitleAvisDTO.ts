import DTO from "../DTO";
import {IsNotEmpty} from "class-validator";

class UpdateTitleAvisDTO extends DTO{
    @IsNotEmpty()
    protected title: string;
    @IsNotEmpty()
    protected avisId: string;
  constructor(title: string, avisId: string) {
    super();
    this.title = title;
    this.avisId = avisId;

  }
}

export default UpdateTitleAvisDTO;
