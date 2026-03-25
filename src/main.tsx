import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./routes/root";
import { Author } from "./routes/authors";
import { Book } from "./routes/books";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Root />}>
                <Route path="/book" element={<Book/>}/>
                <Route path="/author" element={<Author/>}/>
            </Route>
        </Routes>
    </BrowserRouter>,
);
