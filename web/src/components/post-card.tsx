import {Post} from "../../../server/types";
import { Flex, Box, Button, Image, Text } from "@chakra-ui/react"
import React from "react";
import {Link} from "react-router-dom";

export const PostCard: React.FC<Post> = (post)=> {
    return (
        <Box>
            <Flex gap={2} mb={4}>

                <Text fontSize="md" fontWeight="bold" color="gray.600">
                    {post.title}
                </Text>

                <Text fontWeight="bold" color="gray.300">
                    ({shortUrl(post.url)})
                </Text>

                <Link to={`/post/${post.id}`}>
                    <Button variant="outline" size="sm"  height="25px" color="gray.400">
                        Comments
                    </Button>
                </Link>

            </Flex>
        </Box>
    )
}

const shortUrl = (url: string): string => {
    const withProtocol = url.startsWith('http') ? url : 'http://' + url;
    return new URL(withProtocol).host;
}