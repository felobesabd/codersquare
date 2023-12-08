import { useQuery } from "react-query";
import {listPostResponse} from "../../../server/api";
import { listPostsFetching } from "../Client";
import {PostCard} from "../components/post-card";

export const ListPosts = ()=> {

    const {data, error, isLoading} = useQuery<listPostResponse>(['listPosts'], listPostsFetching)

    if (isLoading) {
        return <div>is loading....</div>
    }

    if (error) {
        return <div>error posts loading</div>
    }

    return (
        <div>
            Posts:
            {!!data?.posts && data.posts.map((post, i)=> <PostCard key={i} {...post}/>)}
        </div>
    )
}