import {UserDao} from "./dao/UserDao";
import {PostDao} from "./dao/PostDao";
import {LikeDao} from "./dao/LikeDao";
import {CommentDao} from "./dao/CommentDao";
import { InMemoryDatabase } from "./memorydb";
import {sqlDataStore} from "./sql";

export interface Datastore extends UserDao, PostDao, LikeDao, CommentDao {}

export let db: Datastore;

export const initDb = async () => {
    // db = new InMemoryDatabase();
    db = await new sqlDataStore().openDb();
}
