import { useEffect, useState, type MouseEventHandler, type SubmitEventHandler } from "react";
import { useParams } from "react-router";
import { type Author, type Book, type BookCreationData } from "../types";
import { get_author, get_books_of_author, add_book, remove_book } from "../api";



function AuthorBooks() {
    let { author_id } = useParams();
    const [books, setBooks] = useState<Book[]>([]);
    const [isBookAddOrRemove, setIsBookAddOrRemove] = useState(false);

    useEffect(() => {
        loadBooks();
    }, [author_id, isBookAddOrRemove]);

    async function loadBooks() {
        try {
            const res: Book[] = await get_books_of_author(Number(author_id));
            setBooks(res);
            setIsBookAddOrRemove(false);
        } catch (error) {
            console.log("failed to load books of author");
            setBooks([]);
        }
    }

    const handleAddBook: SubmitEventHandler<HTMLFormElement> = (event)=>{
        event.preventDefault();

        const form = event.currentTarget;
        const title = form.elements.namedItem("title") as HTMLInputElement;
        const year = form.elements.namedItem("publication_year") as HTMLInputElement;

        if(!title.value.trim()) return;
        if(!year.value.trim()) return;

        const bodyNewBook: BookCreationData = {
            title: title.value,
            publication_year: Number(year.value)
        }

        add_book(Number(author_id), bodyNewBook);
        setIsBookAddOrRemove((prev)=> prev = !prev);
        form.reset();
    }

    const handleRemoveBook = (id:number)=>{
        remove_book(id);
        setIsBookAddOrRemove(true)
    }

    return (
        <div>
            <h3>Books</h3>
            <form onSubmit={handleAddBook}>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title"/>

                <label htmlFor="publication_year">publication year</label>
                <input type="text" name="publication_year" id="publication_year"/>

                <button>Add</button>
            </form>
            <ul>
                {books.map((book) => {
                    return (
                        
                            <li key={book.id}> <span className="blue">{book.title}</span><button onClick={()=>handleRemoveBook(book.id)} className="small danger">Delete</button> </li>
                    );

                })}
            </ul>
        </div>
    );
}



export function Author() {
    let { author_id } = useParams();
    const [author, setAuthor] = useState<Author>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAuthor();
    }, [author_id]);

    async function loadAuthor() {
        setLoading(true);
        try {
            const data = await get_author(Number(author_id));
            setAuthor(data);
        } catch (error) {
            console.error("Failed to load authors:", error);
        }
        setLoading(false);
    }

    

    return (
        <div style={{ opacity: loading ? "0.5" : "1" }}>
            <h2>
                {author?.firstname} {author?.lastname}
                <hr />
            </h2>
            
            <AuthorBooks />
        </div>
    );
}
