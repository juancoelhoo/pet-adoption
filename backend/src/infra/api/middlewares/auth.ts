import { Request, Response, NextFunction } from "express";
import compare from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { TokenError } from "../errors/TokenError";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { PermissionError } from "../errors/PermissionError";
import { UserModel } from "@src/infra/services/sequelize/users/usersModel";

// Gera um token JWT para um usuário autenticado 
function generateJWT(user: any, res: Response) {
    const body = {
        id: user.id,
        email: user.email,
        permissions: user.permissions,
        name: user.name
    };

    const token = sign({ user: body }, process.env.SECRET_KEY || "", { expiresIn: process.env.JWT_EXPIRATION });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development"
    });
}