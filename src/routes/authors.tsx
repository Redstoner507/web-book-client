import {Outlet, NavLink } from "react-router";
import { type Author } from "../types";
import { useEffect, useState } from "react";
import { get_authors } from "../api";

export function Authors(){
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
    return(
        <>
            <div id="sidebar">
                <ul>
                    {authors.map((author)=>{
                        return(
                            <li key={author.id}><NavLink to={author.id.toString()}> {author.lastname} {author.firstname} </NavLink> <button>Delete</button></li>
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