import {listPostRequest, listPostResponse} from "../../server/api";


export const listPostsFetching = async (req: listPostRequest): Promise<listPostResponse> => {
    const response = await fetch('http://localhost:3000/api/v1/posts');

    if (!response.ok) {
        const {error} = await response.json();
        throw error;
    }

    return response.json();
}