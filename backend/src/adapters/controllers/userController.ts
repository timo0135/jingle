import {authentificationProvider, authentificationServiceInterface} from "../../config/dependencies";
import { Request, Response } from "express";
import {plainToInstance} from "class-transformer";
import CreatePodcastDTO from "../dto/podcast/CreatePodcastDTO";
import {validateOrReject, ValidationError} from "class-validator";
import AuthentificationServiceBadDataException
    from "../../core/use_cases/authentification/AuthentificationServiceBadDataException";
import validator from "validator";
import AuthProviderInterface from "../providers/authentification/AuthProviderInterface";
import AuthentificationServiceNotFoundException
    from "../../core/use_cases/authentification/AuthentificationServiceNotFoundException";
import AuthentificationServiceInternalServerErrorException
    from "../../core/use_cases/authentification/AuthentificationServiceInternalServerErrorException";
import CreateUserListenerDTO from "../dto/user/CreateUserListenerDTO";
import SignInDTO from "../dto/user/SignInDTO";
import PodcastServiceNotFoundException from "../../core/use_cases/podcast/PodcastServiceNotFoundException";
import PodcastServiceBadDataException from "../../core/use_cases/podcast/PodcastServiceBadDataException";
import PodcastServiceInternalServerErrorException
    from "../../core/use_cases/podcast/PodcastServiceInternalServerErrorException";
import AuthentificationServiceInterface from "../../core/use_cases/authentification/AuthentificationServiceInterface";
import DisplayUserDTO from "../dto/user/DisplayUserDTO";
import moment from "moment/moment";
import UpdateDatePodcastDTO from "../dto/podcast/UpdateDatePodcastDTO";
import UpdateTitlePodcastDTO from "../dto/podcast/UpdateTitlePodcastDTO";
import UpdateDescriptionPodcastDTO from "../dto/podcast/UpdateDescriptionPodcastDTO";


const instance : AuthProviderInterface = authentificationProvider;
const serviceAuth : AuthentificationServiceInterface = authentificationServiceInterface;

export async function signin(req: Request, res: Response) {
    const token = req.get('Authorization') as string;
    if(token === undefined) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }
    const authHeader = token.split(' ')[1];
    let decodedAuth = Buffer.from(authHeader, 'base64').toString('ascii');
    let [email, password] = decodedAuth.split(':');

    const userData = {
        email: email,
        password: password
    }

    const inputUser = plainToInstance(SignInDTO, userData);
    try {
        try {
            await validateOrReject(inputUser);
        } catch (errors) {
            if (errors instanceof Array && errors[0] instanceof ValidationError) {
                const messages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join(', ');
                throw new AuthentificationServiceBadDataException(messages);
            }
        }
        let user = null;
        if(!validator.isEmail(email)){
            if(!validator.isAlphanumeric(email)){
                throw new AuthentificationServiceBadDataException('Invalid pseudo or Email');
            }
            user = await instance.signin(password, undefined, email);
        }else{
            user = await instance.signin(password, email);
        }
        if (user === null){
            throw new AuthentificationServiceBadDataException('Invalid pseudo or Email');
        }
        const user_response = {
            id: user.get('id'),
            email: user.get('email'),
            token: user.get('token'),
            refreshToken: user.get('refresh')
        }

        const response = {
            type: 'ressource',
            locale: 'fr-FR',
            user: user_response,
            links: [
                {
                    rel: 'self',
                    href: `/users/${user.get('id')}`
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof AuthentificationServiceNotFoundException) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof AuthentificationServiceBadDataException) {
            res.status(400).json({ message: error.message });
        } else if (error instanceof AuthentificationServiceInternalServerErrorException) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
}

export async function register(req: Request, res: Response) {
    console.log(req.body);
    const token = req.get('Authorization') as string;
    if (token === undefined) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const authHeader = token.split(' ')[1];

    const decodedAuth = Buffer.from(authHeader, 'base64').toString('ascii');
    const [email, password] = decodedAuth.split(':');

    const userData = {
        email: email,
        password: password,
        pseudo: req.body.pseudo
    }

    const inputUser = plainToInstance(CreateUserListenerDTO, userData);
    try {
        try {
            await validateOrReject(inputUser);
        } catch (errors) {
            if (errors instanceof Array && errors[0] instanceof ValidationError) {
                const messages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join(', ');
                throw new AuthentificationServiceBadDataException(messages);
            }
        }
        if(!validator.isEmail(email)){
            throw new AuthentificationServiceBadDataException('Invalid email');
        }

        let user = await instance.register(email, req.body.pseudo, password);
        const user_response = {
            id: user.get('id'),
            email: user.get('email')
        }

        const response = {
            type: 'ressource',
            locale: 'fr-FR',
            user: user_response,
            links: [
                {
                    rel: 'self',
                    href: `/users/${user.get('id')}`
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof AuthentificationServiceNotFoundException) {
            res.status(404).json({ message: error.message });
        } else if (error instanceof AuthentificationServiceBadDataException) {
            res.status(400).json({ message: error.message });
        } else if (error instanceof AuthentificationServiceInternalServerErrorException) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "An unexpected error occurred" });
        }
    }
}

