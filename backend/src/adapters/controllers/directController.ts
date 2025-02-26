import PodcastServiceInterface from "../../core/use_cases/podcast/PodcastServiceInterface";
import {fileServiceInterface, podcastServiceInterface} from "../../config/dependencies";
import {Request, Response} from "express";
import PodcastServiceNotFoundException from "../../core/use_cases/podcast/PodcastServiceNotFoundException";
import PodcastServiceBadDataException from "../../core/use_cases/podcast/PodcastServiceBadDataException";
import PodcastServiceInternalServerErrorException
    from "../../core/use_cases/podcast/PodcastServiceInternalServerErrorException";
import CreateDirectDTO from "../dto/direct/CreateDirectDTO";
import {plainToInstance} from "class-transformer";
import CreatePlaylistDTO from "../dto/user/CreatePlaylistDTO";
import {validateOrReject, ValidationError} from "class-validator";
import validator from "validator";
import moment from "moment/moment";
import ChangeNameDirectDTO from "../dto/direct/ChangeNameDirectDTO";
import ChangeDescriptionDirectDTO from "../dto/direct/ChangeDescriptionDirectDTO";
import ChangeImageDirectDTO from "../dto/direct/ChangeImageDirectDTO";
import ChangeDateDirectDTO from "../dto/direct/ChangeDateDirectDTO";
import ChangeDurationDirectDTO from "../dto/direct/ChangeDurationDirectDTO";
import InviteGuessToDirectDTO from "../dto/direct/InviteGuessToDirectDTO";
import CancelGuessToDirectDTO from "../dto/direct/CancelGuessToDirectDTO";
import FileServiceInterface from "../../core/use_cases/file/FileServiceInterface";

const podcastService: PodcastServiceInterface = podcastServiceInterface;
const fileService : FileServiceInterface = fileServiceInterface;

