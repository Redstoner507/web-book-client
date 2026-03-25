import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./routes/root";
import { Authors } from "./routes/authors";
import { Book } from "./routes/books";
import { Author } from "./routes/author";


createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root />}>
                <Route path="/book" element={<Book />} />
                <Route path="/author" element={<Authors />}>
                    <Route index element={
                        <p>Sélectionner un auteur dans la liste</p>
                    } />

                    <Route path=":author_id" element={<Author />} />
                </Route>

            </Route>
        </Routes>
    </BrowserRouter>,
);
