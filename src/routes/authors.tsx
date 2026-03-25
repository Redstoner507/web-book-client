import { useEffect, useState } from "react";
import { get_authors } from "../api";
import { type Author } from "../types";

export function Author() {
    const [authors, setAuthors] = useState<Author[]>([]);

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
    return <h2>Auteurs</h2>;
}
