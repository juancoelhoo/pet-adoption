import { Request, Response, NextFunction } from "express";
import { compare } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { TokenError } from "../errors/TokenError";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { PermissionError } from "../errors/PermissionError";
import { UserModel } from "@src/infra/services/sequelize/users/usersModel";
import { LoginError } from "../errors/LoginError";

// Generates a JWT token for an authenticated user
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

// Extracts the JWT token from the request's HTTP cookie
function cookieExtractor(req: Request) {
    let token = null;
    if (req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
}

// Checks if the JWT token is present in the request, and if so, checks if it is valid
export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
        if (token) {
            const decoded = verify(token, process.env.SECRET_KEY || "") as JwtPayload;
            req.user = decoded.user;
        }
        if (req.user == null) {
            throw new TokenError("You need to be logged in to perform this action!");
        }
        next();
    } catch (error) {
        next(error);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            throw new LoginError("Invalid email or password");
        }

        // Verify password
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new LoginError("Invalid email or password");
        }

        // Generate JWT and set cookie
        generateJWT(user, res);

        return res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        next(error);
    }
}