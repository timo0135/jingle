import AuthProviderInterface from "../providers/authentification/AuthProviderInterface";
import {authentificationProvider} from "../../config/dependencies";
import {NextFunction, Request, Response} from "express";
import AuthProviderTokenExpiredException from "../providers/authentification/AuthProviderBeforeValidException";
import AuthProviderSignatureInvalidException from "../providers/authentification/AuthProviderSignatureInvalidException";
import AuthProviderBeforeValidException from "../providers/authentification/AuthProviderBeforeValidException";
import AuthProviderUnexpectedValueException from "../providers/authentification/AuthProviderUnexpectedValueException";

const instanceAuth : AuthProviderInterface = authentificationProvider;

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
