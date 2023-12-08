import {Datastore} from "../index";
import {Like, Post, User, Comment} from "../../types";


export class InMemoryDatabase implements Datastore {

    private users: User[] = [];
    private posts: Post[] = [];
    private likes: Like[] = [];
    private comments: Comment[] = [];

    // User
    createUser(user: User): Promise<void> {
        this.users.push(user)
        return Promise.resolve();
    };

    getUserById(id: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u=> u.id === id));
    }

    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.email === email));
    };

    getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find(u => u.username === username));
    };

    // Post
    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    };

    listPosts(): Promise<Post[]> {
        return Promise.resolve(this.posts);
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
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    };

    getComment(postId: string): Promise<Comment | undefined> {
        return Promise.resolve(this.comments.find(c => c.postId === postId));
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





