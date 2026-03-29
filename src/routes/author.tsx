import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { type Author } from "../types";
import { get_author, update_author } from "../api";
import { AuthorBooks } from "./authorBooks";
import { EditableText } from "../utils/editableText";
import { useLocalStorage } from "../favoritesStorage";
import { Favorite } from "../utils/favorite";

export function Author() {
    let { author_id } = useParams();
    const [author, setAuthor] = useState<Author>();
    const [loading, setLoading] = useState(true);
    const [authorEdited, setAuthorEdited] = useState(false);
    const authorsStorage = useLocalStorage<Author>("authors", []);

    useEffect(() => {
        loadAuthor();
    }, [author_id, authorEdited]);

    async function loadAuthor() {
        setLoading(true);
        try {
            const data = await get_author(Number(author_id));
            setAuthor(data);
        } catch (error) {
            console.error("Failed to load authors:", error);
        }
        setAuthorEdited(false);
        setLoading(false);
    }

    async function onUpdateFirstname(value: string) {
        await update_author(Number(author_id), {
            firstname: value,
        });
        setAuthorEdited(true);
    }

    async function onUpdateLastname(value: string) {
        await update_author(Number(author_id), {
            lastname: value,
        });
        setAuthorEdited(true);
    }

    return (
        <div style={{ opacity: loading ? "0.5" : "1" }}>
            <h2>
                <EditableText
                    value={author?.firstname}
                    onUpdate={onUpdateFirstname}
                />{" "}
                <EditableText
                    value={author?.lastname}
                    onUpdate={onUpdateLastname}
                />{" "}
                <Favorite
                    item={author}
                    toggle={authorsStorage.toggle}
                    isFavorite={authorsStorage.isFavorite}
                />
            </h2>
            <hr />
            <AuthorBooks />
        </div>
    );
}
