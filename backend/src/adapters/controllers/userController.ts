import {authentificationProvider} from "../../config/dependencies";
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


const instance : AuthProviderInterface = authentificationProvider;

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
