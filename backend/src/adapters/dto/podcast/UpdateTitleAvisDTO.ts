import DTO from "../DTO";

class UpdateTitleAvisDTO extends DTO{
    protected title: string;
    protected avisId: string;
  constructor(title: string, avisId: string) {
    super();
    this.title = title;
    this.avisId = avisId;

  }
}

export default UpdateTitleAvisDTO;
