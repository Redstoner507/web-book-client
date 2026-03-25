import { Link, NavLink, Outlet } from "react-router";

export default function Root() {
    return (
        <>
            <header>
                <ul></ul>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <em>Made with React & React Router</em>
            </footer>
        </>
    );
}
