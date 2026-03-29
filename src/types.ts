export type Author = {
    id: number;
    firstname: string;
    lastname: string;
    books?: Book[];
};

export type AuthorCreationData = Omit<Author, "id" | "books"> & {
    books?: Book[];
};

export type AuthorUpdateData = Partial<Omit<Author, "id">>;

export type GetAuthorsParams = {
    page?: number;
    pageSize?: number;
};

export type Book = {
    id: number;
    title: string;
    publication_year?: number;
    authorId: number;
    tags?: Tag[];
};

export type BookCreationData = Omit<
    Book,
    "id" | "tags" | "publication_year" | "authorId"
> & {
    publication_year?: number;
    tags?: Tag[];
};

export type BookUpdateData = Partial<Omit<Book, "id">>;

export type GetBooksParams = {
    page?: number;
    pageSize?: number;
};

export type Tag = {
    id: number;
    name: string;
    books?: Book[];
};
