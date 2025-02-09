import {podcastServiceInterface} from "../../config/dependencies";
import PodcastServiceInterface from "../../core/use_cases/podcast/PodcastServiceInterface";
import {Response, Request} from "express";
import PodcastServiceNotFoundException from "../../core/use_cases/podcast/PodcastServiceNotFoundException";
import PodcastServiceBadDataException from "../../core/use_cases/podcast/PodcastServiceBadDataException";
import PodcastServiceInternalServerErrorException from "../../core/use_cases/podcast/PodcastServiceInternalServerErrorException";
import {plainToInstance} from "class-transformer";
import {validateOrReject, ValidationError} from "class-validator";
import CreatePlaylistDTO from "../dto/user/CreatePlaylistDTO";
import AddPodcastToPlaylistDTO from "../dto/user/AddPodcastToPlaylistDTO";
import ChangeNamePlaylistDTO from "../dto/user/ChangeNamePlaylistDTO";
import ChangeDescriptionPlaylistDTO from "../dto/user/ChangeDescriptionPlaylistDTO";
import RemovePodcastToPlaylistDTO from "../dto/user/RemovePodcastToPlaylistDTO";
import validator from "validator";

const podcastService: PodcastServiceInterface = podcastServiceInterface;

export async function getPlaylists(req: Request, res: Response) {
    try {
        const playlists = await podcastService.getPlaylists();
        const filteredPlaylists = playlists.map(playlist => {
            return {
                id: playlist.get('id'),
                name: playlist.get('name'),
                description: playlist.get('description'),
                user: playlist.get('user'),
                links: [
                    {
                        rel: 'self',
                        href: '/playlists/' + playlist.get('id')
                    }
                ]
            }
        });
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcasts: filteredPlaylists,
            links: [
                {
                    rel: 'self',
                    href: '/playlists'
                }
            ]
        }
        res.status(200).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getPlaylist(req: Request, res: Response) {
    try {
        const playlist = await podcastService.getPlaylistById(req.params.id);
        const filteredContent = playlist.get('content').map((id: any) => {
            return {
                id: id,
                links: [
                    {
                        rel: 'self',
                        href: '/podcasts/' + id
                    }
                ]
            }
        });
        const filteredPlaylist = {
            id: playlist.get('id'),
            name: playlist.get('name'),
            description: playlist.get('description'),
            user: playlist.get('user'),
            content: filteredContent,
            links: [
                {
                    rel: 'self',
                    href: '/playlists/' + req.params.id
                }
            ]
        }
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: filteredPlaylist,
            links: [
                {
                    rel: 'self',
                    href: '/playlists/' + req.params.id
                }
            ]
        }
        res.status(200).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function createPlaylist(req: Request, res: Response) {
    try {
        let data = {
            name: req.body.name,
            description: req.body.description,
            userId: req.params.id,
        }
        try{
            const contactInput = plainToInstance(CreatePlaylistDTO, data);
            await validateOrReject(contactInput);
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.description)){
                throw new PodcastServiceBadDataException('Invalid description');
            }

        } catch (errors) {
            if (errors instanceof Array && errors[0] instanceof ValidationError) {
                const messages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join(', ');
                throw new PodcastServiceBadDataException(messages);
            }
            if (errors instanceof PodcastServiceBadDataException) {
                throw new PodcastServiceBadDataException(errors.message);
            }
        }

        const dto = new CreatePlaylistDTO(data.name, data.description, data.userId);
        const playlist = await podcastService.createPlaylist(dto);
        const filteredPlaylist = {
            id: playlist.get('id'),
            name: playlist.get('name'),
            description: playlist.get('description'),
            user: playlist.get('user'),
            links: [
                {
                    rel: 'self',
                    href: '/playlists/' + playlist.get('id')
                },
                {
                    rel: 'delete',
                    href: '/playlists/' + playlist.get('id')
                },
                {
                    rel: 'update',
                    href: '/playlists/' + playlist.get('id')
                }
            ]
        };
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: filteredPlaylist,
            links: [
                {
                    rel: 'self',
                    href: '/playlists/' + playlist.get('id')
                }
            ]
        }
        res.status(201).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function deletePlaylist(req: Request, res: Response) {
    try {
        await podcastService.deletePlaylist(req.params.id);
        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
}

export async function addPodcastToPlaylist(req: Request, res: Response) {
    try {
        let data = {
            podcastId: req.body.podcastId,
            playlistId: req.params.id,
        }
        try{
            const contactInput = plainToInstance(AddPodcastToPlaylistDTO, data);
            await validateOrReject(contactInput);
            if(!validator.isUUID(data.podcastId)){
                throw new PodcastServiceBadDataException('Invalid podcastId');
            }
        } catch (errors) {
            if (errors instanceof Array && errors[0] instanceof ValidationError) {
                const messages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join(', ');
                throw new PodcastServiceBadDataException(messages);
            }
            if (errors instanceof PodcastServiceBadDataException) {
                throw new PodcastServiceBadDataException(errors.message);
            }
        }
        const dto = new AddPodcastToPlaylistDTO(data.podcastId, data.playlistId);
        await podcastService.addPodcastToPlaylist(dto);
        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
}

export async function removePodcastToPlaylist(req: Request, res: Response) {
    try {
        let data = {
            podcastId: req.body.podcastId,
            playlistId: req.params.id,
        }
        try{
            const contactInput = plainToInstance(RemovePodcastToPlaylistDTO, data);
            await validateOrReject(contactInput);
            if(!validator.isUUID(data.podcastId)){
                throw new PodcastServiceBadDataException('Invalid podcastId');
            }
        } catch (errors) {
            if (errors instanceof Array && errors[0] instanceof ValidationError) {
                const messages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join(', ');
                throw new PodcastServiceBadDataException(messages);
            }
            if (errors instanceof PodcastServiceBadDataException) {
                throw new PodcastServiceBadDataException(errors.message);
            }
        }
        const dto = new RemovePodcastToPlaylistDTO(data.podcastId, data.playlistId);
        await podcastService.removePodcastToPlaylist(dto);
        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
}

export async function updatePlaylist(req: Request, res: Response) {
    try {
        let data = req.body;
        let playlist = null;
        if(data.name != undefined){
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            playlist = await podcastService.updateNamePlaylist(new ChangeNamePlaylistDTO(data.name, req.params.id));
        }
        if(data.description != undefined){
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.description)){
                throw new PodcastServiceBadDataException('Invalid description');
            }
            playlist = await podcastService.updateDescriptionPlaylist(new ChangeDescriptionPlaylistDTO(data.description, req.params.id));
        }
        if(playlist == null){
            throw new PodcastServiceBadDataException('No data to update');
        }
        const filteredPlaylist = {
            id: playlist.get('id'),
            name: playlist.get('name'),
            description: playlist.get('description'),
            user: playlist.get('user'),
            links: [
                {
                    rel: 'self',
                    href: '/playlists/' + playlist.get('id')
                },
                {
                    rel: 'delete',
                    href: '/playlists/' + playlist.get('id')
                },
                {
                    rel: 'update',
                    href: '/playlists/' + playlist.get('id')
                }
            ]
        };
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: filteredPlaylist,
            links: [
                {
                    rel: 'self',
                    href: '/playlists/' + playlist.get('id')
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        handleError(res, error);
    }
}


function handleError(res: Response, error: any) {
    if (error instanceof PodcastServiceNotFoundException) {
        res.status(404).json({ message: error.message });
    } else if (error instanceof PodcastServiceBadDataException) {
        res.status(400).json({ message: error.message });
    } else if (error instanceof PodcastServiceInternalServerErrorException) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}
