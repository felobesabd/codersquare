import {Comment} from "../../types";


export interface CommentDao {
    createComment(comment: Comment): Promise<void>;
    getComment(postId: string): Promise<number>;
    deleteComment(id: string): Promise<void>;
}