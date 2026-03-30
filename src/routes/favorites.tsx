import { NavLink } from "react-router";
import { useLocalStorage } from "../favoritesStorage";
import type { Author, Book } from "../types";

export function Favorites() {
    const authorsStorage = useLocalStorage<Author>("authors", []);
    const booksStorage = useLocalStorage<Book>("books", []);

    return (
        <div id="info">
            <h2>Your favorites</h2>
            <hr />
            <h3>Authors</h3>
            <ul>
                {authorsStorage.list.map((author) => {
                    return (
                        <li key={author.id}>
                            <NavLink to={"/authors/" + author.id.toString()}>
                                {author.firstname} {author.lastname}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
            <h3>Books</h3>
            <ul>
                {booksStorage.list.map((book) => {
                    return (
                        <li key={book.id}>
                            <NavLink to={"/books/" + book.id.toString()}>
                                {book.title}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