export async function refresh(req: Request, res: Response) {
    try {
        const token = req.get('Authorization') as string;
        if(token === undefined) {
            res.status(401).send({ message: "Unauthorized" });
            return;
        }
        const authHeader = token.split(' ')[1];
        let user = await instance.refresh(authHeader);
        const user_response = {
            id: user.get('id'),
            email: user.get('email')
        }

        const response = {
            type: 'ressource',
            locale: 'fr-FR',
            user: user_response,
            links: [
                {
                    rel: 'self',
                    href: `/users/${user.get('id')}`
                }
            ]
        }

        res.status(200).json(response);
    } catch (error) {
        if (error instanceof AuthentificationServiceInternalServerErrorException) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: "An unexpected error occurred" });
        }
    }
}

export async function getUser(req: Request, res: Response) {
    try{
        const user: DisplayUserDTO = await serviceAuth.getUser(req.params.id);
    //     protected id: string | null;
        //     protected email: string;
        //     protected password: string;
        //     protected pseudo: string;
        //     protected role: number;
        //     protected subscribers: string[] = [];
        //     protected subscriptions: string[] = [];
        //     protected playlists: string[] = [];
        //     protected mixers: string[] = [];
        //     protected directs: string[] = [];
        //     protected guess: string[] = [];

        let filteredSubscribers = user.get('subscribers').map((subscriber : string) => {
            return {
                id: subscriber,
                link:{
                    rel: 'self',
                    href: `/users/${subscriber}`
                }
            }
        });

        let filteredSubscriptions = user.get('subscriptions').map((subscription : string) => {
            return {
                id: subscription,
                link:{
                    rel: 'self',
                    href: `/users/${subscription}`
                }
            }
        });

        let filteredPlaylists = user.get('playlists').map((playlist : string) => {
            return {
                id: playlist,
                link:{
                    rel: 'self',
                    href: `/playlists/${playlist}`
                }
            }
        });

        let filteredMixers = user.get('mixers').map((mixer : string) => {
            return {
                id: mixer,
                link:{
                    rel: 'self',
                    href: `/musics/${mixer}`
                }
            }
        });

        let filteredDirects = user.get('directs').map((direct : string) => {
            return {
                id: direct,
                link:{
                    rel: 'self',
                    href: `/directs/${direct}`
                }
            }
        });

        let filteredGuess = user.get('guess').map((guess : string) => {
            return {
                id: guess,
                link:{
                    rel: 'self',
                    href: `/directs/${guess}`
                }
            }
        });

        const user_response = {
            id: user.get('id'),
            email: user.get('email'),
            pseudo: user.get('pseudo'),
            role: user.get('role'),
            subscribers: filteredSubscribers,
            subscriptions: filteredSubscriptions,
            playlists: filteredPlaylists,
            mixers: filteredMixers,
            directs: filteredDirects,
            guests: filteredGuess
        }

        const response = {
            type: 'ressource',
            locale: 'fr-FR',
            user: user_response,
            links: [
                {
                    rel: 'self',
                    href: `/users/${user.get('id')}`
                }
            ]
        }

        res.status(200).json(response);


    }catch (error) {
        handleError(res, error);
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        let data = req.body;
        let user = null;
        if(data.pseudo != undefined){
            user = await serviceAuth.updateUserPseudo(req.params.id, data.pseudo);
        }
        if(data.email != undefined){
            user = await serviceAuth.updateUserEmail(req.params.id, data.email);
        }
        if(user == null){
            throw new PodcastServiceBadDataException('No data to update');
        }
        const user_response = {
            id: user.get('id'),
            email: user.get('email'),
            pseudo: user.get('pseudo')
        }

        const response = {
            type: 'ressource',
            locale: 'fr-FR',
            user: user_response,
            links: [
                {
                    rel: 'self',
                    href: `/users/${user.get('id')}`
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
        console.error(error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}
