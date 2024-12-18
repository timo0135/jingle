import PodcastServiceInterface from "./PodcastServiceInterface";
import DisplayPodcastDTO from "../../../adapters/dto/podcast/DisplayPodcastDTO";
import CreatePodcastDTO from "../../../adapters/dto/podcast/CreatePodcastDTO";
import UpdateTitlePodcastDTO from "../../../adapters/dto/podcast/UpdateTitlePodcastDTO";
import UpdateDescriptionPodcastDTO from "../../../adapters/dto/podcast/UpdateDescriptionPodcastDTO";
import UpdateImagePodcastDTO from "../../../adapters/dto/podcast/UpdateImagePodcastDTO";
import SearchPodcastDTO from "../../../adapters/dto/podcast/SearchPodcastDTO";
import DisplayAvisDTO from "../../../adapters/dto/podcast/DisplayAvisDTO";
import SearchAvisDTO from "../../../adapters/dto/podcast/SearchAvisDTO";
import AddAvisToPodcastDTO from "../../../adapters/dto/podcast/AddAvisToPodcastDTO";
import RemoveAvisToPodcastDTO from "../../../adapters/dto/podcast/RemoveAvisToPodcastDTO";
import UpdateTitleAvisDTO from "../../../adapters/dto/podcast/UpdateTitleAvisDTO";
import UpdateContentAvisDTO from "../../../adapters/dto/podcast/UpdateContentAvisDTO";
import DisplayPlaylistDTO from "../../../adapters/dto/user/DisplayPlaylistDTO";
import CreatePlaylistDTO from "../../../adapters/dto/user/CreatePlaylistDTO";
import AddPodcastToPlaylistDTO from "../../../adapters/dto/user/AddPodcastToPlaylistDTO";
import ChangeNamePlaylistDTO from "../../../adapters/dto/user/ChangeNamePlaylistDTO";
import DisplayDirectDTO from "../../../adapters/dto/direct/DisplayDirectDTO";
import SearchDirectDTO from "../../../adapters/dto/direct/SearchDirectDTO";
import CreateDirectDTO from "../../../adapters/dto/direct/CreateDirectDTO";
import ChangeNameDirectDTO from "../../../adapters/dto/direct/ChangeNameDirectDTO";
import ChangeDescriptionDirectDTO from "../../../adapters/dto/direct/ChangeDescriptionDirectDTO";
import ChangeImageDirectDTO from "../../../adapters/dto/direct/ChangeImageDirectDTO";
import ChangeDateDirectDTO from "../../../adapters/dto/direct/ChangeDateDirectDTO";
import ChangeDurationDirectDTO from "../../../adapters/dto/direct/ChangeDurationDirectDTO";
import InviteGuessToDirectDTO from "../../../adapters/dto/direct/InviteGuessToDirectDTO";
import CancelGuessToDirectDTO from "../../../adapters/dto/direct/CancelGuessToDirectDTO";
import DisplayMusicDTO from "../../../adapters/dto/user/DisplayMusicDTO";
import CreateMusicDTO from "../../../adapters/dto/user/CreateMusicDTO";
import ChangeNameMusicDTO from "../../../adapters/dto/user/ChangeNameMusicDTO";
import ChangeFileMusicDTO from "../../../adapters/dto/user/ChangeFileMusicDTO";
import AddMusicToMixerDTO from "../../../adapters/dto/user/AddMusicToMixerDTO";
import RemoveMusicToMixerDTO from "../../../adapters/dto/user/RemoveMusicToMixerDTO";
import SearchMusicDTO from "../../../adapters/dto/user/SearchMusicDTO";
import SubscribeToBroacasterDTO from "../../../adapters/dto/user/SubscribeToBroacasterDTO";
import UnsubscribeToBroacasterDTO from "../../../adapters/dto/user/UnsubscribeToBroacasterDTO";
import UpgradeListenerToBroadcasterDTO from "../../../adapters/dto/user/UpgradeListenerToBroadcasterDTO";
import DisplayUserDTO from "../../../adapters/dto/user/DisplayUserDTO";
import CreateAvisDTO from "../../../adapters/dto/podcast/CreateAvisDTO";
import UpdateDatePodcastDTO from "../../../adapters/dto/podcast/UpdateDatePodcastDTO";
import {PodcastRepositoryInterface} from "../../repositoryInterface/PodcastRepositoryInterface";
import Podcast from "../../domain/entities/podcast/Podcast";

