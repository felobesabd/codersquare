// @ts-ignore
import express, {ErrorRequestHandler, RequestHandler} from 'express';
import { createPostsHandler, getAllPostsHandler } from "./handlers/postHandler";
import { initDb } from "./datastore";
// @ts-ignore
import asyncHandler from "express-async-handler";
import {signInHandler, signUpHandler} from "./handlers/authHandler";
// @ts-ignore
import dotenv from "dotenv"
import {authMiddleware} from "./middleware/authMiddleware";
// @ts-ignore
import cors from "cors";


(async ()=> {

    await initDb()

    dotenv.config()

    const app = express();

    app.use(express.json())

    app.use(cors());

    const reqLoggerMiddleware: RequestHandler = (req, res, next)=> {
        console.log(req.method, req.path, `-body`, req.body)
        next()
    }

    app.use(reqLoggerMiddleware)

    // public route
    app.get('/healthz', (req, res) => res.send({status: "ok"}))
    app.post('/api/v1/signup', asyncHandler(signUpHandler))
    app.post('/api/v1/signin', asyncHandler(signInHandler))

    //app.use(authMiddleware);

    // Protected route
    app.get('/api/v1/posts', asyncHandler(getAllPostsHandler))
    app.post('/api/v1/posts', asyncHandler(createPostsHandler))

    const errHandler: ErrorRequestHandler = (err, req, res, next) => {
        console.log(`Uncaught exception`, err);
        return res.status(500).send(`Uncaught exception. please try again`)
    };

    app.use(errHandler);

    const PORT = process.env.PORT || 3000;
    const server =  app.listen(PORT , ()=> {
        console.log(`App running ${PORT}`)
    })
})();


