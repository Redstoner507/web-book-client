import { NavLink } from "react-router";
import { useLocalStorage } from "../favoritesStorage";
import type { Author, Book } from "../types";
import { X } from "lucide-react";

export function Favorites() {
    const authorsStorage = useLocalStorage<Author>("authors", []);
    const booksStorage = useLocalStorage<Book>("books", []);

    return (
        <div id="info">
            <h2>Your favorites</h2>
            <hr />
            <h3 style={{ display: "inline-flex" }}>
                Authors{" "}
                <X
                    color={"red"}
                    fill={"red"}
                    onClick={() => {
                        authorsStorage.clear();
                    }}
                />
            </h3>
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
            <h3 style={{ display: "inline-flex" }}>
                Books{" "}
                <X
                    color={"red"}
                    fill={"red"}
                    onClick={() => {
                        booksStorage.clear();
                    }}
                />
            </h3>
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
