import type { Author, AuthorCreationData } from "./types";

const apiBasename = "http://localhost:3000"; // Source le l'API

export async function get_authors() {
    const res = await fetch(`${apiBasename}/authors`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const authors: Author[] = await res.json();
    return authors;
}


export async function get_author(id_author:String){
    const res = await fetch(`${apiBasename}/authors/${id_author}`);
    if(!res.ok){
        const msg = await res.text()
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
