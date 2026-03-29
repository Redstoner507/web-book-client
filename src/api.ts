import type {
    Author,
    AuthorCreationData,
    AuthorUpdateData,
    Book,
    BookCreationData,
    BookUpdateData,
    GetAuthorsParams,
    GetBooksParams,
    Tag,
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

export async function get_author(id_author: number) {
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

export async function update_author(author_id: number, params: AuthorUpdateData) {
    const res = await fetch(`${apiBasename}/authors/${author_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}

export async function get_books(title?: string, params?: GetBooksParams) {
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

export async function get_book(id_book: number) {
    const res = await fetch(`${apiBasename}/books/${id_book}`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const book: Book = await res.json();
    return book;
}

export async function get_books_of_author(author_id: Number) {
    console.log(`requête : ${apiBasename}/authors/${author_id}/books`);
    const res = await fetch(`${apiBasename}/authors/${author_id}/books`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const books: Book[] = await res.json();
    return books;
}

export async function add_book(author_id: Number, bookData: BookCreationData) {
    const res = await fetch(`${apiBasename}/authors/${author_id}/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}

export async function remove_book(id: number) {
    const res = await fetch(`${apiBasename}/books/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}

export async function get_all_tags_of_book(book_id: number) {
    console.log(`requête : ${apiBasename}/books/${book_id}/tags`);
    const res = await fetch(`${apiBasename}/books/${book_id}/tags`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const tags: Tag[] = await res.json();
    return tags;
}

export async function delete_one_from_book(book_id: number, tag_id: number) {
    const res = await fetch(`${apiBasename}/books/${book_id}/tags/${tag_id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}

export async function get_tags() {
    let url = `${apiBasename}/tags`;

    let res = await fetch(url);

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const tags: Tag[] = await res.json();
    return tags;
}

export async function add_tag_to_book(book_id: number, tag_id: number) {
    const res = await fetch(`${apiBasename}/books/${book_id}/tags/${tag_id}`, {
        method: "POST",
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}

export async function update_book(book_id: number, params: BookUpdateData) {
    const res = await fetch(`${apiBasename}/books/${book_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
    });

    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}
