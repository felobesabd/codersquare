// @ts-ignore
import sqlite3 from 'sqlite3'
import { Database, open } from 'sqlite'
// @ts-ignore
import path from "path";

import {Datastore} from "../index";
import {Like, Post, User, Comment} from "../../types";



export class sqlDataStore implements Datastore {

    private db!: Database<sqlite3.Database, sqlite3.Statement>

    public async openDb() {
        // open the database
        this.db = await open({
            filename: path.join(__dirname, 'codersquare.sqlite'),
            driver: sqlite3.Database
        })

        await this.db.migrate({
            migrationsPath: path.join(__dirname, 'migration'),
        })

        return this;
    }

    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];

    // User
    async createUser(user: User): Promise<void> {
        await this.db.run(
            'INSERT INTO users (id, firstName, lastName, username, email, password) VALUES (?,?,?,?,?,?)',
            user.id,
            user.firstName,
            user.lastName,
            user.username,
            user.email,
            user.password
        );
    };

    getUserById(id: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE id = ?' , id)
    }

    getUserByEmail(email: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE email = ?' , email);
    };

    getUserByUsername(username: string): Promise<User | undefined> {
        return this.db.get<User>('SELECT * FROM users WHERE username = ?' , username);
    };

    // Post
    async createPost(post: Post): Promise<void> {
        await this.db.run(
            'INSERT INTO posts (id, title, url, userId, postedAt) VALUES (?,?,?,?,?)',
            post.id,
            post.title,
            post.url,
            post.userId,
            post.postedAt
        );
    };

    listPosts(): Promise<Post[]> {
        return this.db.all<Post[]>('SELECT * FROM posts');
    }

    getPost(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find(u => u.id === id));
    }

    deletePost(id: string): Promise<void> {
        const checkPost = this.posts.findIndex(p => p.id === id)
        if (checkPost === -1) {
            return Promise.resolve();
        }

        this.posts.splice(checkPost, 1);
        return Promise.resolve();
    };

    // Like
    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    };

    // Comment
    async createComment(comment: Comment): Promise<void> {
        await this.db.run(
            'INSERT INTO comments (id, userId, postId, comment, postedAt) VALUES (?,?,?,?,?)',
            comment.id,
            comment.userId,
            comment.postId,
            comment.comment,
            comment.postedAt
        );
    };

    async getComment(postId: string): Promise<number> {
        const result = await this.db.get<{ count: number }>
        ('SELECT COUNT(*) as count FROM comments WHERE postId = ?' , postId);

        return result?.count ?? 0;
    }

    deleteComment(id: string): Promise<void> {
        const checkComment = this.comments.findIndex(c => c.id === id)
        if (checkComment === -1) {
            return Promise.resolve();
        }

        this.posts.splice(checkComment, 1);
        return Promise.resolve();
    };
}