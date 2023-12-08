import {Post, User, Comment } from "./types";

// post APIs
export type createPostRequest = Pick<Post, 'title' | 'url'>

export interface createPostResponse {}

export interface listPostRequest {}

export interface listPostResponse {
    posts: Post[]
}

export interface getPostRequest {}

export interface getPostResponse {
    posts: Post;
}

// User APIs

export type SignUpRequest = Pick<User, 'firstName'|'lastName'|'username'|'email'|'password'>
export interface SignUpResponse {
    jwt: string;
}

export interface SignInRequest {
    login: string; // username / email
    password: string;
}

export type SignInResponse = {
    user: Pick<User, 'firstName'|'lastName'|'username'|'email'|'id'>
    jwt: string;
}

// Commit APIs
export type CreateCommentRequest = Pick<Comment, 'comment'>;
export interface CreateCommentResponse {}
export type CountCommentsRequest = { postId: string };
export type CountCommentsResponse = { count: number };

export interface ListCommentsResponse {
    comments: Comment[];
}
