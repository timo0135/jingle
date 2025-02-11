import DisplayPodcastDTO from "../../../adapters/dto/podcast/DisplayPodcastDTO";
import CreatePodcastDTO from "../../../adapters/dto/podcast/CreatePodcastDTO";
import UpdateTitlePodcastDTO from "../../../adapters/dto/podcast/UpdateTitlePodcastDTO";
import UpdateDescriptionPodcastDTO from "../../../adapters/dto/podcast/UpdateDescriptionPodcastDTO";
import UpdateImagePodcastDTO from "../../../adapters/dto/podcast/UpdateImagePodcastDTO";
import AddAvisToPodcastDTO from "../../../adapters/dto/podcast/AddAvisToPodcastDTO";
import SearchPodcastDTO from "../../../adapters/dto/podcast/SearchPodcastDTO";
import RemoveAvisToPodcastDTO from "../../../adapters/dto/podcast/RemoveAvisToPodcastDTO";
import UpdateTitleAvisDTO from "../../../adapters/dto/podcast/UpdateTitleAvisDTO";
import DisplayAvisDTO from "../../../adapters/dto/podcast/DisplayAvisDTO";
import UpdateContentAvisDTO from "../../../adapters/dto/podcast/UpdateContentAvisDTO";
import DisplayPlaylistDTO from "../../../adapters/dto/user/DisplayPlaylistDTO";
import SearchAvisDTO from "../../../adapters/dto/podcast/SearchAvisDTO";
import CreatePlaylistDTO from "../../../adapters/dto/user/CreatePlaylistDTO";
import AddPodcastToPlaylistDTO from "../../../adapters/dto/user/AddPodcastToPlaylistDTO";
import ChangeNamePlaylistDTO from "../../../adapters/dto/user/ChangeNamePlaylistDTO";
import DisplayDirectDTO from "../../../adapters/dto/direct/DisplayDirectDTO";
import CreateDirectDTO from "../../../adapters/dto/direct/CreateDirectDTO";
import ChangeNameDirectDTO from "../../../adapters/dto/direct/ChangeNameDirectDTO";
import ChangeDescriptionDirectDTO from "../../../adapters/dto/direct/ChangeDescriptionDirectDTO";
import ChangeImageDirectDTO from "../../../adapters/dto/direct/ChangeImageDirectDTO";
import ChangeDateDirectDTO from "../../../adapters/dto/direct/ChangeDateDirectDTO";
import ChangeDurationDirectDTO from "../../../adapters/dto/direct/ChangeDurationDirectDTO";
import SearchDirectDTO from "../../../adapters/dto/direct/SearchDirectDTO";
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
import DisplayDetailsPodcastDTO from "../../../adapters/dto/podcast/DisplayDetailsPodcastDTO";
import ChangeDescriptionPlaylistDTO from "../../../adapters/dto/user/ChangeDescriptionPlaylistDTO";
import RemovePodcastToPlaylistDTO from "../../../adapters/dto/user/RemovePodcastToPlaylistDTO";

