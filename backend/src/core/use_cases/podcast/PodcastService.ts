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
import RepositoryInternalServerErrorException from "../../repositoryInterface/RepositoryInternalServerErrorException";
import PodcastServiceInternalServerErrorException from "./PodcastServiceInternalServerErrorException";
import RepositoryNotFoundException from "../../repositoryInterface/RepositoryNotFoundException";
import PodcastServiceNotFoundException from "./PodcastServiceNotFoundException";
import DisplayDetailsPodcastDTO from "../../../adapters/dto/podcast/DisplayDetailsPodcastDTO";
import Avis from "../../domain/entities/avis/Avis";
import PlaylistRepositoryInterface from "../../repositoryInterface/PlaylistRepositoryInterface";
import Playlist from "../../domain/entities/playlist/Playlist";
import ChangeDescriptionPlaylistDTO from "../../../adapters/dto/user/ChangeDescriptionPlaylistDTO";
import RemovePodcastToPlaylistDTO from "../../../adapters/dto/user/RemovePodcastToPlaylistDTO";
import DirectRepositoryInterface from "../../repositoryInterface/DirectRepositoryInterface";
import Direct from "../../domain/entities/direct/Direct";
import UserRepositoryInterface from "../../repositoryInterface/UserRepositoryInterface";
import PodcastServiceBadDataException from "./PodcastServiceBadDataException";
import * as constants from "../../../config/constantes";
import MusicRepositoryInterface from "../../repositoryInterface/MusicRepositoryInterface";
import Music from "../../domain/entities/music/Music";

class PodcastService implements PodcastServiceInterface {

    private instancePodcast: PodcastRepositoryInterface;
    private instancePlaylist: PlaylistRepositoryInterface;
    private instanceDirect: DirectRepositoryInterface;
    private instanceUser: UserRepositoryInterface;
    private instanceMusic: MusicRepositoryInterface;

    constructor(instancePodcast: PodcastRepositoryInterface, instancePlaylist: PlaylistRepositoryInterface, instanceDirect: DirectRepositoryInterface, instanceUser: UserRepositoryInterface, instanceMusic: MusicRepositoryInterface) {
        this.instancePodcast = instancePodcast;
        this.instancePlaylist = instancePlaylist;
        this.instanceDirect = instanceDirect;
        this.instanceUser = instanceUser;
        this.instanceMusic = instanceMusic;
    }

