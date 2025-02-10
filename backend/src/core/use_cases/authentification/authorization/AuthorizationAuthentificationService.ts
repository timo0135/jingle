import AuthorizationAuthentificationServiceInterface from "./AuthorizationAuthentificationServiceInterface";
import UserRepositoryInterface from "../../../repositoryInterface/UserRepositoryInterface";
import * as constants from "../../../../config/constantes";

class AuthorizationAuthentificationService implements AuthorizationAuthentificationServiceInterface {

    private instance: UserRepositoryInterface;

    constructor(instance: UserRepositoryInterface) {
        this.instance = instance;
    }

    async isGranted(userId: string, operation: number, resourceId?: string): Promise<boolean> {
        switch (operation) {
            case constants.IS_ME:
                if (resourceId === undefined) {
                    return false;
                }
                let user = await this.instance.find(resourceId);
                return user.getId() === userId;
            case constants.IS_BROADCASTER:
                let userBroadcaster = await this.instance.find(userId);
                return userBroadcaster.getRole() === constants.BROADCASTER;
            default:
                return false;
        }
    }

}

export default AuthorizationAuthentificationService;
