import PodcastServiceInterface from "../../core/use_cases/podcast/PodcastServiceInterface";
import {fileServiceInterface, podcastServiceInterface} from "../../config/dependencies";
import {Request, Response} from "express";
import PodcastServiceNotFoundException from "../../core/use_cases/podcast/PodcastServiceNotFoundException";
import PodcastServiceBadDataException from "../../core/use_cases/podcast/PodcastServiceBadDataException";
import PodcastServiceInternalServerErrorException
    from "../../core/use_cases/podcast/PodcastServiceInternalServerErrorException";
import FileServiceInterface from "../../core/use_cases/file/FileServiceInterface";
import moment from "moment/moment";
import {plainToInstance} from "class-transformer";
import CreatePodcastDTO from "../dto/podcast/CreatePodcastDTO";
import {validateOrReject, ValidationError} from "class-validator";
import validator from "validator";
import CreateMusicDTO from "../dto/user/CreateMusicDTO";


const podcastService : PodcastServiceInterface = podcastServiceInterface;
const fileService : FileServiceInterface = fileServiceInterface;

export async function createMusic(req: Request, res: Response) {
    try {
        let data = req.body;
        let fileURI: string | null = null;
        fileURI = await fileService.uploadFile(req);
        if(fileURI == null || fileURI == ""){
            throw new PodcastServiceBadDataException('Error uploading file');
        }

        data = {
            name: req.body.name,
            userId: req.body.userId,
            file: fileURI
        }

        try{
            const contactInput = plainToInstance(CreateMusicDTO, data);
            await validateOrReject(contactInput);
            if(!validator.isAlphanumeric(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            if (!validator.isUUID(data.userId)) {
                throw new PodcastServiceBadDataException('Invalid host_id');
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

        const music = await podcastService.createMusic(new CreateMusicDTO(data.name, data.file, data.userId));
        const filteredUsers = music.get('users').map((user: string) => {
            return {
                id: user,
                link : {
                    rel: 'self',
                    href: `/users/${user}`
                }
            }
        });

        const filteredMusic = {
            id: music.get('id'),
            name: music.get('name'),
            file: music.get('file'),
            users: filteredUsers
        }

        const response = {
            type: 'resource',
            locale: 'fr-FR',
            music: filteredMusic,
            links : [
                {
                    rel: 'self',
                    href: `/musics/${music.get('id')}`
                },
                {
                    rel: 'update',
                    href: `/musics/${music.get('id')}`
                },
                {
                    rel: 'delete',
                    href: `/musics/${music.get('id')}`
                }
            ]
        }

        res.status(201).json(response);

    } catch (error) {
        handleError(res, error);
    }
}

export async function getMusic(req: Request, res: Response) {
    try {
        const music = await podcastService.getMusicById(req.params.id);
        const filteredUsers = music.get('users').map((user: string) => {
            return {
                id: user,
                link : {
                    rel: 'self',
                    href: `/users/${user}`
                }
            }
        });

        const filteredMusic = {
            id: music.get('id'),
            name: music.get('name'),
            file: music.get('file'),
            users: filteredUsers
        }

        const response = {
            type: 'resource',
            locale: 'fr-FR',
            music: filteredMusic,
            links : [
                {
                    rel: 'self',
                    href: `/musics/${music.get('id')}`
                },
                {
                    rel: 'update',
                    href: `/musics/${music.get('id')}`
                },
                {
                    rel: 'delete',
                    href: `/musics/${music.get('id')}`
                }
            ]
        }

        res.status(200).json(response);

    } catch (error) {
        handleError(res, error);
    }
}

export async function getMusics(req: Request, res: Response) {
    try {
        const musics = await podcastService.getMusics();
        const filteredMusics = musics.map((music: any) => {
            const filteredUsers = music.get('users').map((user: string) => {
                return {
                    id: user,
                    link : {
                        rel: 'self',
                        href: `/users/${user}`
                    }
                }
            });

            return {
                id: music.get('id'),
                name: music.get('name'),
                file: music.get('file'),
                users: filteredUsers
            }
        });

        const response = {
            type: 'resource',
            locale: 'fr-FR',
            musics: filteredMusics
        }

        res.status(200).json(response);

    } catch (error) {
        handleError(res, error);
    }
}

export async function getMusicsByUserId(req: Request, res: Response) {
    try {
        const musics = await podcastService.getMusicsByUserId(req.params.userId);
        const filteredMusics = musics.map((music: any) => {
            const filteredUsers = music.get('users').map((user: string) => {
                return {
                    id: user,
                    link : {
                        rel: 'self',
                        href: `/users/${user}`
                    }
                }
            });

            return {
                id: music.get('id'),
                name: music.get('name'),
                file: music.get('file'),
                users: filteredUsers
            }
        });

        const response = {
            type: 'resource',
            locale: 'fr-FR',
            musics: filteredMusics
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
        console.error(error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}

