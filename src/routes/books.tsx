import { useEffect, useState, type SubmitEventHandler } from "react";
import { NavLink, Outlet } from "react-router";
import { Pagination } from "../utils/pagination";
import type { Book, GetBooksParams, Tag } from "../types";
import { get_books, remove_book } from "../api";
import { BookFilter } from "../utils/bookFilter";

export function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [valueFilter, setValueFilter] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElement, setTotalElement] = useState(0);
    const [filterTags, setfilterTags] = useState<Tag[]>([]);
    const pageSize = 10;

    useEffect(() => {
        loadBooks({ page: currentPage, pageSize });
    }, [valueFilter, currentPage, filterTags]);

    async function loadBooks(params?: GetBooksParams) {
        setLoading(true);
        try {
            const data = await get_books(valueFilter, params, filterTags);
            setBooks(data.books);
            setTotalElement(data.totalCount);
        } catch (error) {
            console.error("Failed to load books:", error);
            setBooks([]);
            setTotalElement(0);
        }
        setLoading(false);
    }

    async function removeBook(bookId: number) {
        try {
            await remove_book(bookId);
            const isLastItemOnPage = books.length === 1;
            const newPage =
                isLastItemOnPage && currentPage > 1
                    ? currentPage - 1
                    : currentPage;
            handlePageChange(newPage);
            loadBooks({ page: newPage, pageSize });
            setErrorMsg("");
        } catch (error) {
            setErrorMsg(String(error));
        }
    }

    const handleRemove = (id: number) => {
        removeBook(id);
    };

    const handleFilter: SubmitEventHandler<HTMLFormElement> = (event) => {
        console.log("Test : " + filterTags);
        // empèche le comportement par défaut du navigateur
        event.preventDefault();
        // récupération des données du formulaire
        const form = event.currentTarget;
        const searchFilter = form.elements.namedItem(
            "titleFilter",
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
                <BookFilter
                    handleFilter={handleFilter}
                    filterTag={filterTags}
                    setFilterTag={setfilterTags}
                />
                <hr />

                <Pagination
                    page={currentPage}
                    pageSize={pageSize}
                    total={totalElement}
                    onPageChange={handlePageChange}
                />

                <ul style={{ opacity: loading ? "0.5" : "1" }}>
                    {books.map((book) => {
                        return (
                            <li key={book.id}>
                                <NavLink to={book.id.toString()}>
                                    {book.title}
                                </NavLink>
                                <button
                                    className="small danger"
                                    onClick={() => handleRemove(book.id)}
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
