import PodcastServiceInterface from "../../core/use_cases/podcast/PodcastServiceInterface";
import { Request, Response } from "express";
import { podcastServiceInterface } from "../../config/dependencies";
import PodcastServiceNotFoundException from "../../core/use_cases/podcast/PodcastServiceNotFoundException";
import PodcastServiceInternalServerErrorException
    from "../../core/use_cases/podcast/PodcastServiceInternalServerErrorException";
import PodcastServiceBadDataException from "../../core/use_cases/podcast/PodcastServiceBadDataException";
import {plainToInstance} from "class-transformer";
import {validateOrReject, ValidationError} from "class-validator";
import validator from "validator";
import CreatePodcastDTO from "../dto/podcast/CreatePodcastDTO";
import UpdateTitlePodcastDTO from "../dto/podcast/UpdateTitlePodcastDTO";
import UpdateDescriptionPodcastDTO from "../dto/podcast/UpdateDescriptionPodcastDTO";
import UpdateImagePodcastDTO from "../dto/podcast/UpdateImagePodcastDTO";
import UpdateDatePodcastDTO from "../dto/podcast/UpdateDatePodcastDTO";
import moment from 'moment';
import CreateAvisDTO from "../dto/podcast/CreateAvisDTO";
import UpdateTitleAvisDTO from "../dto/podcast/UpdateTitleAvisDTO";
import UpdateContentAvisDTO from "../dto/podcast/UpdateContentAvisDTO";
import SubscribeToBroacasterDTO from "../dto/user/SubscribeToBroacasterDTO";


const podcastService : PodcastServiceInterface = podcastServiceInterface;

