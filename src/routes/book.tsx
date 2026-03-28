import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { type Book } from "../types";
import { get_book } from "../api";

export function Book() {
    let { book_id } = useParams();
    const [book, setBook] = useState<Book>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBook();
    }, [book_id]);

    async function loadBook() {
        setLoading(true);
        try {
            const data = await get_book(Number(book_id));
            setBook(data);
        } catch (error) {
            console.error("Failed to load book:", error);
        }
        setLoading(false);
    }

    return (
        <div style={{ opacity: loading ? "0.5" : "1" }}>
            <h2>{book?.title}</h2>
            <hr />
            <p>Publication year: {book?.publication_year}</p>
            <p>Author:</p>
        </div>
    );
}
