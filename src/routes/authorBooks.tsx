import { useEffect, useState, type SubmitEventHandler } from "react";
import { Link, useParams } from "react-router";
import { type Book, type BookCreationData } from "../types";
import {
    get_books_of_author,
    add_book as add_one_book,
    remove_book as remove_one_book,
} from "../api";

export function AuthorBooks() {
    let { author_id } = useParams();
    const [books, setBooks] = useState<Book[]>([]);
    const [isBookAddOrRemove, setIsBookAddOrRemove] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        loadBooks();
    }, [author_id, isBookAddOrRemove]);

    async function loadBooks() {
        setLoading(true);
        try {
            const res: Book[] = await get_books_of_author(Number(author_id));
            setBooks(res);
            setIsBookAddOrRemove(false);
        } catch (error) {
            console.log("failed to load books of author");
            setBooks([]);
            setIsBookAddOrRemove(false);
        }
        setLoading(false);
    }

    async function addBook(bodyNewBook: BookCreationData) {
        setAdding(true);
        await add_one_book(Number(author_id), bodyNewBook);
        setIsBookAddOrRemove(true);
        setAdding(false);
    }

    const handleAddBook: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const title = form.elements.namedItem("title") as HTMLInputElement;
        const year = form.elements.namedItem(
            "publication_year",
        ) as HTMLInputElement;

        if (!title.value.trim()) return;
        if (!year.value.trim()) return;

        const bodyNewBook: BookCreationData = {
            title: title.value,
            publication_year: Number(year.value),
        };

        try {
            addBook(bodyNewBook);
            form.reset();
        } catch (error) {}
    };

    const handleRemoveBook = (id: number) => {
        setIsBookAddOrRemove(true);
        remove_one_book(id);
    };

    return (
        <div>
            <h3>Books</h3>
            <form onSubmit={handleAddBook}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" />

                <label htmlFor="publication_year">publication year</label>
                <input
                    type="text"
                    name="publication_year"
                    id="publication_year"
                />

                <button disabled={adding}>
                    {adding ? "Adding..." : "Add"}
                </button>
            </form>
            <ul style={{ opacity: loading ? "0.5" : "1" }}>
                {books.map((book) => {
                    return (
                        <li key={book.id}>
                            <Link to={`/books/${book.id}`}>{book.title}</Link>
                            <button
                                onClick={() => handleRemoveBook(book.id)}
                                className="small danger"
                            >
                                Delete
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
