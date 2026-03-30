import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./routes/root";
import { Authors } from "./routes/authors";
import { Books } from "./routes/books";
import { Author } from "./routes/author";
import { Book } from "./routes/book";
import { Favorites } from "./routes/favorites";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root />}>
                <Route path="/books" element={<Books />}>
                    <Route
                        index
                        element={<p>Sélectionner un Livre dans la liste</p>}
                    />

                    <Route path=":book_id" element={<Book />} />
                </Route>

                <Route path="/authors" element={<Authors />}>
                    <Route
                        index
                        element={<p>Sélectionner un auteur dans la liste</p>}
                    />

                    <Route path=":author_id" element={<Author />} />
                </Route>
                <Route path="/favorites" element={<Favorites />}>
                    
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>,
);
