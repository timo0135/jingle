import DTO from "../DTO";
import User from "../../../core/domain/entities/user/User";

class UpgradeListenerToBroadcasterDTO extends DTO{
    protected user: User;

    constructor(user: User) {
        super();
        this.user = user;
    }
}

export default UpgradeListenerToBroadcasterDTO;
