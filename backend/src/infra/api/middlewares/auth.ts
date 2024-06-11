import { Request, Response, NextFunction } from "express";
import { compare } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { TokenError } from "../errors/TokenError";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { PermissionError } from "../errors/PermissionError";
import { UserModel } from "@src/infra/services/sequelize/users/usersModel";
import { LoginError } from "../errors/LoginError";

// Gera um token JWT para um usuário autenticado
function generateJWT(user: UserModel, res: Response) {
    const body = {
        id: user.id,
        email: user.email,
        name: user.name,
        permissions: user.permissions
    };

    const token = sign({ user: body }, process.env.SECRET_KEY || "", { expiresIn: process.env.JWT_EXPIRATION });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    });
}

// Extrai o token JWT do cookie HTTP da solicitação
function cookieExtractor(req: Request) {
    let token = null;
    if (req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
}

// Verifica se o token JWT está presente na solicitação e, se estiver, verifica se é válido
export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
        if (token) {
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            res.locals.user = decoded.user; // Adiciona o usuário decodificado a res.locals
        }
        if (!res.locals.user) {
            throw new TokenError("Você precisa estar logado para realizar essa ação!");
        }
        next();
    } catch (error) {
        next(error);
    }
}

// Responsável pelo processo de login do usuário
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            throw new PermissionError("Email e/ou senha incorretos!");
        }

        const match = await compare(req.body.password, user.password);

        if (!match) {
            throw new PermissionError("Email e/ou senha incorretos!");
        }

        generateJWT(user, res);

        res.status(200).json("Login realizado com sucesso!");
    } catch (error) {
        next(error);
    }
}