import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { type Book } from "../types";
import { get_book, update_book } from "../api";
import { BooksTags } from "./booksTags";
import { EditableText } from "../utils/editableText";

export function Book() {
    let { book_id } = useParams();
    const [book, setBook] = useState<Book>();
    const [loading, setLoading] = useState(true);
    const [bookEdited, setBookEdited] = useState(false);

    useEffect(() => {
        loadBook();
    }, [book_id, bookEdited]);

    async function loadBook() {
        setLoading(true);
        try {
            const data = await get_book(Number(book_id));
            setBook(data);
        } catch (error) {
            console.error("Failed to load book:", error);
        }
        setBookEdited(false);
        setLoading(false);
    }

    async function onUpdateTitle(value: string) {
        await update_book(Number(book_id), { title: value });
        setBookEdited(true);
    }

    async function onUpdatePublicationYear(value: string) {
        await update_book(Number(book_id), { publication_year: Number(value) });
        setBookEdited(true);
    }

    return (
        <div style={{ opacity: loading ? "0.5" : "1" }}>
            <h2>
                <EditableText
                    value={String(book?.title)}
                    onUpdate={onUpdateTitle}
                />
            </h2>
            <hr />
            <div>
                Publication year:{" "}
                <EditableText
                    value={String(book?.publication_year)}
                    onUpdate={onUpdatePublicationYear}
                />
            </div>
            <p>
                Author:{" "}
                <Link to={`/authors/${book?.authorId}`}>Nom de l'auteur</Link>
            </p>
            <BooksTags />
        </div>
    );
}
