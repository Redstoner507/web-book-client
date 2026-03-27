import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { type Book } from "../types";
import { get_book } from "../api";

export function Book() {
    let params = useParams();
    const [book, setBook] = useState<Book>();
    //const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBook();
    }, [params]);

    async function loadBook() {
        try {
            const id_book = params.book_id;
            if (!id_book) {
                return <p>Livre non trouvé ou ID invalide.</p>;
            }
            const data = await get_book(id_book.toString());
            setBook(data);
        } catch (error) {
            console.error("Failed to load book:", error);
        }
    }

    return (
        <div>
            <h2>
                {book?.title}
                <hr />
            </h2>
        </div>
    );
}
