/**
 * Dados informados para uma requisição no banco de dados são incompatíveis
 * ou inválidos.
 */
export class TokenError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = 'TokenError';
    }
}