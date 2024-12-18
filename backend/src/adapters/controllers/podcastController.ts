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
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: podcast,
            links: [
                {
                    rel: 'self',
                    href: `/podcasts/${podcast.get('id')}`
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        handleError(res, error);
    }
}

export async function createPodcast(req: Request, res: Response) {
    try {
        let data = req.body;
        try{
            const contactInput = plainToInstance(CreatePodcastDTO, data);
            await validateOrReject(contactInput);
            if(!validator.isDate(data.date)){
                throw new PodcastServiceBadDataException('Invalid date');
            }
            if(!validator.isAlphanumeric(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            if(!validator.isAlpha(data.host_id)){
                throw new PodcastServiceBadDataException('Invalid host_id');
            }
            if(!validator.isAlphanumeric(data.image)){
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
        const dto = new CreatePodcastDTO(data.date, data.name, data.description, data.host_id, data.image);
        const podcast = await podcastService.createPodcast(dto);
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: podcast,
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
            if(!validator.isDate(data.date)){
                throw new PodcastServiceBadDataException('Invalid date');
            }
            let date = new Date(data.date);
            podcast = await podcastService.updateDatePodcast(new UpdateDatePodcastDTO(date, req.params.id));
        }
        if(data.name != undefined){
            if(!validator.isAlphanumeric(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            podcast = await podcastService.updateTitlePodcast(new UpdateTitlePodcastDTO(data.name, req.params.id));
        }
        if(data.description != undefined){
            if(!validator.isAlphanumeric(data.description)){
                throw new PodcastServiceBadDataException('Invalid description');
            }
            podcast = await podcastService.updateDescriptionPodcast(new UpdateDescriptionPodcastDTO(data.description, req.params.id));
        }
        if(data.image != undefined){
            if(!validator.isAlphanumeric(data.image)){
                throw new PodcastServiceBadDataException('Invalid image');
            }
            podcast = await podcastService.updateImagePodcast(new UpdateImagePodcastDTO(data.image, req.params.id));
        }
        if(podcast == null){
            throw new PodcastServiceBadDataException('No data to update');
        }
        let response = {
            type: 'resource',
            locale: 'fr-FR',
            podcast: podcast,
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
