import { NavLink, Outlet } from "react-router";

export default function Root() {
    return (
        <>
            <header>
                <ul>
                    <li>
                        <NavLink to="/authors"> Auteurs</NavLink>
                    </li>
                    <li>
                        <NavLink to="/books"> Livre</NavLink>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <em>
                    Made with React & React Router by Valentin Zou and Yann
                    Stoll-Geyer
                </em>
            </footer>
        </>
    );
}
