import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { type Author } from "../types";
import { get_author } from "../api";


export function Author() {
    let params = useParams();
    const [author, setAuthor] = useState<Author>();

    useEffect(() => {
        loadAuthor();
    }, [params]);

    async function loadAuthor() {
        try {
            const id_author = params.author_id;
            if (!id_author) {
                return <p>Auteur non trouvé ou ID invalide.</p>;
            }
            const data = await get_author(id_author.toString());
            setAuthor(data);
        } catch (error) {
            console.error("Failed to load authors:", error);
        }
    }

    return (
        <div>
            <h2>auteur details</h2>
            <p>Nom :{author?.lastname}</p>
            <p>Prénom :{author?.firstname}</p>
        </div>

    );
}