import AuthProviderInterface from "../providers/authentification/AuthProviderInterface";
import {authentificationProvider, authorizationPodcastServiceInterface, authorizationAuthentificationServiceInterface} from "../../config/dependencies";
import {NextFunction, Request, Response} from "express";
import AuthProviderTokenExpiredException from "../providers/authentification/AuthProviderBeforeValidException";
import AuthProviderSignatureInvalidException from "../providers/authentification/AuthProviderSignatureInvalidException";
import AuthProviderBeforeValidException from "../providers/authentification/AuthProviderBeforeValidException";
import AuthProviderUnexpectedValueException from "../providers/authentification/AuthProviderUnexpectedValueException";
import * as constants from "../../config/constantes";
import AuthorizationPodcastServiceInterface
    from "../../core/use_cases/podcast/authorization/AuthorizationPodcastServiceInterface";
import AuthorizationAuthentificationServiceInterface
    from "../../core/use_cases/authentification/authorization/AuthorizationAuthentificationServiceInterface";

const instanceAuth : AuthProviderInterface = authentificationProvider;
const instanceAuthzPodcast : AuthorizationPodcastServiceInterface = authorizationPodcastServiceInterface;
const instanceAuthzAuthentification: AuthorizationAuthentificationServiceInterface = authorizationAuthentificationServiceInterface;

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.get('Authorization')?.split(' ')[1];
        if (!token) {
            throw new AuthProviderUnexpectedValueException('Missing Authorization Header');
        }
        req.auth = await instanceAuth.getSignedInUser(token);
        next();
    } catch (error) {
        if (error instanceof AuthProviderUnexpectedValueException ||
            error instanceof AuthProviderBeforeValidException ||
            error instanceof AuthProviderSignatureInvalidException ||
            error instanceof AuthProviderTokenExpiredException) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

export async function authorizePodcast(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.auth;
        const podcastId = req.params.id;
        if(!await instanceAuthzPodcast.isGranted(user.get('id'), constants.IS_MY_PODCAST, podcastId)) {
            res.status(403).json({ message: 'You are not allowed to access this podcast' });
        }
        next();
    } catch (error) {
        if (error instanceof AuthProviderUnexpectedValueException) {
            res.status(403).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

export async function authorizeDirect(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.auth;
        const directId = req.params.id;
        if(!await instanceAuthzPodcast.isGranted(user.get('id'), constants.IS_MY_DIRECT, directId)) {
            res.status(403).json({ message: 'You are not allowed to access this direct' });
        }
        next();
    } catch (error) {
        if (error instanceof AuthProviderUnexpectedValueException) {
            res.status(403).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}

export async function authorizeAvis(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.auth;
        const avisId = req.params.id;
        if (!await instanceAuthzPodcast.isGranted(user.get('id'), constants.IS_MY_AVIS, avisId)) {
            res.status(403).json({message: 'You are not allowed to access this avis'});
        }
        next();
    } catch (error) {
        if (error instanceof AuthProviderUnexpectedValueException) {
            res.status(403).json({message: error.message});
        } else {
            res.status(500).json({message: 'An unexpected error occurred'});
        }
    }
}

export async function authorizePlaylist(req: Request, res: Response, next: NextFunction) {
    try {
        const user = req.auth;
        const playlistId = req.params.id;
        if (!await instanceAuthzPodcast.isGranted(user.get('id'), constants.IS_MY_PLAYLIST, playlistId)) {
            res.status(403).json({message: 'You are not allowed to access this playlist'});
        }
        next();
    } catch (error) {
        if (error instanceof AuthProviderUnexpectedValueException) {
            res.status(403).json({message: error.message});
        } else {
            res.status(500).json({message: 'An unexpected error occurred'});
        }
    }
}
