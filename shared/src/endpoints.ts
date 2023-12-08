export type EndpointConfig = {
    url: string;
    method: 'get' |  'post' | 'patch' | 'delete';
    auth?: boolean;
    sensitive?: boolean;
}

export enum Endpoints {
    healthz = 'healthz',

    // Auth
    signup = 'signup',
    signin = 'signin',

    // User
    getUser = 'getUser',
    getCurrentUser = 'getCurrentUser',
    updateCurrentUser = 'updateCurrentUser',

    // Post
    listPosts = 'listPosts',
    getPost = 'getPost',
    createPost = 'createPost',
    deletePost = 'deletePost',

    // Like
    listLikes = 'listLikes',
    createLike = 'createLike',
    deleteLike = 'deleteLike',

    // Comment
    countComments = 'countComments',
    listComments = 'listComments',
    createComment = 'createComment',
    deleteComment = 'deleteComment',
}

export const ENDPOINTS: { [key in Endpoints]: EndpointConfig } = {
    [Endpoints.healthz]: { method: 'get', url: '/api/v1/healthz' },

    [Endpoints.signin]: { method: 'post', url: '/api/v1/signin', sensitive: true },
    [Endpoints.signup]: { method: 'post', url: '/api/v1/signup', sensitive: true },

    [Endpoints.getUser]: { method: 'get', url: '/api/v1/users/:id' },
    [Endpoints.getCurrentUser]: { method: 'get', url: '/api/v1/users', auth: true },
    [Endpoints.updateCurrentUser]: { method: 'patch', url: '/api/v1/users', auth: true },

    [Endpoints.listPosts]: { method: 'get', url: '/api/v1/posts' },
    [Endpoints.getPost]: { method: 'get', url: '/api/v1/posts/:id' },
    [Endpoints.createPost]: { method: 'post', url: '/api/v1/posts', auth: true },
    [Endpoints.deletePost]: { method: 'delete', url: '/api/v1/posts/:id', auth: true },

    [Endpoints.listLikes]: { method: 'get', url: '/api/v1/likes/:postId' },
    [Endpoints.createLike]: { method: 'post', url: '/api/v1/likes/:postId', auth: true },
    [Endpoints.deleteLike]: { method: 'delete', url: '/api/v1/likes/:postId', auth: true },

    [Endpoints.countComments]: { method: 'get', url: '/api/v1/comments/:postId/count' },
    [Endpoints.listComments]: { method: 'get', url: '/api/v1/comments/:postId' },
    [Endpoints.createComment]: { method: 'post', url: '/api/v1/comments/:postId', auth: true },
    [Endpoints.deleteComment]: { method: 'delete', url: '/api/v1/comments/:id', auth: true },
}


























