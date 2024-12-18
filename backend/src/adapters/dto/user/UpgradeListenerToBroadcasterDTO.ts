import DTO from "../DTO";

class UpgradeListenerToBroadcasterDTO extends DTO{
    protected userId: string;

    constructor(userId: string) {
        super();
        this.userId = userId;
    }
}

export default UpgradeListenerToBroadcasterDTO;
