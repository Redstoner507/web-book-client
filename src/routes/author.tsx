import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { type Author } from "../types";
import { get_author } from "../api";
import { AuthorBooks } from "./authorBooks";

export function Author() {
    let { author_id } = useParams();
    const [author, setAuthor] = useState<Author>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAuthor();
    }, [author_id]);

    async function loadAuthor() {
        setLoading(true);
        try {
            const data = await get_author(Number(author_id));
            setAuthor(data);
        } catch (error) {
            console.error("Failed to load authors:", error);
        }
        setLoading(false);
    }

    return (
        <div style={{ opacity: loading ? "0.5" : "1" }}>
            <h2>
                {author?.firstname} {author?.lastname}
            </h2>
            <hr />
            <AuthorBooks />
        </div>
    );
}