class PodcastService implements PodcastServiceInterface{

    private instance: PodcastRepositoryInterface;
    constructor(instance: PodcastRepositoryInterface) {
        this.instance = instance;
    }

    public getPodcastById(id: string): Promise<DisplayPodcastDTO> {
        return this.instance.findById(id).then((podcast) => {
            let p = new DisplayPodcastDTO(podcast as Podcast);
            return p;
        }).catch((error) => {
            throw new Error(error);
        });
    }

    public getPodcasts(): Promise<DisplayPodcastDTO[]> {
        return this.instance.findAll().then((podcasts) => {
            let p = podcasts.map((podcast) => new DisplayPodcastDTO(podcast as Podcast));
            return p;
        }).catch((error) => {
            throw new Error(error);
        });
    }

    public getPodcastsByUserId(userId: string): Promise<DisplayPodcastDTO[]> {
        throw new Error('Method not implemented.');
    }

    public createPodcast(podcast: CreatePodcastDTO): Promise<DisplayPodcastDTO> {
        throw new Error('Method not implemented.');
    }

    public updateTitlePodcast(dto: UpdateTitlePodcastDTO): Promise<DisplayPodcastDTO> {
        throw new Error('Method not implemented.');
    }

    public updateDatePodcast(dto: UpdateDatePodcastDTO): Promise<DisplayPodcastDTO>{
        throw new Error('Method not implemented.');
    }


    public updateDescriptionPodcast(dto: UpdateDescriptionPodcastDTO): Promise<DisplayPodcastDTO> {
        throw new Error('Method not implemented.');
    }

    public updateImagePodcast(dto: UpdateImagePodcastDTO): Promise<DisplayPodcastDTO> {
        throw new Error('Method not implemented.');
    }

