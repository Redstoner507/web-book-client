import type { Author } from "./types";

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