export async function getPodcasts(req: Request, res: Response) {
    try {
        const podcasts = await podcastService.getPodcasts();
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcasts: podcasts,
            links: [
                {
                    rel: 'self',
                    href: '/podcasts'
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getPodcast(req: Request, res: Response) {
    try {
        const podcast = await podcastService.getPodcastById(req.params.id);
        const filteredPodcast = {
            id: podcast.get('id'),
            name: podcast.get('name'),
            description: podcast.get('description'),
            date: podcast.get('date'),
            image: podcast.get('image'),
            creator: {
                id: podcast.get('creator'),
                links: [
                    {
                        rel: 'self',
                        href: `/users/${podcast.get('creator')}`
                    }
                ]
            }
        };
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: filteredPodcast,
            links: [
                {
                    rel: 'self',
                    href: `/podcasts/${podcast.get('id')}`
                },
                {
                    rel: 'delete',
                    href: `/podcasts/${podcast.get('id')}`
                },
                {
                    rel: 'update',
                    href: `/podcasts/${podcast.get('id')}`
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        handleError(res, error);
    }
}

export async function createPodcast(req: Request, res: Response) {
    try {
        let data = req.body;
        const formattedDate = moment(data.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        try{
            const contactInput = plainToInstance(CreatePodcastDTO, data);
            await validateOrReject(contactInput);
            if(!validator.isDate(formattedDate)){
                throw new PodcastServiceBadDataException('Invalid date');
            }
            if(!validator.isAlphanumeric(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            if (!validator.isUUID(data.creatorId)) {
                throw new PodcastServiceBadDataException('Invalid host_id');
            }
            const imagePattern = /^(http:\/\/|https:\/\/)?([a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+)+(\/[a-zA-Z0-9-_]+)*\.(png|jpeg|jpg|gif|bmp|webp)|([a-zA-Z0-9-_]+\.(png|jpeg|jpg|gif|bmp|webp))$/;

            if (!imagePattern.test(data.image)) {
                throw new PodcastServiceBadDataException('Invalid image');
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
        const dateObject = moment(formattedDate, 'YYYY-MM-DD').toDate();
        const dto = new CreatePodcastDTO(dateObject, data.name, data.description, data.creatorId, data.image);
        const podcast = await podcastService.createPodcast(dto);
        const filteredPodcast = {
            id: podcast.get('id'),
            name: podcast.get('name'),
            description: podcast.get('description'),
            date: podcast.get('date'),
            image: podcast.get('image'),
            creator: {
                id: podcast.get('creator'),
                links: [
                    {
                        rel: 'self',
                        href: `/users/${podcast.get('creator')}`
                    }
                ]
            },
            links: [
                {
                    rel: 'self',
                    href: `/podcasts/${podcast.get('id')}`
                },
                {
                    rel: 'delete',
                    href: `/podcasts/${podcast.get('id')}`
                },
                {
                    rel: 'update',
                    href: `/podcasts/${podcast.get('id')}`
                }
            ]
        };
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: filteredPodcast,
            links: [
                {
                    rel: 'self',
                    href: `/podcasts/${podcast.get('id')}`
                }
            ]
        };

        res.status(201).json(response);
    } catch (error) {
        handleError(res, error);
    }
}


export async function updatePodcast(req: Request, res: Response) {
    try {
        let data = req.body;
        let podcast = null;
        if(data.date != undefined){
            const formattedDate = moment(data.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
            if(!validator.isDate(formattedDate)){
                throw new PodcastServiceBadDataException('Invalid date');
            }
            const dateObject = moment(formattedDate, 'YYYY-MM-DD').toDate();
            podcast = await podcastService.updateDatePodcast(new UpdateDatePodcastDTO(dateObject, req.params.id));
            console.log(podcast);
        }
        if(data.name != undefined){
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            podcast = await podcastService.updateTitlePodcast(new UpdateTitlePodcastDTO(data.name, req.params.id));
        }
        if(data.description != undefined){
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.description)){
                throw new PodcastServiceBadDataException('Invalid description');
            }
            podcast = await podcastService.updateDescriptionPodcast(new UpdateDescriptionPodcastDTO(data.description, req.params.id));
        }
        if(data.image != undefined){
            const imagePattern = /^(http:\/\/|https:\/\/)?([a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+)+(\/[a-zA-Z0-9-_]+)*\.(png|jpeg|jpg|gif|bmp|webp)|([a-zA-Z0-9-_]+\.(png|jpeg|jpg|gif|bmp|webp))$/;

            if (!imagePattern.test(data.image)) {
                throw new PodcastServiceBadDataException('Invalid image');
            }
            podcast = await podcastService.updateImagePodcast(new UpdateImagePodcastDTO(data.image, req.params.id));
        }
        if(podcast == null){
            throw new PodcastServiceBadDataException('No data to update');
        }
        const filteredPodcast = {
            id: podcast.get('id'),
            name: podcast.get('name'),
            description: podcast.get('description'),
            date: podcast.get('date'),
            image: podcast.get('image'),
            creator: {
                id: podcast.get('creator'),
                links: [
                    {
                        rel: 'self',
                        href: `/users/${podcast.get('creator')}`
                    }
                ]
            },
            links: [
                {
                    rel: 'self',
                    href: `/podcasts/${podcast.get('id')}`
                },
                {
                    rel: 'delete',
                    href: `/podcasts/${podcast.get('id')}`
                },
                {
                    rel: 'update',
                    href: `/podcasts/${podcast.get('id')}`
                }
            ]
        };
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: filteredPodcast,
            links: [
                {
                    rel: 'self',
                    href: `/podcasts/${podcast.get('id')}`
                }
            ]
        };

        res.status(200).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function deletePodcast(req: Request, res: Response) {
    try {
        await podcastService.deletePodcast(req.params.id);
        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
}

export async function getAvisByPodcast(req: Request, res: Response) {
    try {
        const avis = await podcastService.getAvisPodcast(req.params.id);
        const filteredAvis = avis.map(avis => {
            return {
                id: avis.get('id'),
                title: avis.get('title'),
                content: avis.get('content'),
                user: {
                    id: avis.get('userId'),
                    links: [
                        {
                            rel: 'self',
                            href: `/users/${avis.get('userId')}`
                        }
                    ]
                }
            }
        });
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            avis: filteredAvis,
            links: [
                {
                    rel: 'self',
                    href: `/podcasts/${req.params.id}/avis`
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getAvisById(req: Request, res: Response) {
    try {
        const avis = await podcastService.getAvisPodcastById(req.params.id);
        const filteredAvis = {
            id: avis.get('id'),
            title: avis.get('title'),
            content: avis.get('content'),
            user: {
                id: avis.get('userId'),
                links: [
                    {
                        rel: 'self',
                        href: `/users/${avis.get('userId')}`
                    }
                ]
            },
            podcast:{
                id: avis.get('podcast'),
                links: [
                    {
                        rel: 'self',
                        href: `/podcasts/${avis.get('podcast')}`
                    }
                ]
            }
        };
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            avis: filteredAvis,
            links: [
                {
                    rel: 'self',
                    href: `/avis/${req.params.id}`
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function createAvis(req: Request, res: Response) {
    try {
        let data = {
            title : req.body.title,
            content : req.body.content,
            podcastId : req.params.id,
            userId : req.body.userId
        };
        try{
            const contactInput = plainToInstance(CreateAvisDTO, data);
            await validateOrReject(contactInput);
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.title)){
                throw new PodcastServiceBadDataException('Invalid title');
            }
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.content)){
                throw new PodcastServiceBadDataException('Invalid content');
            }
            if(!validator.isUUID(data.podcastId)){
                throw new PodcastServiceBadDataException('Invalid podcast');
            }
            if(!validator.isUUID(data.userId)){
                throw new PodcastServiceBadDataException('Invalid user');
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
        const dto = new CreateAvisDTO(data.title, data.content, data.podcastId, data.userId);
        const avis = await podcastService.createAvis(dto);
        const filteredAvis = {
            id: avis.get('id'),
            title: avis.get('title'),
            content: avis.get('content'),
            user: {
                id: avis.get('userId'),
                links: [
                    {
                        rel: 'self',
                        href: `/users/${avis.get('userId')}`
                    }
                ]
            },
            podcast:{
                id: avis.get('podcast'),
                links: [
                    {
                        rel: 'self',
                        href: `/podcasts/${avis.get('podcast')}`
                    }
                ]
            },
            links: [
                {
                    rel: 'self',
                    href: `/avis/${avis.get('id')}`
                }
            ]
        };
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            avis: filteredAvis,
            links: [
                {
                    rel: 'self',
                    href: `/avis/${avis.get('id')}`
                }
            ]
        };

        res.status(201).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function deleteAvis(req: Request, res: Response) {
    try {
        await podcastService.deleteAvis(req.params.id);
        res.status(204).send();
    } catch (error) {
        handleError(res, error);
    }
}

export async function updateAvis(req: Request, res: Response){
    try{
        let data = req.body;
        let avis = null;
        if(data.title != undefined){
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.title)){
                throw new PodcastServiceBadDataException('Invalid content');
            }
            avis = await podcastService.updateTitleAvisPodcast(new UpdateTitleAvisDTO(data.title, req.params.id));
        }
        if(data.content != undefined){
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.content)){
                throw new PodcastServiceBadDataException('Invalid content');
            }
            avis = await podcastService.updateContentAvisPodcast(new UpdateContentAvisDTO(data.content, req.params.id));
        }
        if(avis == null){
            throw new PodcastServiceBadDataException('No data to update');
        }
        const filteredAvis = {
            id: avis.get('id'),
            title: avis.get('title'),
            content: avis.get('content'),
            user: {
                id: avis.get('userId'),
                links: [
                    {
                        rel: 'self',
                        href: `/users/${avis.get('userId')}`
                    }
                ]
            },
            podcast:{
                id: avis.get('podcast'),
                links: [
                    {
                        rel: 'self',
                        href: `/podcasts/${avis.get('podcast')}`
                    }
                ]
            }
        };
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            avis: filteredAvis,
            links: [
                {
                    rel: 'self',
                    href: `/avis/${req.params.id}`
                }
            ]
        }
        res.status(200).json(response);

    } catch (error){
        handleError(res, error);
    }
}

export async function subscribeToBroadcaster(req: Request, res: Response){
    try{
        if(!validator.isUUID(req.params.id)){
            throw new PodcastServiceBadDataException('Invalid broadcaster');
        }
        if(!validator.isUUID(req.body.userId)){
            throw new PodcastServiceBadDataException('Invalid listener');
        }
        let broadcaster = await podcastService.subscribeToBroadcaster(new SubscribeToBroacasterDTO(req.params.id, req.body.userId));

        let filteredSubscribers = broadcaster.get('subscribers').map((subscriber: string) => {
            return {
                id: subscriber,
                links: [
                    {
                        rel: 'self',
                        href: `/users/${subscriber}`
                    }
                ]
            }
        });

        let filteredSubscriptions = broadcaster.get('subscriptions').map((subscription: string) => {
            return {
                id: subscription,
                links: [
                    {
                        rel: 'self',
                        href: `/users/${subscription}`
                    }
                ]
            }
        });

        let filteredPlaylists = broadcaster.get('playlists').map((playlist: string) => {
            return {
                id: playlist,
                links: [
                    {
                        rel: 'self',
                        href: `/playlists/${playlist}`
                    }
                ]
            }
        });

        let filteredMixers = broadcaster.get('mixers').map((mixer: string) => {
            return {
                id: mixer,
                links: [
                    {
                        rel: 'self',
                        href: `/mixers/${mixer}`
                    }
                ]
            }
        });

        let filteredDirects = broadcaster.get('directs').map((direct: string) => {
            return {
                id: direct,
                links: [
                    {
                        rel: 'self',
                        href: `/directs/${direct}`
                    }
                ]
            }
        });

        let filteredInvitations = broadcaster.get('guess').map((invitation: string) => {
            return {
                id: invitation,
                links: [
                    {
                        rel: 'self',
                        href: `/directs/${invitation}`
                    }
                ]
            }
        });



        let filteredBroadcaster = {
            id: broadcaster.get('id'),
            email: broadcaster.get('email'),
            pseudo: broadcaster.get('pseudo'),
            subscribers: filteredSubscribers,
            subscriptions: filteredSubscriptions,
            playlists: filteredPlaylists,
            mixers: filteredMixers,
            directs: filteredDirects,
            invitations: filteredInvitations
        }
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            broadcaster: filteredBroadcaster,
            links: [
                {
                    rel: 'self',
                    href: `/users/${req.params.id}`
                }
            ]
        }
        res.status(200).json(response);
    }catch (error){
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
