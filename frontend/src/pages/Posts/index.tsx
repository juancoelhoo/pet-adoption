import React, { useEffect, useState } from "react";

import { api } from "../../services/api";

import "./styles.css";

// WARNING: This is definitely the way we should structure our code, this
// is only a demonstration on how to connect from the frontend to the backend.
const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();
    }, []);

    async function loadPosts() {
        const {data} = await api.get("/posts/all");
        setPosts(data as any);
    }

    return (
        <div>
            <h1>Posts</h1>

            <br />

            <p>{JSON.stringify(posts)}</p>
        </div>
    );
}

export default Posts;