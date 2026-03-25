
import { Outlet, NavLink } from "react-router";
import { type Author, type AuthorCreationData } from "../types";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { add_author, get_authors, remove_author, get_author } from "../api";

export function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        loadAuthors();
    }, []);

    async function loadAuthors() {
        try {
            const data = await get_authors();
            setAuthors(data);
        } catch (error) {
            console.error("Failed to load authors:", error);
            setAuthors([]);
        }
    }

    async function addAuthor(authorData: AuthorCreationData) {
        try {
            await add_author(authorData);
            loadAuthors();
            setErrorMsg("");
        } catch (error) {
            setErrorMsg(String(error));
        }
    }

    async function removeAuthor(authorId: number) {
        try {
            await remove_author(authorId);
            loadAuthors();
            setErrorMsg("");
        } catch (error) {
            setErrorMsg(String(error));
        }
    }

    const handleAdd: SubmitEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        const inputFirstname = form.elements.namedItem(
            "firstname",
        ) as HTMLInputElement;
        const inputLastname = form.elements.namedItem(
            "lastname",
        ) as HTMLInputElement;

        if (!inputFirstname.value.trim()) return;
        if (!inputLastname.value.trim()) return;

        const newAuthorData: AuthorCreationData = {
            firstname: inputFirstname.value,
            lastname: inputLastname.value,
        };

        addAuthor(newAuthorData);
        inputFirstname.value = "";
        inputLastname.value = "";
    };

    const handleRemove = (id: number) => {
        removeAuthor(id);
    };

    return (
        <>
            <div id="sidebar">
                <form onSubmit={handleAdd}>
                    <label htmlFor="firstname">Firstname</label>
                    <input type="text" id="firstname" name="firstname" />
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" id="lastname" name="lastname" />
                    <button>Add</button>
                </form>
                {errorMsg && <p>{errorMsg}</p>}
                <ul>
                    {authors.map((author) => {
                        return (
                            <li key={author.id}>
                                <NavLink to={author.id.toString()}>
                                    {author.lastname} {author.firstname}{" "}
                                </NavLink>
                                <button
                                    onClick={() => handleRemove(author.id)}
                                    className="small danger"
                                >
                                    Delete
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div id="info">
                <Outlet />
            </div>
        </>
    );
}
