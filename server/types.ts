import { RequestHandler } from "express-serve-static-core";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export interface Post {
    id: string;
    title: string;
    url: string;
    userId: string;
    postedAt: number;
}

export interface Like {
    id: string;
    userId: string;
    postId: string;
}

export interface Comment {
    id: string;
    comment: string;
    userId: string;
    postId: string;
    postedAt: string;
}

export type withError<T> = T & {error: string};

export type ExpressHandler<Req, Res> = RequestHandler<string, Partial<withError<Res>>, Partial<Req>, any>;

export interface ObjectJwt {
    userId: string;
}