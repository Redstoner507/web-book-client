import { Outlet, NavLink, useNavigate } from "react-router";
import {
    type Author,
    type AuthorCreationData,
    type GetAuthorsParams,
} from "../types";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { add_author, get_authors, remove_author } from "../api";
import { Pagination } from "../utils/pagination";
import { Loading } from "../utils/loading";

export function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [valueFilter, setValueFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(0);
    const pageSize = 10;

    const navigate = useNavigate();

    useEffect(() => {
        loadAuthors({ page: currentPage, pageSize });
    }, [valueFilter, currentPage]);

    async function loadAuthors(params?: GetAuthorsParams) {
        setLoading(true);
        try {
            const data = await get_authors(valueFilter, params);
            setAuthors(data.authors);
            setTotalElement(data.totalCount);
        } catch (error) {
            console.error("Failed to load authors:", error);
            setAuthors([]);
            setTotalElement(0);
        }
        setLoading(false);
    }

    async function addAuthor(authorData: AuthorCreationData) {
        try {
            await add_author(authorData);
            loadAuthors({ page: currentPage, pageSize });
            setErrorMsg("");
        } catch (error) {
            setErrorMsg(String(error));
        }
    }

    async function removeAuthor(authorId: number) {
        try {
            await remove_author(authorId);
            loadAuthors({ page: currentPage, pageSize });
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

    const handleFilter: SubmitEventHandler<HTMLFormElement> = (event) => {
        // empèche le comportement par défaut du navigateur
        event.preventDefault();
        // récupération des données du formulaire
        const form = event.currentTarget;
        const searchFilter = form.elements.namedItem(
            "lastname",
        ) as HTMLInputElement;
        setValueFilter(searchFilter.value);
        setCurrentPage(1);
        navigate("/author");
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
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
                <h3>Filters</h3>
                <form onSubmit={handleFilter}>
                    <label htmlFor="lastnameFilter">Lastname</label>
                    <input
                        type="text"
                        id="lastnameFilter"
                        name="lastnameFilter"
                    />

                    <button>Filtrer</button>
                </form>
                <hr />
                {!loading ? (
                    <>
                        <Pagination
                            page={currentPage}
                            pageSize={pageSize}
                            total={totalElement}
                            onPageChange={handlePageChange}
                        />

                        <ul>
                            {authors.map((author) => {
                                return (
                                    <li key={author.id}>
                                        <NavLink to={author.id.toString()}>
                                            {author.firstname} {author.lastname}
                                        </NavLink>

                                        <button
                                            onClick={() =>
                                                handleRemove(author.id)
                                            }
                                            className="small danger"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                ) : (
                    <Loading />
                )}
            </div>
            <div id="info">
                <Outlet />
            </div>
        </>
    );
}
