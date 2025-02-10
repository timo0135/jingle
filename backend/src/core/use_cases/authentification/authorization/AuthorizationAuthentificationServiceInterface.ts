interface AuthorizationAuthentificationServiceInterface {
    isGranted(userId: string, operation: number, resourceId: string): Promise<boolean>;
}

export default AuthorizationAuthentificationServiceInterface;
