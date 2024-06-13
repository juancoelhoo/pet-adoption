/**
 * O usuário já está logado no sistema
 */
export class LoginError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'LoginError';
    }
}