export async function getDirects(req: Request, res: Response) {
    try {
        let directs = await podcastService.getDirects();
        let filteredDirects = directs.map(direct => {
            let guestsFiltered = direct.get('guess').map((guest: string) => {
                return {
                    id: guest,
                    links: [
                        {
                            rel: 'self',
                            href: '/users/' + guest
                        }
                    ]
                }
            });
            return {
                id: direct.get('id'),
                name: direct.get('name'),
                hostId: direct.get('hostId'),
                guests: guestsFiltered,
                links: [
                    {
                        rel: 'self',
                        href: '/directs/' + direct.get('id')
                    },
                    {
                        rel: 'update',
                        href: '/directs/' + direct.get('id')
                    },
                    {
                        rel: 'delete',
                        href: '/directs/' + direct.get('id')
                    },
                    {
                        rel: 'host',
                        href: '/users/' + direct.get('hostId')
                    }
                ]
            }
        });
        const reponse = {
            type: 'resource',
            locale: 'fr-FR',
            directs: filteredDirects,
            links: [
                {
                    rel: 'self',
                    href: '/directs'
                },
                {
                    rel: 'create',
                    href: '/directs'
                }
            ]
        }
        res.status(200).json(reponse);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getDirect(req: Request, res: Response) {
    try {
        let direct = await podcastService.getDirectById(req.params.id);
        let guestsFiltered = direct.get('guess').map((guest: string) => {
            return {
                id: guest,
                links: [
                    {
                        rel: 'self',
                        href: '/users/' + guest
                    }
                ]
            }
        });
        let filteredDirect = {
            id: direct.get('id'),
            name: direct.get('name'),
            description: direct.get('description'),
            image: direct.get('image'),
            hostId: direct.get('hostId'),
            date: direct.get('date'),
            duration: direct.get('duration'),
            guests: guestsFiltered
        }
        const reponse = {
            type: 'resource',
            locale: 'fr-FR',
            direct: filteredDirect,
            links: [
                {
                    rel: 'self',
                    href: '/directs/' + req.params.id
                },
                {
                    rel: 'update',
                    href: '/directs/' + req.params.id
                },
                {
                    rel: 'delete',
                    href: '/directs/' + req.params.id
                },
                {
                    rel: 'directs',
                    href: '/directs'
                },
                {
                    rel: 'create',
                    href: '/directs'
                },
                {
                    rel: 'host',
                    href: '/users/' + direct.get('hostId')
                }
            ]
        }
        res.status(200).json(reponse);
    } catch (error) {
        handleError(res, error);
    }
}

export async function createDirect(req: Request, res: Response) {
    try {
        let fileURIImage: string | null = null;
        if (req.files && !Array.isArray(req.files)) {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            fileURIImage = await fileService.uploadFileImage(files.fileImage);
            if(fileURIImage == null || fileURIImage == ""){
                throw new PodcastServiceBadDataException('Error uploading file image');
            }
        }else{
            throw new PodcastServiceBadDataException('No file uploaded');
        }

        let data = {
            name: req.body.name,
            description: req.body.description,
            image: fileURIImage,
            hostId: req.body.hostId,
            date: req.body.date,
            duration: req.body.duration
        }
        // const formattedDate = moment(data.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
        try{
            const contactInput = plainToInstance(CreateDirectDTO, data);
            await validateOrReject(contactInput);
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.description)){
                throw new PodcastServiceBadDataException('Invalid description');
            }

            if(!validator.isUUID(data.hostId)){
                throw new PodcastServiceBadDataException('Invalid hostId');
            }

            if (!validator.isISO8601(data.date, { strict: true })) {
                throw new PodcastServiceBadDataException('Invalid date');
            }

            if(!validator.isInt(data.duration)){
                throw new PodcastServiceBadDataException('Invalid duration');
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
        let createDirectDTO = new CreateDirectDTO(data.name, data.description, data.image, data.hostId, data.date, data.duration);
        let direct = await podcastService.createDirect(createDirectDTO);
        let guestsFiltered = direct.get('guess').map((guest: string) => {
            return {
                id: guest,
                links: [
                    {
                        rel: 'self',
                        href: '/users/' + guest
                    }
                ]
            }
        });
        let filteredDirect = {
            id: direct.get('id'),
            name: direct.get('name'),
            description: direct.get('description'),
            image: direct.get('image'),
            hostId: direct.get('hostId'),
            date: direct.get('date'),
            duration: direct.get('duration'),
            guests: guestsFiltered
        }
        const reponse = {
            type: 'resource',
            locale: 'fr-FR',
            direct: filteredDirect,
            links: [
                {
                    rel: 'self',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'update',
                    href: '/directs/' + direct.get('id')
                },
                {
                  rel: 'delete',
                  href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'directs',
                    href: '/directs'
                },
                {
                    rel: 'host',
                    href: '/users/' + direct.get('hostId')
                }
            ]
        }
        res.status(201).json(reponse);
    } catch (error) {
        handleError(res, error);
    }
}

export async function getDirectsByUser(req: Request, res: Response) {
    try {
        let directs = await podcastService.getDirectsByUserId(req.params.id);
        let filteredDirects = directs.map(direct => {
            let guestsFiltered = direct.get('guess').map((guest: string) => {
                return {
                    id: guest,
                    links: [
                        {
                            rel: 'self',
                            href: '/users/' + guest
                        }
                    ]
                }
            });
            return {
                id: direct.get('id'),
                name: direct.get('name'),
                hostId: direct.get('hostId'),
                guests: guestsFiltered,
                links: [
                    {
                        rel: 'self',
                        href: '/directs/' + direct.get('id')
                    },
                    {
                        rel: 'update',
                        href: '/directs/' + direct.get('id')
                    },
                    {
                        rel: 'delete',
                        href: '/directs/' + direct.get('id')
                    },
                    {
                        rel: 'host',
                        href: '/users/' + direct.get('hostId')
                    }
                ]
            }
        });
        const reponse = {
            type: 'resource',
            locale: 'fr-FR',
            directs: filteredDirects,
            links: [
                {
                    rel: 'self',
                    href: '/directs'
                },
                {
                    rel: 'create',
                    href: '/directs'
                }
            ]
        }
        res.status(200).json(reponse);
    } catch (error) {
        handleError(res, error);
    }
}

export async function deleteDirect(req: Request, res: Response) {
    try {
        await podcastService.deleteDirect(req.params.id);
        res.status(204).json();
    } catch (error) {
        handleError(res, error);
    }
}

export async function updateDirect(req: Request, res: Response) {
    try{
        let data = req.body;
        let direct = null;
        if(data.name !== undefined){
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.name)){
                throw new PodcastServiceBadDataException('Invalid name');
            }
            direct = await podcastService.updateNameDirect(new ChangeNameDirectDTO(data.name, req.params.id));
        }
        if(data.description !== undefined){
            if(!/^[a-zA-Z0-9 \u00C0-\u017F]+$/.test(data.description)){
                throw new PodcastServiceBadDataException('Invalid description');
            }
            direct = await podcastService.updateDescriptionDirect(new ChangeDescriptionDirectDTO(data.description, req.params.id));
        }
        if(data.image !== undefined){
            const imagePattern = /^(http:\/\/|https:\/\/)?([a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+)+(\/[a-zA-Z0-9-_]+)*\.(png|jpeg|jpg|gif|bmp|webp)|([a-zA-Z0-9-_]+\.(png|jpeg|jpg|gif|bmp|webp))$/;

            if (!imagePattern.test(data.image)) {
                throw new PodcastServiceBadDataException('Invalid image');
            }
            direct = await podcastService.updateImageDirect(new ChangeImageDirectDTO(data.image, req.params.id));
        }
        if(data.date !== undefined){
            const formattedDate = moment(data.date, 'DD/MM/YYYY').format('YYYY-MM-DD');
            if(!validator.isDate(formattedDate)){
                throw new PodcastServiceBadDataException('Invalid date');
            }
            const dateObject = moment(formattedDate, 'YYYY-MM-DD').toDate();
            direct = await podcastService.updateDateDirect(new ChangeDateDirectDTO(req.params.id, dateObject));
        }
        if (data.duration !== undefined) {
            if (typeof data.duration !== 'number') {
                throw new PodcastServiceBadDataException('Invalid duration');
            }
            direct = await podcastService.updateDurationDirect(new ChangeDurationDirectDTO(data.duration, req.params.id));
        }
        if(direct == null){
            throw new PodcastServiceBadDataException('No data to update');
        }

        let guestsFiltered = direct.get('guess').map((guest: string) => {
            return {
                id: guest,
                links: [
                    {
                        rel: 'self',
                        href: '/users/' + guest
                    }
                ]
            }
        });
        let filteredDirect = {
            id: direct.get('id'),
            name: direct.get('name'),
            description: direct.get('description'),
            image: direct.get('image'),
            hostId: direct.get('hostId'),
            date: direct.get('date'),
            duration: direct.get('duration'),
            guests: guestsFiltered
        }

        const reponse = {
            type: 'resource',
            locale: 'fr-FR',
            direct: filteredDirect,
            links: [
                {
                    rel: 'self',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'update',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'delete',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'directs',
                    href: '/directs'
                },
                {
                    rel: 'host',
                    href: '/users/' + direct.get('hostId')
                }
            ]
        }

        res.status(200).json(reponse);
    }catch (error) {
        handleError(res, error);
    }
}

export async function inviteGuest(req: Request, res: Response) {
    try {
        if(req.body.guestId === undefined){
            throw new PodcastServiceBadDataException('guestId is required');
        }
        if(!validator.isUUID(req.body.guestId)){
            throw new PodcastServiceBadDataException('Invalid guestId');
        }
        let direct = await podcastService.inviteUserToDirect(new InviteGuessToDirectDTO(req.params.id, req.body.guestId));
        let guestsFiltered = direct.get('guess').map((guest: string) => {
            return {
                id: guest,
                links: [
                    {
                        rel: 'self',
                        href: '/users/' + guest
                    }
                ]
            }
        });
        let filteredDirect = {
            id: direct.get('id'),
            name: direct.get('name'),
            description: direct.get('description'),
            image: direct.get('image'),
            hostId: direct.get('hostId'),
            date: direct.get('date'),
            duration: direct.get('duration'),
            guests: guestsFiltered
        }
        const reponse = {
            type: 'resource',
            locale: 'fr-FR',
            direct: filteredDirect,
            links: [
                {
                    rel: 'self',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'update',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'delete',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'directs',
                    href: '/directs'
                },
                {
                    rel: 'host',
                    href: '/users/' + direct.get('hostId')
                }
            ]
        }
        res.status(200).json(reponse);
    } catch (error) {
        handleError(res, error);
    }
}

export async function cancelGuest(req: Request, res: Response) {
    try {
        if(req.body.guestId === undefined){
            throw new PodcastServiceBadDataException('guestId is required');
        }
        if(!validator.isUUID(req.body.guestId)){
            throw new PodcastServiceBadDataException('Invalid guestId');
        }
        let direct = await podcastService.cancelInvitationToDirect(new CancelGuessToDirectDTO(req.params.id, req.body.guestId));
        let guestsFiltered = direct.get('guess').map((guest: string) => {
            return {
                id: guest,
                links: [
                    {
                        rel: 'self',
                        href: '/users/' + guest
                    }
                ]
            }
        });
        let filteredDirect = {
            id: direct.get('id'),
            name: direct.get('name'),
            description: direct.get('description'),
            image: direct.get('image'),
            hostId: direct.get('hostId'),
            date: direct.get('date'),
            duration: direct.get('duration'),
            guests: guestsFiltered
        }
        const reponse = {
            type: 'resource',
            locale: 'fr-FR',
            direct: filteredDirect,
            links: [
                {
                    rel: 'self',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'update',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'delete',
                    href: '/directs/' + direct.get('id')
                },
                {
                    rel: 'directs',
                    href: '/directs'
                },
                {
                    rel: 'host',
                    href: '/users/' + direct.get('hostId')
                }
            ]
        }
        res.status(200).json(reponse);
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
