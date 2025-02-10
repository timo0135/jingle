import AuthorizationPodcastServiceInterface from "./AuthorizationPodcastServiceInterface";
import {PodcastRepositoryInterface} from "../../../repositoryInterface/PodcastRepositoryInterface";
import PlaylistRepositoryInterface from "../../../repositoryInterface/PlaylistRepositoryInterface";
import DirectRepositoryInterface from "../../../repositoryInterface/DirectRepositoryInterface";
import UserRepositoryInterface from "../../../repositoryInterface/UserRepositoryInterface";
import * as constants from "../../../../config/constantes";

class AuthorizationPodcastService implements AuthorizationPodcastServiceInterface {

    private instancePodcast: PodcastRepositoryInterface;
    private instancePlaylist: PlaylistRepositoryInterface;
    private instanceDirect: DirectRepositoryInterface;
    private instanceUser: UserRepositoryInterface;

    constructor(instancePodcast: PodcastRepositoryInterface, instancePlaylist: PlaylistRepositoryInterface, instanceDirect: DirectRepositoryInterface, instanceUser: UserRepositoryInterface) {
        this.instancePodcast = instancePodcast;
        this.instancePlaylist = instancePlaylist;
        this.instanceDirect = instanceDirect;
        this.instanceUser = instanceUser;
    }

    async isGranted(userId: string, operation: number, resourceId: string): Promise<boolean> {
        switch (operation) {
            case constants.IS_MY_PODCAST:
                let podcast = await this.instancePodcast.findById(resourceId);
                return podcast.getCreator() === userId;
            case constants.IS_MY_PLAYLIST:
                let playlist = await this.instancePlaylist.find(resourceId);
                return playlist.getUser() === userId;
            case constants.IS_MY_DIRECT:
                let direct = await this.instanceDirect.find(resourceId);
                return direct.getHost() === userId;
            case constants.IS_MY_AVIS:
                let avis = await this.instancePodcast.findAvisById(resourceId);
                return avis.getUserId() === userId;
            default:
                return false;
        }
    }

}

export default AuthorizationPodcastService;
