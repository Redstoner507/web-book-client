
import { Outlet, NavLink, useNavigate } from "react-router";
import { type Author, type AuthorCreationData } from "../types";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { add_author, get_authors, remove_author, get_author } from "../api";

export function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [valueFilter, setValueFilter] = useState<String>();
    const navigate = useNavigate();

    useEffect(() => {
        loadAuthors();
    }, [valueFilter]);

    

    async function loadAuthors() {
        try {
            const data = await get_authors(valueFilter);
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

    const handleFilter: SubmitEventHandler<HTMLFormElement>=(event)=>{
        
        // empèche le comportement par défaut du navigateur
        event.preventDefault();
        // récupération des données du formulaire
        const form = event.currentTarget;
        const searchFilter = form.elements.namedItem("lastname") as HTMLInputElement;
        // mise à jour du state
        setValueFilter(searchFilter.value);
        // re-demander à l'utilisateur de séléctionner un auteur
        navigate('/author');
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

                <hr />

                <form onSubmit={handleFilter}>
                    <label htmlFor="lastname">Lastname</label>
                    <input type="text" id="lastname" name="lastname" />
                    
                    <button>Filtrer</button>
                </form>

                <hr />

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