    public deletePodcast(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public searchPodcastInfo(dto: SearchPodcastDTO): Promise<DisplayPodcastDTO[]> {
        throw new Error('Method not implemented.');
    }

    public getAvisPodcast(podcastId: string): Promise<DisplayAvisDTO[]> {
        throw new Error('Method not implemented.');
    }

    public getAvisPodcastById(avisId: string): Promise<DisplayAvisDTO> {
        throw new Error('Method not implemented.');
    }

    public searchAvisPodcastInfo(dto: SearchAvisDTO): Promise<DisplayAvisDTO[]> {
        throw new Error('Method not implemented.');
    }

    public addAvisPodcast(dto: AddAvisToPodcastDTO): Promise<DisplayAvisDTO> {
        throw new Error('Method not implemented.');
    }

    public removeAvisPodcast(dto: RemoveAvisToPodcastDTO): Promise<DisplayAvisDTO> {
        throw new Error('Method not implemented.');
    }

    public updateTitleAvisPodcast(dto: UpdateTitleAvisDTO): Promise<DisplayAvisDTO> {
        throw new Error('Method not implemented.');
    }

    public updateContentAvisPodcast(dto: UpdateContentAvisDTO): Promise<DisplayAvisDTO> {
        throw new Error('Method not implemented.');
    }

    public createAvis(dto: CreateAvisDTO): Promise<DisplayAvisDTO>{
        throw new Error('Method not implemented.');
    }
    public deleteAvis(id: string): Promise<void>{
        throw new Error('Method not implemented.');
    }

    public getPlaylists(): Promise<DisplayPlaylistDTO[]> {
        throw new Error('Method not implemented.');
    }

    public getPlaylistById(id: string): Promise<DisplayPlaylistDTO> {
        throw new Error('Method not implemented.');
    }

    public getPlaylistsByPodcastId(podcastId: string): Promise<DisplayPlaylistDTO[]> {
        throw new Error('Method not implemented.');
    }

    public getPlaylistsByUserId(userId: string): Promise<DisplayPlaylistDTO[]> {
        throw new Error('Method not implemented.');
    }

    public createPlaylist(dto: CreatePlaylistDTO): Promise<DisplayPlaylistDTO> {
        throw new Error('Method not implemented.');
    }

    public deletePlaylist(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public addPodcastToPlaylist(dto: AddPodcastToPlaylistDTO): Promise<DisplayPlaylistDTO> {
        throw new Error('Method not implemented.');
    }

    public updateNamePlaylist(dto: ChangeNamePlaylistDTO): Promise<DisplayPlaylistDTO> {
        throw new Error('Method not implemented.');
    }

    public getDirects(): Promise<DisplayDirectDTO[]> {
        throw new Error('Method not implemented.');
    }

    public getDirectById(id: string): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public getDirectsByUserId(userId: string): Promise<DisplayDirectDTO[]> {
        throw new Error('Method not implemented.');
    }

    public searchDirectInfo(dto: SearchDirectDTO): Promise<DisplayDirectDTO[]> {
        throw new Error('Method not implemented.');
    }

    public createDirect(direct: CreateDirectDTO): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public deleteDirect(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public updateNameDirect(dto: ChangeNameDirectDTO): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public updateDescriptionDirect(dto: ChangeDescriptionDirectDTO): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public updateImageDirect(dto: ChangeImageDirectDTO): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public updateDateDirect(dto: ChangeDateDirectDTO): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public updateDurationDirect(dto: ChangeDurationDirectDTO): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public inviteUserToDirect(dto: InviteGuessToDirectDTO): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public cancelInvitationToDirect(dto: CancelGuessToDirectDTO): Promise<DisplayDirectDTO> {
        throw new Error('Method not implemented.');
    }

    public getMusics(): Promise<DisplayMusicDTO[]> {
        throw new Error('Method not implemented.');
    }

    public getMusicById(id: string): Promise<DisplayMusicDTO> {
        throw new Error('Method not implemented.');
    }

    public getMusicsByUserId(userId: string): Promise<DisplayMusicDTO[]> {
        throw new Error('Method not implemented.');
    }

    public createMusic(music: CreateMusicDTO): Promise<DisplayMusicDTO> {
        throw new Error('Method not implemented.');
    }

    public deleteMusic(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public updateNameMusic(dto: ChangeNameMusicDTO): Promise<DisplayMusicDTO> {
        throw new Error('Method not implemented.');
    }

    public updateFileMusic(dto: ChangeFileMusicDTO): Promise<DisplayMusicDTO> {
        throw new Error('Method not implemented.');
    }

    public addMusicToMixer(dto: AddMusicToMixerDTO): Promise<DisplayMusicDTO> {
        throw new Error('Method not implemented.');
    }

    public removeMusicToMixer(dto: RemoveMusicToMixerDTO): Promise<DisplayMusicDTO> {
        throw new Error('Method not implemented.');
    }

    public searchMusicInfo(dto: SearchMusicDTO): Promise<DisplayMusicDTO[]> {
        throw new Error('Method not implemented.');
    }

    public subscribeToBroadcaster(dto: SubscribeToBroacasterDTO): Promise<DisplayPodcastDTO> {
        throw new Error('Method not implemented.');
    }

    public unsubscribeToBroadcaster(dto: UnsubscribeToBroacasterDTO): Promise<DisplayPodcastDTO> {
        throw new Error('Method not implemented.');
    }

    public upgradeListerToBroadcaster(dto: UpgradeListenerToBroadcasterDTO): Promise<DisplayUserDTO> {
        throw new Error('Method not implemented.');
    }
}

export default PodcastService;
