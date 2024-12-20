import AuthProviderInterface from "./AuthProviderInterface";
import JWTManager from "./JWTManager";
import User from "../../../core/domain/entities/user/User";
import jwt from 'jsonwebtoken';
import AuthProviderTokenExpiredException from "./AuthProviderTokenExpiredException";
import AuthProviderSignatureInvalidException from "./AuthProviderSignatureInvalidException";
import AuthProviderBeforeValidException from "./AuthProviderBeforeValidException";
import AuthProviderUnexpectedValueException from "./AuthProviderUnexpectedValueException";
import DisplayUserDTO from "../../dto/user/DisplayUserDTO";
import AuthentificationServiceInterface
    from "../../../core/use_cases/authentification/AuthentificationServiceInterface";

interface JWTPayload {
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    data: {
        email: string;
    };
}

class JWTAuthProvider implements AuthProviderInterface {
    protected instanceJWT: JWTManager;
    protected instanceAuthService: AuthentificationServiceInterface;


    constructor(jwtManager: JWTManager, authServiceInterface: AuthentificationServiceInterface) {
        this.instanceJWT = jwtManager;
        this.instanceAuthService = authServiceInterface;
    }
    public register(email: string, pseudo: string, password: string): Promise<DisplayUserDTO> {
        return this.instanceAuthService.register(email, pseudo, password);
    }

    public async signin(password: string, email?: string, pseudo?: string): Promise<DisplayUserDTO> {
        let user = null;
        if (email !== undefined){
            user = await this.instanceAuthService.credentials(password, email);
        }else if (pseudo !== undefined){
            user = await this.instanceAuthService.credentials(password, undefined,pseudo);
        }else{
            throw new AuthProviderUnexpectedValueException('Missing email or pseudo');
        }
        let payload = {
            sub: user.get('id'),
            aud: 'annuaire',
            exp: Math.floor(Date.now() / 1000) + 3600,
            iat: Math.floor(Date.now() / 1000),
            data: {
                email: user.get('email'),
                pseudo: user.get('pseudo')
            }
        }
        let jwt = this.instanceJWT.createAccessToken(payload);
        payload.exp = Math.floor(Date.now() / 1000) + 3600 * 3;
        let refresh = this.instanceJWT.createRefreshToken(payload);
        user = await this.instanceAuthService.getUser(user.get('id'));
        let u = new User(user.get('email'),'',user.get('pseudo') ,user.get('role'),);
        u.setId(user.get('id'));
        return new DisplayUserDTO(u, jwt, refresh);
    }

    public async refresh(token: string): Promise<DisplayUserDTO> {
        try{
            let decoded = this.instanceJWT.decodeToken(token) as JWTPayload;
            let payload = {
                sub: decoded.sub,
                aud: decoded.aud,
                exp: Math.floor(Date.now() / 1000) + 3600,
                iat: Math.floor(Date.now() / 1000),
                data: {
                    email: decoded.data.email,
                }
            }
            let jwt = this.instanceJWT.createAccessToken(payload);
            let user = await this.instanceAuthService.getUser(decoded.sub)
            let u = new User(user.get('email'),'',user.get('pseudo') ,user.get('role'),);
            u.setId(user.get('id'));
            return new DisplayUserDTO(u, jwt, token);
        }catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new AuthProviderTokenExpiredException('Token expired');
            } else if (error instanceof jwt.JsonWebTokenError) {
                if (error.message === 'invalid signature') {
                    throw new AuthProviderSignatureInvalidException('Token signature invalid');
                } else if (error.message === 'jwt not active') {
                    throw new AuthProviderBeforeValidException('Token not yet valid');
                } else {
                    throw new AuthProviderUnexpectedValueException('Token not valid');
                }
            } else {
                throw new AuthProviderUnexpectedValueException('Token not valid');
            }
        }

    }

    public async getSignedInUser(token: string): Promise<DisplayUserDTO> {
        try{
            let decoded = this.instanceJWT.decodeToken(token) as JWTPayload;
            return this.instanceAuthService.getUser(decoded.sub);
        }catch (error){
            if (error instanceof jwt.TokenExpiredError) {
                throw new AuthProviderTokenExpiredException('Token expired');
            } else if (error instanceof jwt.JsonWebTokenError) {
                if (error.message === 'invalid signature') {
                    throw new AuthProviderSignatureInvalidException('Token signature invalid');
                } else if (error.message === 'jwt not active') {
                    throw new AuthProviderBeforeValidException('Token not yet valid');
                } else {
                    throw new AuthProviderUnexpectedValueException('Token not valid');
                }
            } else {
                throw new AuthProviderUnexpectedValueException('Token not valid');
            }
        }

    }
}

export default JWTAuthProvider;
