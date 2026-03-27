import type {
    Author,
    AuthorCreationData,
    Book,
    GetAuthorsParams,
} from "./types";

const apiBasename = "http://localhost:3000"; // Source le l'API

export async function get_authors(
    lastname?: string,
    params?: GetAuthorsParams,
) {
    let url = `${apiBasename}/authors`;
    const query = new URLSearchParams();

    if (lastname) query.append("lastname", lastname);
    if (params?.page && params?.pageSize) {
        const skip = (params.page - 1) * params.pageSize;
        const take = params.pageSize;

        query.append("skip", String(skip));
        query.append("take", String(take));
    }

    url += `?${query.toString()}`;

    let res = await fetch(url);

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const authors: Author[] = await res.json();
    const totalCount = Number(res.headers.get("X-Total-Count"));
    return { totalCount, authors };
}

export async function get_author(id_author: string) {
    const res = await fetch(`${apiBasename}/authors/${id_author}`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const author: Author = await res.json();
    return author;
}

export async function add_author(authorData: AuthorCreationData) {
    const res = await fetch(`${apiBasename}/authors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authorData),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}

export async function remove_author(authorId: number) {
    const res = await fetch(`${apiBasename}/authors/${authorId}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    return;
}

export async function get_books(title?: string, params?: GetAuthorsParams) {
    let url = `${apiBasename}/books`;
    const query = new URLSearchParams();

    if (title) query.append("title", title);
    if (params?.page && params?.pageSize) {
        const skip = (params.page - 1) * params.pageSize;
        const take = params.pageSize;

        query.append("skip", String(skip));
        query.append("take", String(take));
    }

    url += `?${query.toString()}`;

    let res = await fetch(url);

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const books: Book[] = await res.json();
    const totalCount = Number(res.headers.get("X-Total-Count"));
    return { totalCount, books };
}

export async function get_book(id_book: string) {
    const res = await fetch(`${apiBasename}/books/${id_book}`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const book: Book = await res.json();
    return book;
}
