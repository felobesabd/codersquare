import {ObjectJwt} from "./types";
import jwt from "jsonwebtoken"

export function signJwt(obj: ObjectJwt): string {
    return jwt.sign(obj, getJwtSecret(), {
        expiresIn: '15d'
    })
}

// TODO ask Mets
export function verifyJwt(token: any): ObjectJwt {
    return jwt.verify(token, getJwtSecret()) as ObjectJwt;
}

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET_KEY;

    if (!secret) {
        console.log(`Missing JWT secret`)
        process.exit(1)
    }

    return secret;
}