    public async getPodcastById(id: string): Promise<DisplayDetailsPodcastDTO> {
        return this.instancePodcast.findById(id).then((podcast) => {
            let p = new DisplayDetailsPodcastDTO(podcast as Podcast);
            return p;
        }).catch((error) => {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast description");
            }
        });
    }

    public async getPodcasts(): Promise<DisplayPodcastDTO[]> {
        try {
            const Promisepodcasts = await this.instancePodcast.findAll();
            const podcasts = await Promise.all(Promisepodcasts);
            let p = podcasts.map((podcast : Podcast) => new DisplayPodcastDTO(podcast));
            return p;
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching podcasts");
            }
        }
    }

    public async getPodcastsByUserId(userId: string): Promise<DisplayPodcastDTO[]> {
        try {
            let promise_podcasts = await this.instancePodcast.getPodcastsByUserId(userId);
            let podcasts = await Promise.all(promise_podcasts);
            return podcasts.map((podcast) => new DisplayPodcastDTO(podcast));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast description");
            }
        }
    }

    public async createPodcast(podcast: CreatePodcastDTO): Promise<DisplayDetailsPodcastDTO> {
        try {
            let p = new Podcast(podcast.get('date'), podcast.get('name'), podcast.get('description'), podcast.get('creatorId'), podcast.get('image'), podcast.get('fileId'));
            const id = await this.instancePodcast.save(p);
            p.setId(id);
            return new DisplayDetailsPodcastDTO(p);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast description");
            }
        }
    }

    public async updateTitlePodcast(dto: UpdateTitlePodcastDTO): Promise<DisplayDetailsPodcastDTO> {
        try {
            const podcast = await this.instancePodcast.findById(dto.get('podcastId'));
            if (podcast === null) {
                throw new PodcastServiceNotFoundException("Podcast not found");
            }
            podcast.setName(dto.get('title'));
            await this.instancePodcast.save(podcast);
            return new DisplayDetailsPodcastDTO(podcast as Podcast);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast description");
            }
        }
    }

    public async updateDatePodcast(dto: UpdateDatePodcastDTO): Promise<DisplayDetailsPodcastDTO> {
        try {
            const podcast = await this.instancePodcast.findById(dto.get('podcastId')) as Podcast;
            if (podcast === null) {
                throw new PodcastServiceNotFoundException("Podcast not found");
            }
            podcast.setDate(dto.get('date'));
            await this.instancePodcast.save(podcast);
            return new DisplayDetailsPodcastDTO(podcast as Podcast);
        } catch (error) {
            console.log(error);
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast description");
            }
        }
    }


    public async updateDescriptionPodcast(dto: UpdateDescriptionPodcastDTO): Promise<DisplayDetailsPodcastDTO> {
        try {
            const podcast = await this.instancePodcast.findById(dto.get('podcastId'));
            if (podcast === null) {
                throw new PodcastServiceNotFoundException("Podcast not found");
            }
            podcast.setDescription(dto.get('description'));
            await this.instancePodcast.save(podcast);
            return new DisplayDetailsPodcastDTO(podcast as Podcast);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast description");
            }
        }
    }

    public async updateImagePodcast(dto: UpdateImagePodcastDTO): Promise<DisplayDetailsPodcastDTO> {
        try {
            const podcast = await this.instancePodcast.findById(dto.get('podcastId'));
            if (podcast === null) {
                throw new PodcastServiceNotFoundException("Podcast not found");
            }
            podcast.setImage(dto.get('image'));
            await this.instancePodcast.save(podcast);
            return new DisplayDetailsPodcastDTO(podcast as Podcast);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast description");
            }
        }
    }

    public deletePodcast(id: string): Promise<void> {
        try {
            return this.instancePodcast.delete(id);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast description");
            }
        }
    }

    public searchPodcastInfo(dto: SearchPodcastDTO): Promise<DisplayPodcastDTO[]> {
        throw new Error('Method not implemented.');
    }

    public async getAvisPodcast(podcastId: string): Promise<DisplayAvisDTO[]> {
        try{
            const podcast = await this.instancePodcast.findById(podcastId);
            if (podcast === null) {
                throw new PodcastServiceNotFoundException("Podcast not found");
            }
            const avis = await this.instancePodcast.getAvisByPodcastId(podcastId);
            return avis.map((avi) => new DisplayAvisDTO(avi));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching podcast avis");
            }
        }
    }

    public async getAvisPodcastById(avisId: string): Promise<DisplayAvisDTO> {
        try{
            const avis = await this.instancePodcast.findAvisById(avisId);
            if (avis === null) {
                throw new PodcastServiceNotFoundException("Avis not found");
            }
            return new DisplayAvisDTO(avis);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching podcast avis");
            }
        }
    }

    public searchAvisPodcastInfo(dto: SearchAvisDTO): Promise<DisplayAvisDTO[]> {
        throw new Error('Method not implemented.');
    }

    public async addAvisPodcast(dto: AddAvisToPodcastDTO): Promise<DisplayAvisDTO> {
        try {
            const avis = await this.instancePodcast.findAvisById(dto.get('avisId'));
            if (avis === null) {
                throw new PodcastServiceNotFoundException("Avis not found");
            }
            avis.setPodcast(dto.get('podcast'));
            await this.instancePodcast.saveAvis(avis);
            return new DisplayAvisDTO(avis);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching podcast avis");
            }
        }
    }

    public async updateTitleAvisPodcast(dto: UpdateTitleAvisDTO): Promise<DisplayAvisDTO> {
        try{
            const avis = await this.instancePodcast.findAvisById(dto.get('avisId'));
            if (avis === null) {
                throw new PodcastServiceNotFoundException("Avis not found");
            }
            avis.setTitle(dto.get('title'));
            await this.instancePodcast.saveAvis(avis)
            return new DisplayAvisDTO(avis)
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast avis");
            }
        }
    }

    public async updateContentAvisPodcast(dto: UpdateContentAvisDTO): Promise<DisplayAvisDTO> {
        try{
            const avis = await this.instancePodcast.findAvisById(dto.get('avisId'));
            if (avis === null) {
                throw new PodcastServiceNotFoundException("Avis not found");
            }
            avis.setContent(dto.get('content'));
            await this.instancePodcast.saveAvis(avis)
            return new DisplayAvisDTO(avis)
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating podcast avis");
            }
        }
    }

    public async createAvis(dto: CreateAvisDTO): Promise<DisplayAvisDTO> {
        try{
            const avis = new Avis(dto.get('title'), dto.get('content'), dto.get('podcastId'), dto.get('userId'));
            let id = await this.instancePodcast.saveAvis(avis);
            avis.setId(id);
            return new DisplayAvisDTO(avis);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while creating podcast avis");
            }
        }
    }

    public deleteAvis(id: string): Promise<void> {
        try{
            const avis = this.instancePodcast.findAvisById(id);
            if (avis === null) {
                throw new PodcastServiceNotFoundException("Avis not found");
            }
            return this.instancePodcast.deleteAvis(id);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while deleting podcast avis");
            }
        }
    }

    public async getPlaylists(): Promise<DisplayPlaylistDTO[]> {
        try{
            const playlists = await this.instancePlaylist.findAll();
            return playlists.map((playlist) => new DisplayPlaylistDTO(playlist));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching playlists");
            }
        }
    }

    public async getPlaylistById(id: string): Promise<DisplayPlaylistDTO> {
        try{
            const playlist = await this.instancePlaylist.find(id);
            return new DisplayPlaylistDTO(playlist);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while finding playlist");
            }
        }
    }

    public async getPlaylistsByPodcastId(podcastId: string): Promise<DisplayPlaylistDTO[]> {
        try{
            const podcastExists = await this.instancePodcast.findById(podcastId);
            if (podcastExists === null) {
                throw new PodcastServiceNotFoundException("Podcast not found");
            }
            const playlist = await this.instancePlaylist.getPlaylistsByPodcastId(podcastId);
            return playlist.map((playlist) => new DisplayPlaylistDTO(playlist));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching playlists");
            }
        }
    }

    public async getPlaylistsByUserId(userId: string): Promise<DisplayPlaylistDTO[]> {
        try{
            const promise_playlists = await this.instancePlaylist.getPlaylistsByUserId(userId);
            const playlists = await Promise.all(promise_playlists);
            return playlists.map((playlist) => new DisplayPlaylistDTO(playlist));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching playlists");
            }
        }
    }

    public async createPlaylist(dto: CreatePlaylistDTO): Promise<DisplayPlaylistDTO> {
        try{
            const playlist = new Playlist(dto.get('name'), dto.get('description'), dto.get('userId'));
            const id = await this.instancePlaylist.save(playlist);
            playlist.setId(id);
            return new DisplayPlaylistDTO(playlist);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while creating playlist");
            }
        }
    }

    public async deletePlaylist(id: string): Promise<void> {
        try{
            await this.instancePlaylist.deletePlaylist(id);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while deleting playlist");
            }
        }
    }

    public async addPodcastToPlaylist(dto: AddPodcastToPlaylistDTO): Promise<DisplayPlaylistDTO> {
        try{
            const playlist = await this.instancePlaylist.find(dto.get('playlistId'));
            if (playlist === null) {
                throw new PodcastServiceNotFoundException("Playlist not found");
            }
            playlist.addContent(dto.get('podcastId'));
            await this.instancePlaylist.save(playlist);
            return new DisplayPlaylistDTO(playlist);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while deleting playlist");
            }
        }
    }

    public async removePodcastToPlaylist(dto: RemovePodcastToPlaylistDTO): Promise<DisplayPlaylistDTO> {
        try{
            const playlist = await this.instancePlaylist.find(dto.get('playlistId'));
            if (playlist === null) {
                throw new PodcastServiceNotFoundException("Playlist not found");
            }
            playlist.removeContent(dto.get('podcastId'));
            await this.instancePlaylist.save(playlist);
            return new DisplayPlaylistDTO(playlist);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while deleting playlist");
            }
        }
    }

    public async updateNamePlaylist(dto: ChangeNamePlaylistDTO): Promise<DisplayPlaylistDTO> {
        try{
            const playlist = await this.instancePlaylist.find(dto.get('playlistId'));
            if (playlist === null) {
                throw new PodcastServiceNotFoundException("Playlist not found");
            }
            playlist.setName(dto.get('name'));
            await this.instancePlaylist.save(playlist);
            return new DisplayPlaylistDTO(playlist);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating name playlist");
            }
        }
    }

    public async updateDescriptionPlaylist(dto: ChangeDescriptionPlaylistDTO): Promise<DisplayPlaylistDTO> {
        try{
            const playlist = await this.instancePlaylist.find(dto.get('playlistId'));
            if (playlist === null) {
                throw new PodcastServiceNotFoundException("Playlist not found");
            }
            playlist.setName(dto.get('description'));
            await this.instancePlaylist.save(playlist);
            return new DisplayPlaylistDTO(playlist);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating description playlist");
            }
        }
    }

    public async getDirects(): Promise<DisplayDirectDTO[]> {
        try{
            const promise_directs = await this.instanceDirect.findAll();
            const directs = await Promise.all(promise_directs);
            return directs.map((direct) => new DisplayDirectDTO(direct));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching directs");
            }
        }
    }

    public async getDirectById(id: string): Promise<DisplayDirectDTO> {
        try{
            const direct = await this.instanceDirect.find(id);
            if (direct === null) {
                throw new PodcastServiceNotFoundException("Direct not found");
            }
            return new DisplayDirectDTO(direct);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while finding directs");
            }
        }
    }

    public async getDirectsByUserId(userId: string): Promise<DisplayDirectDTO[]> {
        try{
            const promise_directs = await this.instanceDirect.findByUserId(userId);
            const directs = await Promise.all(promise_directs);
            return directs.map((direct) => new DisplayDirectDTO(direct));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {

                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching directs");
            }
        }
    }

    public async getCurrentDirects(): Promise<DisplayDirectDTO[]> {
        try{
            const promise_directs = await this.instanceDirect.findNow();
            const directs = await Promise.all(promise_directs);
            return directs.map((direct) => new DisplayDirectDTO(direct));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching directs");
            }
        }
    }

    public searchDirectInfo(dto: SearchDirectDTO): Promise<DisplayDirectDTO[]> {
        throw new Error('Method not implemented.');
    }

    public async createDirect(direct: CreateDirectDTO): Promise<DisplayDirectDTO> {
        try{
            const d = new Direct(direct.get('name'), direct.get('description'), direct.get('image'), direct.get('hostId'), direct.get('date'), direct.get('duration'));
            const id = await this.instanceDirect.save(d);
            d.setId(id);
            return new DisplayDirectDTO(d);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while saving direct");
            }
        }
    }

    public async deleteDirect(id: string): Promise<void> {
        try{
            await this.instanceDirect.delete(id);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while deleting direct");
            }
        }
    }

    public async updateNameDirect(dto: ChangeNameDirectDTO): Promise<DisplayDirectDTO> {
        try{
            const direct = await this.instanceDirect.find(dto.get('directId'));
            if(direct === null){
                throw new PodcastServiceNotFoundException('Direct not found');
            }
            direct.setName(dto.get("name"));
            await this.instanceDirect.save(direct);
            return new DisplayDirectDTO(direct);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating name direct");
            }
        }
    }

    public async updateDescriptionDirect(dto: ChangeDescriptionDirectDTO): Promise<DisplayDirectDTO> {
        try{
            const direct = await this.instanceDirect.find(dto.get('directId'));
            if(direct === null){
                throw new PodcastServiceNotFoundException('Direct not found');
            }
            direct.setDescription(dto.get("description"));
            await this.instanceDirect.save(direct);
            return new DisplayDirectDTO(direct);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating description direct");
            }
        }
    }

    public async updateImageDirect(dto: ChangeImageDirectDTO): Promise<DisplayDirectDTO> {
        try{
            const direct = await this.instanceDirect.find(dto.get('directId'));
            if(direct === null){
                throw new PodcastServiceNotFoundException('Direct not found');
            }
            direct.setImage(dto.get("image"));
            await this.instanceDirect.save(direct);
            return new DisplayDirectDTO(direct);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating image direct");
            }
        }
    }

    public async updateDateDirect(dto: ChangeDateDirectDTO): Promise<DisplayDirectDTO> {
        try{
            const direct = await this.instanceDirect.find(dto.get('directId'));
            if(direct === null){
                throw new PodcastServiceNotFoundException('Direct not found');
            }
            direct.setDate(dto.get("date"));
            await this.instanceDirect.save(direct);
            return new DisplayDirectDTO(direct);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating date direct");
            }
        }
    }

    public async updateDurationDirect(dto: ChangeDurationDirectDTO): Promise<DisplayDirectDTO> {
        try{
            console.log(dto.get('directId'));
            const direct = await this.instanceDirect.find(dto.get('directId'));
            if(direct === null){
                throw new PodcastServiceNotFoundException('Direct not found');
            }
            direct.setDuration(dto.get("duration"));
            await this.instanceDirect.save(direct);
            return new DisplayDirectDTO(direct);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while updating duration direct");
            }
        }
    }

    public async inviteUserToDirect(dto: InviteGuessToDirectDTO): Promise<DisplayDirectDTO> {
        try{
            const direct = await this.instanceDirect.find(dto.get('directId'));
            if(direct === null){
                throw new PodcastServiceNotFoundException('Direct not found');
            }
            direct.addGuess(dto.get("guessId"))
            await this.instanceDirect.save(direct);
            return new DisplayDirectDTO(direct);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while adding guess direct");
            }
        }
    }

    public async cancelInvitationToDirect(dto: CancelGuessToDirectDTO): Promise<DisplayDirectDTO> {
        try{
            const direct = await this.instanceDirect.find(dto.get('directId'));
            if(direct === null){
                throw new PodcastServiceNotFoundException('Direct not found');
            }
            direct.removeGuess(dto.get("guessId"))
            await this.instanceDirect.save(direct);
            return new DisplayDirectDTO(direct);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while removing guess direct");
            }
        }
    }

    public async getMusics(): Promise<DisplayMusicDTO[]> {
        try{
            let promise_music = await this.instanceMusic.findAll();
            let musics = await Promise.all(promise_music);
            return musics.map((music) => new DisplayMusicDTO(music));
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching musics");
            }
        }
    }

    public async getMusicById(id: string): Promise<DisplayMusicDTO> {
        try{
            let music = await this.instanceMusic.findById(id);
            return new DisplayMusicDTO(music);
        }catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while getting music");
            }
        }
    }

    public async getMusicsByUserId(userId: string): Promise<DisplayMusicDTO[]> {
        try{
            let promise_music = await this.instanceMusic.getMusicsByUserId(userId);
            let musics = await Promise.all(promise_music);
            return musics.map((music) => new DisplayMusicDTO(music));
        }catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while fetching musics");
            }
        }
    }

    public async createMusic(music: CreateMusicDTO): Promise<DisplayMusicDTO> {
        try{
            let m = new Music(music.get('name'), music.get('file'));
            m.addUser(music.get('userId'));
            let id = await this.instanceMusic.save(m);
            m.setId(id);
            return new DisplayMusicDTO(m);
        }catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof PodcastServiceBadDataException) {
                throw new PodcastServiceBadDataException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while creating music");
            }
        }
    }

    public async deleteMusic(id: string): Promise<void> {
        try{
            await this.instanceMusic.delete(id);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof PodcastServiceBadDataException) {
                throw new PodcastServiceBadDataException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while creating music");
            }
        }
    }

    public async updateNameMusic(dto: ChangeNameMusicDTO): Promise<DisplayMusicDTO> {
        try{
            let music = await this.instanceMusic.findById(dto.get('musicId'));
            music.setName(dto.get('name'));
            await this.instanceMusic.save(music);
            return new DisplayMusicDTO(music);
        }catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof PodcastServiceBadDataException) {
                throw new PodcastServiceBadDataException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while creating music");
            }
        }
    }

    public async addMusicToMixer(dto: AddMusicToMixerDTO): Promise<DisplayMusicDTO> {
        try{
            let music = await this.instanceMusic.findById(dto.get('musicId'));
            music.addUser(dto.get('userId'));
            await this.instanceMusic.save(music);
            return new DisplayMusicDTO(music);
        }catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof PodcastServiceBadDataException) {
                throw new PodcastServiceBadDataException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while creating music");
            }
        }
    }

    public async removeMusicToMixer(dto: RemoveMusicToMixerDTO): Promise<DisplayMusicDTO> {
        try{
            let music = await this.instanceMusic.findById(dto.get('musicId'));
            music.removeUser(dto.get('userId'));
            await this.instanceMusic.save(music);
            return new DisplayMusicDTO(music);

        }catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof PodcastServiceBadDataException) {
                throw new PodcastServiceBadDataException(error.message);
            } else {
                console.log(error);
                throw new PodcastServiceInternalServerErrorException("An error occurred while creating music");
            }
        }
    }

    public searchMusicInfo(dto: SearchMusicDTO): Promise<DisplayMusicDTO[]> {
        throw new Error('Method not implemented.');
    }

    public async subscribeToBroadcaster(dto: SubscribeToBroacasterDTO): Promise<DisplayUserDTO> {
        try{
            const broadcaster = await this.instanceUser.find(dto.get('broadcasterId'))
            broadcaster.addSubscriber(dto.get('userId'));
            await this.instanceUser.save(broadcaster);
            return new DisplayUserDTO(broadcaster);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while subscribing to broadcaster");
            }
        }
    }

    public async unsubscribeToBroadcaster(dto: UnsubscribeToBroacasterDTO): Promise<DisplayUserDTO> {
        try{
            const broadcaster = await this.instanceUser.find(dto.get('broadcasterId'))
            broadcaster.removeSubscriber(dto.get('userId'));
            await this.instanceUser.save(broadcaster);
            return new DisplayUserDTO(broadcaster);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while subscribing to broadcaster");
            }
        }
    }

    public async upgradeListerToBroadcaster(dto: UpgradeListenerToBroadcasterDTO): Promise<DisplayUserDTO> {
        try{
            const user = await this.instanceUser.find(dto.get('userId'))
            user.setRole(constants.BROADCASTER);
            await this.instanceUser.save(user);
            return new DisplayUserDTO(user);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while upgrading user to broadcaster");
            }
        }
    }

    public async disupgradeListerToBroadcaster(dto: UpgradeListenerToBroadcasterDTO): Promise<DisplayUserDTO> {
        try{
            const user = await this.instanceUser.find(dto.get('userId'))
            user.setRole(constants.LISTENER);
            await this.instanceUser.save(user);
            return new DisplayUserDTO(user);
        } catch (error) {
            if (error instanceof RepositoryInternalServerErrorException) {
                throw new PodcastServiceInternalServerErrorException(error.message);
            } else if (error instanceof RepositoryNotFoundException) {
                throw new PodcastServiceNotFoundException(error.message);
            } else {
                throw new PodcastServiceInternalServerErrorException("An error occurred while upgrading user to broadcaster");
            }
        }
    }
}

export default PodcastService;