interface PodcastServiceInterface {
    getPodcastById(id: string): Promise<DisplayDetailsPodcastDTO>;
    getPodcasts(): Promise<DisplayPodcastDTO[]>;
    getPodcastsByUserId(userId: string): Promise<DisplayPodcastDTO[]>
    createPodcast(podcast: CreatePodcastDTO): Promise<DisplayDetailsPodcastDTO>;
    updateTitlePodcast(dto: UpdateTitlePodcastDTO): Promise<DisplayDetailsPodcastDTO>;
    updateDatePodcast(dto: UpdateDatePodcastDTO): Promise<DisplayDetailsPodcastDTO>;
    updateDescriptionPodcast(dto: UpdateDescriptionPodcastDTO): Promise<DisplayDetailsPodcastDTO>;
    updateImagePodcast(dto: UpdateImagePodcastDTO): Promise<DisplayDetailsPodcastDTO>;
    deletePodcast(id: string): Promise<void>;
    searchPodcastInfo(dto: SearchPodcastDTO): Promise<DisplayPodcastDTO[]>;
    getAvisPodcast(podcastId: string): Promise<DisplayAvisDTO[]>;
    getAvisPodcastById(avisId: string): Promise<DisplayAvisDTO>;
    searchAvisPodcastInfo(dto: SearchAvisDTO): Promise<DisplayAvisDTO[]>;
    addAvisPodcast(dto: AddAvisToPodcastDTO): Promise<DisplayAvisDTO>;
    createAvis(dto: CreateAvisDTO): Promise<DisplayAvisDTO>;
    deleteAvis(id: string): Promise<void>;
    updateTitleAvisPodcast(dto: UpdateTitleAvisDTO): Promise<DisplayAvisDTO>;
    updateContentAvisPodcast(dto: UpdateContentAvisDTO): Promise<DisplayAvisDTO>;
    getPlaylists(): Promise<DisplayPlaylistDTO[]>;
    getPlaylistById(id: string): Promise<DisplayPlaylistDTO>;
    getPlaylistsByPodcastId(podcastId: string): Promise<DisplayPlaylistDTO[]>;
    getPlaylistsByUserId(userId: string): Promise<DisplayPlaylistDTO[]>;
    createPlaylist(dto: CreatePlaylistDTO): Promise<DisplayPlaylistDTO>;
    deletePlaylist(id: string): Promise<void>;
    addPodcastToPlaylist(dto: AddPodcastToPlaylistDTO): Promise<DisplayPlaylistDTO>;
    removePodcastToPlaylist(dto: RemovePodcastToPlaylistDTO): Promise<DisplayPlaylistDTO>;
    updateNamePlaylist(dto: ChangeNamePlaylistDTO): Promise<DisplayPlaylistDTO>;
    updateDescriptionPlaylist(dto: ChangeDescriptionPlaylistDTO): Promise<DisplayPlaylistDTO>;
    getDirects(): Promise<DisplayDirectDTO[]>;
    getDirectById(id: string): Promise<DisplayDirectDTO>;
    getDirectsByUserId(userId: string): Promise<DisplayDirectDTO[]>;
    searchDirectInfo(dto: SearchDirectDTO): Promise<DisplayDirectDTO[]>;
    createDirect(direct: CreateDirectDTO): Promise<DisplayDirectDTO>;
    deleteDirect(id: string): Promise<void>;
    updateNameDirect(dto: ChangeNameDirectDTO): Promise<DisplayDirectDTO>;
    updateDescriptionDirect(dto: ChangeDescriptionDirectDTO): Promise<DisplayDirectDTO>;
    updateImageDirect(dto: ChangeImageDirectDTO): Promise<DisplayDirectDTO>;
    updateDateDirect(dto: ChangeDateDirectDTO): Promise<DisplayDirectDTO>;
    updateDurationDirect(dto: ChangeDurationDirectDTO): Promise<DisplayDirectDTO>;
    inviteUserToDirect(dto: InviteGuessToDirectDTO): Promise<DisplayDirectDTO>;
    cancelInvitationToDirect(dto: CancelGuessToDirectDTO): Promise<DisplayDirectDTO>;
    getMusics(): Promise<DisplayMusicDTO[]>;
    getMusicById(id: string): Promise<DisplayMusicDTO>;
    getMusicsByUserId(userId: string): Promise<DisplayMusicDTO[]>;
    createMusic(music: CreateMusicDTO): Promise<DisplayMusicDTO>;
    deleteMusic(id: string): Promise<void>;
    updateNameMusic(dto: ChangeNameMusicDTO): Promise<DisplayMusicDTO>;
    addMusicToMixer(dto: AddMusicToMixerDTO): Promise<DisplayMusicDTO>;
    removeMusicToMixer(dto: RemoveMusicToMixerDTO): Promise<DisplayMusicDTO>;
    searchMusicInfo(dto: SearchMusicDTO): Promise<DisplayMusicDTO[]>;
    subscribeToBroadcaster(dto: SubscribeToBroacasterDTO): Promise<DisplayUserDTO>;
    unsubscribeToBroadcaster(dto: UnsubscribeToBroacasterDTO): Promise<DisplayUserDTO>;
    upgradeListerToBroadcaster(dto: UpgradeListenerToBroadcasterDTO): Promise<DisplayUserDTO>;
}

export default PodcastServiceInterface;
