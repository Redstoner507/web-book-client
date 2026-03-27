import { useEffect, useState, type SubmitEventHandler } from "react";
import { NavLink, Outlet } from "react-router";
import { Pagination } from "../utils/pagination";
import { Loading } from "../utils/loading";
import type { Book, GetBooksParams } from "../types";
import { get_books } from "../api";

export function Book() {
    const [books, setBooks] = useState<Book[]>([]);
    //const [errorMsg, setErrorMsg] = useState("");
    const [valueFilter, setValueFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(0);
    const pageSize = 10;

    useEffect(() => {
        loadBooks({ page: currentPage, pageSize });
    }, [valueFilter, currentPage]);

    async function loadBooks(params?: GetBooksParams) {
        setLoading(true);
        try {
            const data = await get_books(valueFilter, params);
            setBooks(data.books);
            setTotalElement(data.totalCount);
        } catch (error) {
            console.error("Failed to load authors:", error);
            setBooks([]);
            setTotalElement(0);
        }
        setLoading(false);
    }

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
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div id="sidebar">
                <h3>Filters</h3>
                <form onSubmit={handleFilter}>
                    <label htmlFor="lastnameFilter">Title</label>
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
                            {books.map((books) => {
                                return (
                                    <li key={books.id}>
                                        <NavLink to={books.id.toString()}>
                                            {books.title}
                                        </NavLink>
                                        <button className="small danger">
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
