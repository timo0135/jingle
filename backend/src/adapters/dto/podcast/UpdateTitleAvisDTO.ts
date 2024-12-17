import DTO from "../DTO";
import Avis from "../../../core/domain/entities/avis/Avis";

class UpdateTitleAvisDTO extends DTO{
    protected title: string;
    protected avis: Avis;
  constructor(title: string, avis: Avis) {
    super();
    this.title = title;
    this.avis = avis;

  }
}

export default UpdateTitleAvisDTO;
