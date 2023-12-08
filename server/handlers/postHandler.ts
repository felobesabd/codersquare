import { db } from "../datastore";
import { ExpressHandler, Post } from "../types";
// @ts-ignore
import crypto from "crypto";
import {createPostRequest, createPostResponse, listPostRequest, listPostResponse} from "../api";


export const getAllPostsHandler: ExpressHandler<listPostRequest, listPostResponse> = async (req, res) => {
    console.log(req.headers.authorization)
    res.send({ posts: await db.listPosts() });
}

export const createPostsHandler: ExpressHandler<createPostRequest, createPostResponse> = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({error: 'title field is require'});
    }

    if (!req.body.title || !req.body.url) {
        return res.sendStatus(400);
    }

    const post: Post = {
        id: crypto.randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userId: res.locals.userId
    };

    await db.createPost(post)
    res.sendStatus(200);
}


