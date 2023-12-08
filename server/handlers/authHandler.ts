import {ExpressHandler, User} from "../types";
import {SignInRequest, SignInResponse, SignUpRequest, SignUpResponse} from "../api";
import { db } from "../datastore";
import crypto from "crypto";
import {signJwt} from "../auth";

export const signUpHandler: ExpressHandler<SignUpRequest, SignUpResponse> = async (req, res)=> {
    const {email, username, password, firstName, lastName} = req.body;
    if (!email || !password || !username || !lastName || !firstName) {
        return res.status(400).send({error: 'all fields required'})
    }

    const existing = (await db.getUserByEmail(email)) || (await db.getUserByUsername(username))
    if (existing) {
        return res.status(403).send({error: 'User already exist'})
    }

    const user: User = {
        id: crypto.randomUUID(),
        email,
        firstName,
        lastName,
        username,
        password: hashPass(password)
    }

    const jwt = signJwt({userId: user.id})

    await db.createUser(user);
    return res.status(200).send({
        jwt,
    });
}

export const signInHandler: ExpressHandler<SignInRequest, SignInResponse> = async (req, res)=> {
    const {login, password} = req.body;
    if (!login || !password) {
        return res.sendStatus(403)
    }

    const existing = (await db.getUserByEmail(login)) || (await db.getUserByUsername(login))
    if (!existing || existing.password !== hashPass(password)) {
        return res.sendStatus(403)
    }

    const jwt = signJwt({userId: existing.id})

    return res.status(200).send({
        user: {
            id: existing.id,
            email: existing.email,
            firstName: existing.firstName,
            lastName: existing.lastName,
            username: existing.username
        },
        jwt,
    });
}

function hashPass(password: string): string {
    return crypto.pbkdf2Sync(password, process.env.HASH_PASS!, 42, 64, 'sha512').toString('hex')
}
