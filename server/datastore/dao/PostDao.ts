import {Post} from "../../types";

export interface PostDao {
    createPost(post: Post): Promise<void>;
    listPosts(): Promise<Post[]>;
    getPost(id: string): Promise<Post | undefined>;
    deletePost(id: string): Promise<void>;
}