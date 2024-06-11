import { Request, Response, NextFunction } from "express";
import { compare } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { TokenError } from "../errors/TokenError";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { PermissionError } from "../errors/PermissionError";
import { UserModel } from "@src/infra/services/sequelize/users/usersModel";
import { LoginError } from "../errors/LoginError";

// Generates a JWT token for an authenticated user
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

// Extracts the JWT token from the HTTP cookie of the request
function cookieExtractor(req: Request) {
    let token = null;
    if (req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
}

// Checks if the JWT token is present in the request, and if so, verifies if it's valid
export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
        if (token) {
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            res.locals.user = decoded.user; 
        }
        if (!res.locals.user) {
            throw new TokenError("You need to be logged in to perform this action!");
        }
        next();
    } catch (error) {
        next(error);
    }
}

// Responsible for the user login process
export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            throw new PermissionError("Incorrect email and/or password!");
        }

        const match = await compare(req.body.password, user.password);

        if (!match) {
            throw new PermissionError("Incorrect email and/or password!");
        }

        generateJWT(user, res);

        res.status(200).json("Login successful!");
    } catch (error) {
        next(error);
    }
}

// Checks if the user is not already logged in
export function notLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
        if (token) {
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            if (decoded.user) {
                throw new PermissionError("You are already logged in");
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

// Checks if the user has the required permission level to access the route
export function checkPermission(requiredPermission: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const userPermission = res.locals.user?.permissions;
            if (userPermission === undefined || userPermission < requiredPermission) {
                throw new NotAuthorizedError("You are not authorized to perform this action!");
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}
