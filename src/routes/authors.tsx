import {Outlet } from "react-router";
import { type Author } from "../types";

export function Author(){
    return(
        <>
            <div id="sidebar">
                <ul>
                    
                </ul>
            </div>
            <div id="info">
                <h1>outlet</h1>
                <Outlet />
            </div>
        </>

    );
}